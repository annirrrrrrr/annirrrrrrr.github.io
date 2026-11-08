export const destinations=[{slug:'projects',label:'Projects'},{slug:'research',label:'Research'},{slug:'annie',label:'Annie'},{slug:'social-responsibility',label:'Social Responsibility'},{slug:'internships',label:'Internships'}];
// Edit copy and future media here. Paths are relative to public/.
export const personalLinks: {linkedin:string|null;resume:string|null}={linkedin:'https://www.linkedin.com/in/yanzhu123',resume:'/resume/Annie-Zhu-Resume.pdf'};
export const chapters=[
{year:'2005',title:'Born and raised in Shenzhen, China',location:'Shenzhen, China',body:['I lived in Shenzhen until I was twelve. My favorite place was Shenzhen Bay Park—the stretch along the coastline. When I think of home, that is still one of the first places that comes to mind.','Wuxi came next, then Connecticut. But my story starts here, by the water.'],media:null},
{year:'2019',title:'High School in the US',location:'Connecticut, United States',body:['I landed at JFK with two suitcases. It was my first time in the States, and only after arriving did it really sink in how far I had taken myself from home.','I was fourteen, about to start high school in Connecticut. Independence was becoming something very practical: figuring out everyday life in a new place, making decisions, and learning to live with them.'],media:null},
{year:'2020',title:'Built Teentors community',location:'Education · Community',body:['I started Teentors to bring my peers and younger students across the world into a community where we could support and learn from one another. I wanted us to have something to contribute, as well as something to gain.','Through Teentors, I also coordinated donations to education programs. But I kept wondering what happened on the other end—who the support reached, what they actually needed, and whether it was helping. Eventually, I wanted to be there myself.'],media:null,link:'/social-responsibility',label:'Explore Social Responsibility'},
{year:'2023',title:'GAP Year',location:'Gap year · Industry · Guizhou',body:['Business had always felt like the natural path for me. I took a gap year to find out what I actually enjoyed doing. I tried equity research, then maritime technology, where I moved from sales support toward cybersecurity solutions. I found myself more interested in working through technical problems with engineers—and making a solution work—than I had expected.','I also did something I had wanted to do since high school: teach full-time in Guizhou. What I remember most warmly is the affection I received from the children. But being there also made me question how support was given. Scholarships rewarded the highest grades; effort and improvement were much easier to overlook.','I worked with the principal to launch the Spark Scholarship through Teentors, recognizing need, participation, and progress. Later, he told me the children’s behavior had changed: they could see their effort paying off.','That stayed with me. I want the things I build to give people a reason to believe their effort can change something.'],media:null,link:'/social-responsibility',label:'More from Guizhou'},
{year:'Now',title:'Robotics @ University of Michigan-Ann Arbor',location:'Ann Arbor, Michigan',body:['I notice the part of a process that everyone has learned to work around. During a maritime internship, it was the hours spent searching through scattered rulebooks. I proposed a searchable database, learned how to build it, and wrote a guide so the team could keep using it.','That habit follows me into research, robotics, and the ideas I explore with other people. I enjoy learning across fields because each gives me another way to approach a problem.','What gives me the most satisfaction is seeing something I helped make become useful to someone else. That is what keeps me building.'],media:null,link:'/research',label:'Explore Research'}
];
export const projects: {title:string;tag:string;description:string;index:string;image?:string;imageAlt?:string;photos?:{src:string;alt:string}[]}[]=[
{title:'MAG-LEV',tag:'Engineering · Magnetic levitation',description:'An exploration of magnetic levitation through an engineering build.',index:'01',image:'/images/maglev-3.webp',imageAlt:'Exploded CAD view of the MAG-LEV assembly',photos:[{src:'/images/maglev-2.webp',alt:'Physical MAG-LEV prototype'}]},
{title:'Mapping, Navigation and Localization with MBot',tag:'ROB 330',description:'I worked across the full robotics pipeline: motor control, LiDAR mapping, particle-filter localization, and path-planning algorithms. I connected these components with waypoint following to bring mapping, navigation, and localization together on a physical MBot.',index:'02',image:'/images/mbot.webp',imageAlt:'MBot robot with LiDAR and omni wheels',photos:[{src:'/images/mbot-maze.webp',alt:'Physical maze used for the team’s teleoperated SLAM test'},{src:'/images/mbot-maze-map.webp',alt:'Occupancy grid generated from the physical maze test'},{src:'/images/mbot-localization.webp',alt:'Particle-filter localization visualization using the provided course dataset'},{src:'/images/mbot-waypoints.webp',alt:'Checkpoint 1: odometry-estimated path compared with target waypoints; not external ground truth'}]},
{title:'BOWER',tag:'Interaction design · Motivation',description:'A virtual-pet concept that connects everyday tasks with caring for something—turning a completed task into a moment of connection.',index:'03',image:'/images/bower-4.webp',imageAlt:'BOWER virtual pet app presentation with phone screens',photos:[{src:'/images/bower-1.webp',alt:'BOWER task flow: Set, Track, Treat'},{src:'/images/bower-2.webp',alt:'BOWER virtual pet and task interface'},{src:'/images/bowe-3.webp',alt:'BOWER app introduction'},{src:'/images/bower-5.webp',alt:'BOWER chat and progress screens'}]},
{title:'GarboGenius',tag:'Product concept · Waste sorting',description:'Exploring a waste-sorting concept through sketches for separate cans, bottles, and cardboard compartments.',index:'04',image:'/images/garbogenious-7.webp',imageAlt:'GarboGenius product model with its compartments open and a person for scale',photos:[{src:'/images/garbogenious-5.webp',alt:'GarboGenius three-compartment model'},{src:'/images/garbogenious-6.webp',alt:'GarboGenius curved product concept'},{src:'/images/garbogenius-sketch.webp',alt:'GarboGenius early compartment sketch'}]}
];
export const research=[
{title:'Wearable Electronics',keywords:['Soft electronics', 'Wearable optoelectronics', 'Flexible materials'],image:'/images/optoelectronics.webp',imageAlt:'Optoelectronics research images and diagrams',url:'https://www.gong-research.com/research#h.224w7vv4vxfm',year:'2026',description:'My soft electronics and wearable optoelectronics research focuses on developing mechanically robust electronic materials by combining rigid semiconductors with soft, flexible materials.'},
{title:'Epidemic Tools for Healthcare',keywords:['Hospital capacity planning', 'Simulation testing', 'Python visualization', 'Model–interface consistency'],image:'/images/epidemic.webp',imageAlt:'Overview of epidemic tools including hospital capacity, statistical modeling and epidemic prediction',url:'https://www.hsye.org/epidemic-tools',year:'Sep 2025 – Jan 2026',description:'How can hospitals prepare before patient demand surges? At Northeastern’s Healthcare Systems Engineering Institute (HSyE), I worked on a team epidemic simulation estimating seasonal patient inflow to support hospital capacity planning. The institute’s broader surge-capacity tools project bed, staff, and equipment needs 1–30 days ahead.\n\nMy work focused on testing and debugging the simulation and writing Python visualizations to make its outputs easier to interpret. I checked that predictions shown in the interface matched the model outputs and documented issues in structured technical feedback. The goal was to help the team identify problems and make projected demand clearer to the people using the tool.'},
{title:'Burnout in Healthcare Workers',keywords:['Healthcare systems engineering', 'Workforce burnout', 'Resilience'],image:'/images/download-1.webp',imageAlt:'HSyE logo',url:'https://www.hsye.org/burnout',year:'2025',description:'Understanding and addressing community health center burden, resiliency, and burnout through systems engineering analyses and approaches.'}
];

// Narrative sources and confirmed user additions are recorded in WEBSITE-NOTES.txt.
export const annieStories=[
 {id:'teentors',label:'01 / TEENTORS',title:'Start with each other.',image:'/images/teentors.webp',alt:'Children gathered outside a school receiving education support',caption:'Teentors · Supporting education',body:[
 'I started Teentors to bring my peers and younger students together to learn from one another. I wanted a community where we could contribute what we knew and ask for help with what we didn’t.',
 'As we coordinated donations to education programs, I kept wondering what happened on the receiving end. Who did the support reach? What did they actually need? I wanted to understand that part myself.'
 ],href:'/social-responsibility',link:'More about Teentors'},
 {id:'guizhou',label:'02 / GUIZHOU · GAP YEAR',title:'Make effort count.',image:'/images/guizhou-2.webp',alt:'Children smiling together outside the school in Guizhou',caption:'Guizhou · Teaching and the Spark Scholarship',body:[
 'During my gap year, I taught full-time at Supor Maocaoping School in Guizhou. Scholarships recognized the highest grades, but I kept thinking about the children who were trying harder and making progress.',
 'I worked with the principal to launch the Spark Scholarship through Teentors, taking need, participation, and improvement into account. Later, he told me the children’s behavior had changed: they could see their effort paying off.'
 ],href:'/social-responsibility',link:'More from Guizhou'},
 {id:'work',label:'03 / MARITIME TECHNOLOGY',title:'There has to be an easier way.',image:'/images/dnv.webp?v=16ec9a214a',alt:'Annie holding a certificate with colleagues at DNV',caption:'DNV · Maritime cybersecurity',body:[
 'At DNV, compliance reviews meant searching through the rulebooks of eight classification societies. After a week of repetitive reviews, I proposed putting the requirements into one searchable database.',
 'I mapped equivalent terms across the rulebooks, organized the requirements, and built the database over two months. Review time went from three hours to forty minutes. Then I wrote a guide so the team could keep using it. I liked finding the problem, but making the fix useful to other people was the satisfying part.'
 ],href:'/internships',link:'Explore my experience'}
];
export const socialStory={title:'Teentors @ Maocaoping Elementary School',
 firstDay:"On my first day, I had to work out where I would sleep. I found a discarded mattress in a pile of rubbish to use temporarily. It was too dirty to sleep on as it was, so I wrapped it in garbage bags. These are the photos I took as I was settling in.",
 homeVisit:[
 "One home visit made me look differently at how support was reaching the children. Meeting this student and seeing his home made the gaps in the process harder to overlook. Some students with strong grades were receiving help repeatedly, while others who needed it were missing out because of their grades or other eligibility requirements.",
 "I kept thinking about what those requirements left out. If a child was struggling, did that make their need for support any less real? And if they were making progress, how could we make sure that effort was noticed?"
 ],chapters:[
  {
    "id": "arriving",
    "label": "01 / FROM ONLINE TO IN PERSON",
    "title": "I wanted to be there myself.",
    "image": "/images/guizhou-1.webp",
    "alt": "Annie teaching at the classroom whiteboard in Guizhou",
    "caption": "Maocaoping Elementary School · In the classroom",
    "body": [
      "Teentors began online, with my peers and younger students learning from one another. We also coordinated donations to education programs. But sending support left me with questions I couldn’t answer from a distance: who was receiving it, and what did they actually need?",
      "During my gap year, I went to Guizhou to teach full-time at Supor Maocaoping School. I wanted to spend time there, get to know the children, and understand what helping could look like in their everyday lives."
    ]
  },
  {
    "id": "children",
    "label": "02 / GETTING TO KNOW EACH OTHER",
    "title": "They gave me things, too.",
    "image": "/images/guizhou-2.webp",
    "alt": "Children smiling and making peace signs outside the school in Guizhou",
    "caption": "Guizhou · The children",
    "body": [
      "As I got to know the children, they brought me little gifts: folded paper and handwritten notes. They told me I was their favorite teacher. These small exchanges became some of my warmest memories of teaching there.",
      "Getting to know them also changed how I thought about support. The school’s scholarships rewarded the highest grades, but I kept thinking about the children who were trying harder and making progress. What would tell them that their effort mattered?"
    ]
  },
  {
    "id": "spark",
    "label": "03 / THE SPARK SCHOLARSHIP",
    "title": "A reason to keep trying.",
    "image": "/images/teentors.webp",
    "alt": "Children holding scholarship awards outside the school",
    "caption": "Teentors · The Spark Scholarship",
    "body": [
      "I brought those questions to the principal. Together, we launched the Spark Scholarship through Teentors, taking financial need, participation, and improvement into account. I wanted the criteria to make room for children whose effort and circumstances were not reflected in a ranking.",
      "Later, the principal told me their behavior had noticeably changed. The children could see a return on their effort. That was the part that stayed with me: they were beginning to believe that trying could make a difference. It was the outcome I had hoped for."
    ]
  }
]};
export const personalPhotos=[
 {src:'/images/saida.webp',alt:'Saida the border collie',label:'Saida'},
 {src:'/images/sunset-view.webp',alt:'Sunset over the ocean',label:'Sunset Cliff'},
 {src:'/images/drawing.webp',alt:'Annie’s painting of a crescent moon and clouds',label:'Drawings'},
 {src:'/images/citywalk.webp',alt:'A city street framed by tall buildings',label:'Citywalk'},
 {src:'/images/view-vertical.webp',alt:'A rocky coastline beside the sea',label:'By the water'}
];

export const internships = [
 {id:'dnv',company:'DNV',date:'Jun – Aug 2025',location:'Shanghai, China',role:'Ship Cybersecurity Consulting Intern',team:'Supply Chain & Product Assurance',summary:'Making maritime cybersecurity requirements easier to find, interpret, and use.',contributions:[
 {title:'A usable compliance reference',text:'Built an Excel-based database bringing together requirements from eight maritime regulators. Mapped equivalent terminology across rulebooks so the team could find the relevant requirements in one place.'},
 {title:'A faster review process',text:'Reduced compliance review time from about three hours to forty minutes. Wrote a 40-page guide interpreting more than 350 pages of requirements so colleagues could continue using the database.'},
 {title:'From regulations to conversations',text:'Wrote four technical compliance articles for shipowners and helped organize a co-hosted seminar with more than 100 attendees.'}
 ],tags:['Compliance analysis','Excel database','Technical writing'],photos:[{src:'/images/dnv.webp?v=16ec9a214a',alt:'Annie holding a certificate with colleagues at DNV',caption:'DNV · Certificate of Achievement'},{src:'/images/dnv-3.webp',alt:'View of a ship deck and shipyard cranes through a window',caption:'A view from on board'},{src:'/images/dnv-shanghai-office.webp',alt:'DNV regional headquarters building in Shanghai, with DNV, Chinese and Norwegian flags',caption:'DNV · Shanghai regional headquarters',credit:'Cheng Qi / Ti Gong · City News Service',sourceUrl:'https://www.citynewsservice.cn/articles/china-biz-buzz/industry/shanghais-regional-hq-environment-drives-firms-expansion-innovation-dmjw044n'}]},
 {id:'asi',company:'AquaSync Innovation (ASI)',date:'Apr – Aug 2024',location:'Singapore',role:'Ship Cybersecurity Analyst Intern',team:'Marine OT Systems',summary:'Working between shipboard systems, engineering teams, and the people using the technology.',contributions:[
 {title:'Understanding the ship’s network',text:'Created four network topology diagrams from vessel asset inventories, identifying system types and constraints. Designed and presented firewall arrangements using network boundary protection principles.'},
 {title:'Taking the work on board',text:'Completed an onboard vulnerability scan for a 114,400 DWT oil tanker and prepared a 45-page risk assessment report.'},
 {title:'Supporting an early product',text:'Helped develop an all-in-one cyber control unit combining a firewall, intrusion detection, server, and switch. Mapped international requirements and security levels, and worked with manufacturers to evaluate production constraints and upgrade options.'}
 ],tags:['Marine cybersecurity','Network topology','Product development'],photos:[{src:'/images/asi-2.webp',alt:'Annie talking with visitors at a maritime exhibition',caption:'In conversation'},{src:'/images/asi-1.webp',alt:'Annie speaking with attendees at a maritime exhibition',caption:'At the exhibition'},{src:'/images/dnv-2.webp',alt:'Protective workwear and safety shoes before an ASI site visit',caption:'Ready for a site visit'}]},
 {id:'shenwan',company:'Shenwan Hongyuan Securities',date:'Oct 2023 – Jan 2024',location:'Shanghai, China',role:'Equity Research Analyst Intern',team:'Renewable Energy Group',summary:'Learning to connect industry details with the larger investment picture.',contributions:[
 {title:'Following the wind supply chain',text:'Produced three equity research reports covering turbine blades, offshore wind, and wind towers, examining different parts of the renewable energy industry.'},
 {title:'Turning research into analysis',text:'Co-developed a model to analyze major fund holdings and evaluate wind-sector stocks. Compared net profits across the wind project supply chain, from components through installation.'}
 ],tags:['Equity research','Financial modeling','Renewable energy'],photos:[
 {src:'/images/wind-blade-hq.webp',alt:'A wind turbine blade inside an LM Wind Power manufacturing facility',caption:'Wind blade manufacturing · Industry context',credit:'GE Renewable Energy / LM Wind Power',sourceUrl:'https://www.lmwindpower.com/node/317'},
 {src:'/images/shenwan-office-hq.webp',alt:'An office building bearing the Shenwan Hongyuan name',caption:'Shenwan Hongyuan · Company context',credit:'Shenwan Hongyuan · 2024 ESG Report, p. 8',sourceUrl:'https://static.cninfo.com.cn/finalpage/2025-03-29/1222948658.PDF#page=8'}
 ]}
];
