const { Match, suits, ranks, effectiveSuit, legalCards } = Euchre;
const symbols = { Spades: '♠', Hearts: '♥', Clubs: '♣', Diamonds: '♦' };
const names = ['You', 'Milo', 'Nova', 'Jules'];
const teams = ['You + Nova', 'Milo + Jules'];
const rankNames = { J: 'Jack', Q: 'Queen', K: 'King', A: 'Ace' };
const game = document.querySelector('#game');
const rules = document.querySelector('#rules');
const resetDialog = document.querySelector('#reset-dialog');
game.innerHTML = '<div id="table-view"></div><p id="announcement" class="sr-only" role="status"></p>';
const view = document.querySelector('#table-view');
const announcement = document.querySelector('#announcement');
let match = new Match();
let timer;

function suitMark(suit) {
  return '<span aria-hidden="true" class="' + (['Hearts', 'Diamonds'].includes(suit) ? 'red' : '') + '">' + symbols[suit] + '</span>';
}

function cardFace(card, { index, active = false, picked = false } = {}) {
  const label = (rankNames[card.rank] || card.rank) + ' of ' + card.suit;
  const trump = match.trump && effectiveSuit(card, match.trump) === match.trump;
  const bower = trump && card.rank === 'J' ? (card.suit === match.trump ? 'Right bower' : 'Left bower') : '';
  const badge = bower || (picked ? 'Picked up' : trump ? 'Trump' : '');
  const contents = '<span class="corner" aria-hidden="true">' + card.rank + suitMark(card.suit) + '</span>' +
    '<span class="pip" aria-hidden="true">' + suitMark(card.suit) + '</span>' +
    (badge ? '<span class="card-tag" aria-hidden="true">' + badge + '</span>' : '');
  const style = 'class="card' + (active ? ' available' : '') + (picked ? ' pickup' : '') + '"';
  const accessible = ' aria-label="' + label + (badge ? ', ' + badge : '') + '"';
  if (index === undefined) return '<span role="img" ' + style + accessible + '>' + contents + '</span>';
  return '<button type="button" ' + style + accessible + ' data-card="' + index + '"' +
    (active ? '' : ' disabled') + '>' + contents + '</button>';
}

const portraits = [
  '<path d="M7 13h18v11H7zM11 13V9h10v4M12 25v3m8-3v3"/><path d="M11 18h2m6 0h2m-7 3h4"/>',
  '<path d="M6 13l5-4h10l5 4v10l-5 4H11l-5-4zM16 9V5m-2 0h4"/><path d="M10 17h4m4 0h4m-9 5h6"/>',
  '<path d="M9 15l-2-7 7 3h4l7-3-2 7a9 9 0 1 1-14 0Z"/><path d="M11 19l2-1 2 1m2 0 2-1 2 1m-7 3 2 1 2-1"/>',
  '<path d="M7 15a9 9 0 0 1 18 0v7l-4 4H11l-4-4zM5 15v6m22-6v6"/><path d="m11 19 2-2 2 2m2 0 2-2 2 2m-7 3h4"/>',
];

function avatar(seat) {
  return '<span class="avatar portrait-' + seat + '" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" ' +
    'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    portraits[seat] + '</svg></span>';
}

function teamMark(team) {
  return '<span class="team-mark" aria-hidden="true">' + (team === 0 ? '◆' : '✦') + '</span>';
}

function seatPanel(seat) {
  const { turn, phase, trickWinner, hands, dealer, passed } = match;
  const won = phase === 'trick' && trickWinner === seat;
  const active = turn === seat || won;
  const didPass = phase === 'bid' && passed.includes(seat);
  const detail = won ? 'Took the trick' : turn === seat ?
    (phase === 'bid' ? 'Bidding' : phase === 'discard' ? 'Discarding' : 'To play') : didPass ? 'Passed' : '';
  const label = [names[seat], seat === 2 ? 'Your partner' : seat % 2 ? 'Opponent' : 'Your seat',
    dealer === seat ? 'Dealer' : '', detail].filter(Boolean).join(' · ');
  return '<div class="seat seat-' + seat + ' team-' + seat % 2 + (active ? ' current' : '') + '" title="' + label + '">' +
    '<span class="sr-only">' + label + '</span>' + avatar(seat) +
    '<span class="seat-markers" aria-hidden="true">' + teamMark(seat % 2) +
    (dealer === seat ? '<span class="dealer">D</span>' : '') +
    (didPass ? '<span class="seat-event">↪</span>' : won ? '<span class="seat-event">✓</span>' : '') + '</span>' +
    (seat ? '<span class="backs" aria-hidden="true">' + '<i></i>'.repeat(hands[seat].length) + '</span>' : '') + '</div>';
}

function tableCenter() {
  if (match.phase === 'bid' || match.phase === 'discard') {
    return '<div class="upcard"><span class="table-label">' +
      (match.phase === 'discard' ? 'PICKED UP' : match.round === 1 ? 'UPCARD' : 'TURNED DOWN') +
      '</span>' + cardFace(match.upcard) + '</div>';
  }
  if (match.result) {
    const { winner, points, reason } = match.result;
    return '<div class="result"><p class="eyebrow">' + (match.phase === 'match' ? 'MATCH COMPLETE' : 'HAND COMPLETE') +
      '</p><h2>' + (match.phase === 'match' ? (winner === 0 ? 'You win!' : 'Milo + Jules win') : reason) +
      '</h2><p>' + teams[winner] + ' earned <strong>+' + points + '</strong> ' + (points === 1 ? 'point' : 'points') +
      (match.phase === 'match' ? ' · ' + reason : '') + '</p>' +
      '<p class="trick-count">' + match.tricks.join('–') + ' tricks · ' + names[match.maker] + ' called ' + match.trump + '</p></div>';
  }
  return '<div class="trick-grid" aria-label="Cards in the trick">' + names.map((name, seat) => {
    const entry = match.trick.find(play => play.seat === seat);
    const won = match.phase === 'trick' && match.trickWinner === seat;
    return '<div class="played played-' + seat + (won ? ' winning' : '') + '">' +
      (entry ? cardFace(entry.card) : '<span class="slot" aria-hidden="true"></span>') + '</div>';
  }).join('') + '</div>';
}

function prompt() {
  const { phase, turn, round, trump, canPass, trickWinner, trick, dealer } = match;
  const other = names[turn];
  switch (phase) {
    case 'bid':
      if (turn !== 0) return [other + ' is bidding', round === 1 ? 'Considering the upcard.' : 'Considering the other three suits.'];
      if (round === 1) return ['Call ' + match.upcard.suit + '?', dealer === 0 ?
        'Order up and take the upcard, or pass.' : 'Order up and ' + names[dealer] + ' will take the upcard.'];
      return ['Choose a trump suit', canPass ? 'Choose one of the other three suits or pass.' : 'As dealer, you must call a different suit.'];
    case 'discard':
      return turn === 0 ? ['Discard one card', 'You picked up the upcard. Select any card to discard.'] :
        [other + ' picked up the upcard', other + ' is choosing a card to discard.'];
    case 'play': {
      const led = trick[0]?.card;
      const follows = led && match.hands[0].some(card => effectiveSuit(card, trump) === effectiveSuit(led, trump));
      return turn === 0 ? ['Your turn', !led ? 'Lead with any card.' : follows ?
        'Follow ' + effectiveSuit(led, trump) + ' using a highlighted card.' : 'You’re out of ' + effectiveSuit(led, trump).toLowerCase() + '. Play any card.'] :
        [other + ' to play', led ? effectiveSuit(led, trump) + ' led.' : other + ' leads this trick.'];
    }
    case 'trick':
      return [trickWinner === 0 ? 'You took the trick' : names[trickWinner] + ' took the trick',
        'Tricks so far · ' + match.tricks.join('–')];
    case 'summary':
      return ['Ready for the next hand?', names[(dealer + 1) % 4] + ' will deal next.'];
    default:
      return ['Final score · ' + match.scores.join('–'), 'Play again to start a fresh match.'];
  }
}

function controls() {
  if (match.phase === 'bid' && match.turn === 0) {
    return match.choices.map(suit => '<button class="primary" data-bid="' + suit + '">' + suitMark(suit) +
      ' ' + (match.round === 1 ? 'Order up' : suit) + '</button>').join('') +
      (match.canPass ? '<button class="quiet" data-bid="pass">Pass</button>' : '');
  }
  if (match.phase === 'summary') return '<button class="primary" data-next>Next hand <span aria-hidden="true">↗</span></button>';
  if (match.phase === 'match') return '<button class="primary" data-new>Play again</button>';
  return '';
}

function render() {
  const { hands, phase, turn, trump, trick, number, scores, tricks, maker, round } = match;
  const score = scores.map((points, team) => '<div class="score team-' + team + '">' +
    '<div class="score-identity"><span class="score-pair">' + avatar(team) + avatar(team + 2) + '</span>' +
    '<span class="score-label">' + teamMark(team) + '<span class="score-name">' +
    (team === 0 ? 'Your team' : 'Opponents') + '</span></span>' +
    '</div><span class="sr-only">' + teams[team] + '</span><b>' + points + '<span class="sr-only"> points</span></b>' +
    '<span class="score-tricks">' + tricks[team] + (tricks[team] === 1 ? ' trick' : ' tricks') + '</span></div>').join('');
  const marker = trump ? '<span class="trump">' + suitMark(trump) + ' ' + trump + ' trump</span>' +
    '<span class="maker">' + (maker === 0 ? 'You called' : names[maker] + ' called') + '</span>' :
    '<span class="trump">Bidding · Round ' + round + '</span>';
  const [title, detail] = prompt();
  const allowed = turn !== 0 ? [] : phase === 'discard' ? hands[0] :
    phase === 'play' ? legalCards(hands[0], trump, trick[0]?.card) : [];
  const hand = [...hands[0]].sort((a, b) => suits.indexOf(effectiveSuit(a, trump)) -
    suits.indexOf(effectiveSuit(b, trump)) || ranks.indexOf(a.rank) - ranks.indexOf(b.rank));
  const command = '<section class="command" aria-label="Current action"><div><strong tabindex="-1" id="action-title">' +
    title + '</strong><p>' + detail + '</p></div><div class="actions">' + controls() + '</div></section>';
  view.innerHTML = '<div class="scoreboard" aria-label="Match score">' + score + '</div>' +
    '<div class="table"><div class="table-bar"><span>HAND ' + String(number).padStart(2, '0') + '</span><div>' + marker +
    '</div></div><div class="felt"><div class="play-area">' + seatPanel(2) + seatPanel(1) + seatPanel(3) +
    tableCenter() + seatPanel(0) + '</div></div>' + command +
    '<section class="hand-panel" aria-label="Your hand"><div class="hand-heading"><p class="eyebrow">YOUR HAND</p>' +
    '<span>' + hand.length + ' ' + (hand.length === 1 ? 'card' : 'cards') + '</span></div>' +
    '<div class="hand-cards">' + (hand.map(card => cardFace(card, { index: hands[0].indexOf(card), active: allowed.includes(card),
      picked: phase === 'discard' && card === match.upcard })).join('') || '<span class="empty-hand">All cards played</span>') +
    '</div></section></div>';
  announcement.textContent = title + '. ' + detail;
}

function update(focus = false) {
  clearTimeout(timer);
  const focusWasInTable = view.contains(document.activeElement);
  render();
  if (focus || focusWasInTable) {
    document.querySelector('#action-title').focus({ preventScroll: true });
  }
  if (match.phase === 'trick') {
    timer = setTimeout(() => { match.collect(); update(); }, 1550);
  } else if (match.turn !== null && match.turn !== 0) {
    timer = setTimeout(() => { match.simpleStep(); update(); }, 460);
  }
}

view.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-new')) match = new Match();
  else if (button.hasAttribute('data-next')) match.nextHand();
  else if (match.turn !== 0) return;
  else if (button.dataset.bid) match.bid(button.dataset.bid === 'pass' ? null : button.dataset.bid);
  else {
    const card = match.hands[0][Number(button.dataset.card)];
    if (match.phase === 'discard') match.discard(card);
    else match.play(card);
  }
  update(event.detail === 0);
});
document.querySelector('#help').addEventListener('click', () => rules.showModal());
document.querySelector('#restart').addEventListener('click', () => resetDialog.showModal());
resetDialog.addEventListener('close', () => {
  if (resetDialog.returnValue === 'restart') {
    match = new Match();
    update();
  }
  resetDialog.returnValue = '';
});
update();
