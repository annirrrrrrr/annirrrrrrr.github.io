// Browser port of Card, SimplePlayer and the Game driver in original-cpp.
globalThis.Euchre = (() => {
  const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
  const ranks = ['9', '10', 'J', 'Q', 'K', 'A'];
  const deck = suits.flatMap(suit => ranks.map(rank => ({ rank, suit })));
  const nextSuit = suit => suits[(suits.indexOf(suit) + 2) % 4];
  const effectiveSuit = (card, trump) =>
    trump && card.rank === 'J' && card.suit === nextSuit(trump) ? trump : card.suit;

  function strength(card, trump, led) {
    if (effectiveSuit(card, trump) === trump) {
      if (card.rank === 'J') return card.suit === trump ? 74 : 73;
      return 48 + ranks.indexOf(card.rank);
    }
    const base = ranks.indexOf(card.rank) * 4 + suits.indexOf(card.suit);
    return base + (led && card.suit === effectiveSuit(led, trump) ? 24 : 0);
  }

  function extreme(cards, trump, highest) {
    return cards.reduce((best, card) => {
      const difference = strength(card, trump) - strength(best, trump);
      return (highest ? difference > 0 : difference < 0) ? card : best;
    });
  }

  function simpleBid(hand, upcard, dealer, round) {
    const suit = round === 1 ? upcard.suit : nextSuit(upcard.suit);
    const honors = hand.filter(card =>
      ranks.indexOf(card.rank) >= 2 && effectiveSuit(card, suit) === suit
    ).length;
    return honors >= (round === 1 ? 2 : 1) || (round === 2 && dealer) ? suit : null;
  }

  function followers(hand, trump, led) {
    return hand.filter(card => effectiveSuit(card, trump) === effectiveSuit(led, trump));
  }

  function legalCards(hand, trump, led) {
    const matching = led ? followers(hand, trump, led) : [];
    return matching.length ? matching : hand;
  }

  function simplePlay(hand, trump, led) {
    if (!led) {
      const nonTrump = hand.filter(card => effectiveSuit(card, trump) !== trump);
      return extreme(nonTrump.length ? nonTrump : hand, trump, true);
    }
    const matching = followers(hand, trump, led);
    return matching.length ? extreme(matching, trump, true) : extreme(hand, trump, false);
  }

  function shuffledDeck() {
    const cards = [...deck];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  function scoreHand(maker, tricks) {
    const winner = tricks[0] >= 3 ? 0 : 1;
    if (maker % 2 !== winner) return { winner, points: 2, reason: 'Euchre' };
    if (tricks[winner] === 5) return { winner, points: 2, reason: 'March' };
    return { winner, points: 1, reason: 'Made trump' };
  }

  class Match {
    constructor() {
      this.scores = [0, 0];
      this.dealer = 0;
      this.number = 0;
      this.deal();
    }

    deal(cards = shuffledDeck()) {
      this.number++;
      this.hands = [[], [], [], []];
      let cursor = 0;
      for (const [batch, count] of [3, 2, 3, 2, 2, 3, 2, 3].entries()) {
        this.hands[(this.dealer + 1 + batch) % 4].push(...cards.slice(cursor, cursor + count));
        cursor += count;
      }
      this.upcard = cards[cursor];
      this.round = 1;
      this.trump = null;
      this.maker = null;
      this.passed = [];
      this.trick = [];
      this.tricks = [0, 0];
      this.trickWinner = null;
      this.result = null;
      this.phase = 'bid';
      this.turn = (this.dealer + 1) % 4;
    }

    get choices() {
      return this.round === 1 ? [this.upcard.suit] : suits.filter(suit => suit !== this.upcard.suit);
    }

    get canPass() {
      return this.round === 1 || this.turn !== this.dealer;
    }

    bid(suit) {
      if (this.phase !== 'bid' || (suit === null ? !this.canPass : !this.choices.includes(suit))) return false;
      if (suit === null) {
        this.passed.push(this.turn);
        if (this.turn === this.dealer) {
          this.round = 2;
          this.passed = [];
        }
        this.turn = (this.turn + 1) % 4;
        return true;
      }
      this.trump = suit;
      this.maker = this.turn;
      if (this.round === 1) {
        this.phase = 'discard';
        this.turn = this.dealer;
        this.hands[this.dealer].push(this.upcard);
      } else {
        this.startPlay();
      }
      return true;
    }

    discard(card) {
      if (this.phase !== 'discard' || !this.hands[this.turn].includes(card)) return false;
      this.removeCard(card);
      this.startPlay();
      return true;
    }

    startPlay() {
      this.phase = 'play';
      this.turn = (this.dealer + 1) % 4;
    }

    removeCard(card) {
      const hand = this.hands[this.turn];
      hand.splice(hand.indexOf(card), 1);
    }

    play(card) {
      const led = this.trick[0]?.card;
      if (this.phase !== 'play' || !legalCards(this.hands[this.turn], this.trump, led).includes(card)) return false;
      this.removeCard(card);
      this.trick.push({ seat: this.turn, card });
      this.turn = (this.turn + 1) % 4;
      if (this.trick.length === 4) {
        const best = this.trick.reduce((winner, entry) =>
          strength(entry.card, this.trump, led) > strength(winner.card, this.trump, led) ? entry : winner
        );
        this.trickWinner = best.seat;
        this.tricks[best.seat % 2]++;
        this.phase = 'trick';
        this.turn = null;
      }
      return true;
    }

    collect() {
      if (this.phase !== 'trick') return;
      if (this.tricks[0] + this.tricks[1] === 5) {
        this.result = scoreHand(this.maker, this.tricks);
        this.scores[this.result.winner] += this.result.points;
        this.phase = this.scores[this.result.winner] >= 10 ? 'match' : 'summary';
        return;
      }
      this.trick = [];
      this.turn = this.trickWinner;
      this.trickWinner = null;
      this.phase = 'play';
    }

    nextHand() {
      if (this.phase !== 'summary') return;
      this.dealer = (this.dealer + 1) % 4;
      this.deal();
    }

    simpleStep() {
      const hand = this.hands[this.turn];
      switch (this.phase) {
        case 'bid':
          return this.bid(simpleBid(hand, this.upcard, this.turn === this.dealer, this.round));
        case 'discard':
          return this.discard(extreme(hand, this.trump, false));
        case 'play':
          return this.play(simplePlay(hand, this.trump, this.trick[0]?.card));
        default:
          return false;
      }
    }
  }

  return { Match, suits, ranks, deck, effectiveSuit, strength, legalCards, simpleBid, simplePlay, scoreHand };
})();
