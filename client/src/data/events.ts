import type { EventItem } from './types';

const OPEN_TO_ALL = 'Open to All Departments';
import civilCbi from '@/assets/events/CIVIL CBI.png';
import Hackonex from '@/assets/events/HACKONEX.png';
import flightcraft from '@/assets/events/FLIGHT CRAFT.png';
import water from '@/assets/events/WATER ROCKETRY.png';
import structron from '@/assets/events/STRUCTRON.png';
import deep from '@/assets/events/DEEP DIVE CHALLENGE.png';
import whatif from '@/assets/events/WHAT IF.png';
import rally from '@/assets/events/Robo Rally.jpg';
import soccer from '@/assets/events/Robo soccer.jpg';
import code from '@/assets/events/CODE DETECTIVE.png';
import paper from '@/assets/events/PAPER PRESENTATION.png';
import sketch from '@/assets/events/SKETCH SHIFT.png';
import human from '@/assets/events/HUMAN MATRIX.png';
import ipl from '@/assets/events/Ipl Auction.jpg';
import visual from '@/assets/events/VISUAL VANGUARD.png';












/**
 * The finalized Porikkalam event list, transcribed from the organizing committee's
 * brief. This is the single source of truth for the public site's event listing — kept
 * in sync by hand with server/src/scripts/seedEvents.ts, which seeds the same list into
 * the database for registration/admin purposes.
 */
export const EVENTS: EventItem[] = [

    { 
    poster: Hackonex,
    id: 'hackathon',
    registrationFee: '₹499',
     prizePool: '₹15,000',
    title: 'Hackonex',
    category: 'premium',
    description:
      'A team-based competition where participants solve real-world or problem-based challenges by developing software solutions within a fixed time. Teams brainstorm, code, test and present their solutions. The best-performing solution emerges as the winner.',
    format: 'team',
    teamSize: '4',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '6 Hours',
    expectedParticipants: 30,
    venue: 'DCKAP Room',
    resources: 'Power source and Wi-Fi',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['CSE', 'IT', 'AIML', 'AIDS'],
    whyIncluded:
      'Develops coding skills, logical thinking, problem-solving, teamwork and time management. It gives participants an opportunity to apply programming knowledge to practical challenges and build innovative software solutions.',
    icon: 'brain-circuit',
    registrationStatus: 'open',
  },
   {
    id: 'robo-rally',
    registrationFee: '₹555',
    prizePool: '₹12,750',
    title: 'Robo Rally',
    category: 'premium',
    description:
      'Participants are required to design and build their own robotic vehicle to navigate a specially designed obstacle track. Multiple checkpoints will be placed along the course. If a robot deviates from the track, overturns, or cannot proceed due to an obstacle, it will be repositioned at the last successfully crossed checkpoint and the run will resume with the prescribed time penalty. Only robots complying with the specified design and technical regulations will be allowed to participate — robots failing inspection will be disqualified before the competition begins.',
    format: 'team',
    teamSize: '3',
    formatMode: 'competition',
    prequalifierRequired: true,
    duration: 'Half Day',
    expectedParticipants: 40,
    venue: 'PJ Building',
    resources: 'Obstacle Course',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['Mechanical', 'Production', 'EEE', 'EIE', 'ECE'],
    whyIncluded:
      'Combines design, fabrication, programming, electronics, and problem-solving. It provides a hands-on engineering challenge around mobility and navigation.',
    budget: '₹3000',
    poster: rally,
    icon: 'bot',
    registrationStatus: 'open',
  },
  {
         poster: sketch,

    id: 'sketchshift',
    registrationFee: '₹99',
    prizePool: '₹1,200',
    title: 'SketchShift',
    category: 'non-technical',
    description:
      'Participants will be given a simple sketch and must think outside the box to transform it into something unexpected and creative. The most imaginative interpretation wins.',
    format: 'individual',
    teamSize: 'Individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    expectedParticipants: 60,
    venue: 'Drawing Hall',
    resources: 'Printed A4 Sheets',
    eligibility: OPEN_TO_ALL,
    whyIncluded:
      'This event focuses on artistic creativity and challenges participants to think differently. It provides an engaging platform for students interested in art and creative expression.',
    budget: '₹500',
    icon: 'pen-tool',
    registrationStatus: 'open',
  },
  {
poster: civilCbi,
    id: 'civil-cbi',
    registrationFee: '₹149',
    prizePool: '₹2,250',
    title: 'Civil CBI',
    category: 'technical',
    description:
      'Participants will be provided with images of civil engineering construction sites. They must identify defects or mistakes, determine their possible causes, and suggest practical solutions or preventive measures.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    expectedParticipants: 30,
    venue: 'Classroom',
    resources: 'Printed A4 Sheets',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['Civil'],
    whyIncluded: 'The event provides valuable exposure to civil engineering-related technical issues and knowledge.',
    budget: '₹500',
    icon: 'search',
    registrationStatus: 'open',
  },
  {
    poster: structron,
    id: 'structron',
    registrationFee: '₹149',
    prizePool: '₹2,250',
    title: 'Structron',
    category: 'technical',
    description:
      'Structron is a hands-on structural engineering challenge where participants design and build a model structure using the provided materials. The structure is tested for strength, stability, and efficiency by applying an increasing load. Teams must balance design, material usage, structural integrity, and load-bearing capacity. The structure demonstrating the best overall performance will be declared the winner.',
    format: 'team',
    teamSize: '3',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    expectedParticipants: 60,
    venue: 'Classroom',
    resources: 'Building materials, testing load',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['Civil'],
    whyIncluded: 'Promotes hands-on learning, teamwork, creativity and practical application of structural engineering concepts.',
    budget: '₹1000',
    icon: 'landmark',
    registrationStatus: 'open',
  },
  {
    poster: deep,
    id: 'deep-dive-challenge',
    registrationFee: '₹149',
    prizePool: '₹3,250',
    title: 'Deep Dive Challenge',
    category: 'technical',
    description:
      'Participants will be given a subject-specific topic and must quickly understand, analyze and present it within the allotted time. The event tests technical knowledge, analytical thinking, clarity of thought, and presentation skills.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    expectedParticipants: 60,
    venue: 'Classroom',
    resources: 'Projector',
    eligibility: OPEN_TO_ALL,
    whyIncluded: "Assesses participants' ability to learn a new concept quickly, think critically and communicate their ideas effectively.",
    icon: 'presentation',
    registrationStatus: 'open',
  },
  {
    poster: soccer,
    id: 'robo-soccer',
    registrationFee: '₹444',
    prizePool: '₹9,500',
    title: 'Robo Soccer',
    category: 'premium',
    description:
      'Participants will control a robotic vehicle to play a game of soccer using skill, precision and strategy to score goals. The team that scores the highest number of goals within the allotted time will be declared the winner.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: true,
    duration: '1 Hour',
    expectedParticipants: 32,
    venue: 'PJ Building',
    resources: 'Soccer Field',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['Mechanical', 'Production', 'EEE', 'EIE', 'ECE'],
    whyIncluded: 'An exciting audience-focused robotics event that does not require a large arena like Robo Wars.',
    budget: '₹1000',
    icon: 'bot',
    registrationStatus: 'open',
  },
  {
     poster: flightcraft,
    id: 'Flightcraft',
    registrationFee: '₹199',
    prizePool: '₹3,250',
    title: 'Flightcraft',
    category: 'premium',
    description:
      'Participants will build a paper glider using only the materials provided by the organizers within the allotted time. The glider will then be launched to achieve maximum flight time through effective design, balance, stability, and aerodynamics. The participant/team whose glider remains airborne for the longest duration will be declared the winner.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: true,
    duration: '2 Hours',
    expectedParticipants: 60,
    venue: 'Alumni Auditorium',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['Mechanical', 'Production', 'EEE', 'EIE', 'ECE'],
    whyIncluded:
      'Encourages participants to optimize designs using principles of aerodynamics while remaining accessible to students from different disciplines.',
    icon: 'plane',
    registrationStatus: 'open',
  },
  {
    poster: water,
    id: 'water-rocketry',
    registrationFee: '₹199',
    prizePool: '₹3,250',
    title: 'Water Rocketry',
    category: 'premium',
    description:
      'Water rocketry is a nostalgic event performed at a higher level for a more dramatic effect. Evaluation is based on flight distance and travel mode.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: true,
    duration: '1 Hour',
    expectedParticipants: 60,
    venue: 'Open Ground',
    resources: 'Launcher',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['Mechanical', 'Production', 'Automobile'],
    whyIncluded:
      'Water rocketry provides an exciting rocket-launch experience while being safer than conventional rocket launches and capable of attracting more participants.',
    budget: '₹1500',
    icon: 'rocket',
    registrationStatus: 'open',
  },
  {
    poster: whatif,
    id: 'what-if-reverse-engineering-debugging',
    registrationFee: '₹149',
    prizePool: '₹2,250',
    title: 'What If? (Reverse Engineering & Debugging)',
    category: 'technical',
    description:
      'Explore what happens when electrical circuits are connected incorrectly. Participants must analyze faults, predict circuit behavior, identify the cause, suggest the correct solution, and troubleshoot real-world scenarios. The event tests troubleshooting, analytical thinking and electrical safety knowledge.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '30 Minutes',
    expectedParticipants: 60,
    venue: 'Classrooms',
    resources: 'Electrical Components',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['EEE', 'ECE', 'EIE'],
    whyIncluded: 'Develops practical troubleshooting skills, strengthens understanding of electrical concepts and improves safety awareness.',
    budget: '₹3000',
    icon: 'circuit-board',
    registrationStatus: 'open',
  },
 
  {
     poster: code,
    id: 'code-detective-speed-relay',
    registrationFee: '₹149',
    prizePool: '₹2,250',
    title: 'Code Detective – Speed Relay',
    category: 'technical',
    description:
      'A four-member coding relay. Round 1 — Bug Fix (5 minutes): Member 1 fixes as many bugs as possible before the code is locked and passed to Member 2. Round 2 — Optimize (5 minutes): Member 2 reduces time complexity and memory usage without starting from scratch. Round 3 — Test (5 minutes): Member 3 runs hidden test cases and fixes edge cases and runtime errors. Round 4 — Explain (5–10 minutes): Member 4 explains what bugs were fixed, why the solution is faster, its time complexity, and memory optimization. Teams finishing before the timer may earn bonus points or receive a harder optimization challenge for extra marks. The organizer may adjust the time allocated for each round.',
    format: 'team',
    teamSize: '4',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    expectedParticipants: 60,
    venue: 'DCKAP Room',
    resources: 'Power source and Wi-Fi',
    eligibility: OPEN_TO_ALL,
    primaryDomains: ['CSE', 'IT', 'AIML', 'AIDS'],
    whyIncluded:
      'The event rewards speed, teamwork and coding quality rather than simply producing a working solution. It simulates how developers work under time pressure in real companies.',
    icon: 'bug',
    registrationStatus: 'open',
  },
  {
    poster: human,
    id: 'human-matrix',
    title: 'Human Matrix',
    registrationFee: 'No fee',
    prizePool: '₹1,200',
    category: 'non-technical',
    description:
      'A treasure-hunt style team event where participants follow a series of clues, riddles and challenges hidden across the campus. Each solved clue leads the team closer to the final treasure. The fastest team to complete the hunt wins.',
    format: 'team',
    teamSize: '4',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    expectedParticipants: 44,
    venue: 'Open Area',
    eligibility: OPEN_TO_ALL,
    whyIncluded:
      'Promotes teamwork, communication, observation, creativity and quick thinking. It requires no technical knowledge and is engaging for students from all departments.',
    icon: 'clipboard-list',
    registrationStatus: 'open',
  },

  {
    poster: ipl,
    id: 'ipl-auction',
    title: 'IPL Auction',
    registrationFee: 'No fee',
    prizePool: '₹1,200',
    category: 'non-technical',
    description:
    'A fun strategy-based event where participants form teams and compete to build their ideal cricket squad through a simulated IPL-style auction. Participants must bid for players, manage their budget, make strategic decisions, and create a balanced and competitive team.',
    format: 'team',
    teamSize: '4',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    expectedParticipants: 44,
    venue: 'Classroom',
    eligibility: OPEN_TO_ALL,
    whyIncluded: 'Combines cricket knowledge, strategy, decision-making, negotiation and financial management.',
    icon: 'message-square-text',
    registrationStatus: 'open',
  },
  {
    poster: paper,
    id: 'paper-presentation',
    registrationFee: '₹149',
    prizePool: '₹11,250',
    title: 'Paper Presentation',
    category: 'technical',
    description:
      'A platform where participants present research, ideas, innovations or technical concepts on a chosen topic before a panel of judges. Participants are evaluated based on content, clarity, presentation skills, and ability to answer questions.',
    format: 'team',
    teamSize: '2',
    formatMode: 'competition',
    prequalifierRequired: true,
    duration: '6 Hours',
    expectedParticipants: 100,
    venue: 'Classroom',
    resources: 'Projector',
    eligibility: OPEN_TO_ALL,
    whyIncluded:
      'Develops research, communication, presentation, critical thinking and technical knowledge. It provides students an opportunity to showcase ideas and gain experience presenting them professionally.',
    icon: 'presentation',
    registrationStatus: 'open',
  },
  {
    poster: visual,
    id: 'poster-designing',
     registrationFee: '₹99',
    prizePool: '₹1,200',
    title: 'visual vanguard ',
    category: 'non-technical',
    description:
      'Participants design an attractive and impactful poster based on a given theme or topic within a specified time, using creativity, artistic expression, visual communication and innovative thinking.',
    format: 'individual',
    teamSize: 'Individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    expectedParticipants: 40,
    venue: 'Classroom',
    eligibility: OPEN_TO_ALL,
    whyIncluded:
      'Encourages creativity, artistic expression, visual communication and innovative thinking. It requires minimal resources and provides students an opportunity to showcase their design skills.',
    budget: '₹780',
    icon: 'pen-tool',
    registrationStatus: 'open',
  },


];
