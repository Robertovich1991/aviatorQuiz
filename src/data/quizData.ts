import { ImageSourcePropType } from 'react-native';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  images: ImageSourcePropType[];
  level: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Level 1 - Easy Questions (10 points each)
export const level1Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the aircraft that carries passengers over long distances?",
    options: ["Biplane", "Fighter", "Passenger aircraft", "Aerobatic aircraft"],
    correctAnswer: 2,
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 2,
    question: "Which aircraft has two wings placed one above the other?",
    options: ["Biplane", "Passenger aircraft", "Civilian observation aircraft", "Modern strategic bomber"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Civilian_observation_aircraft.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 3,
    question: "Which aircraft is designed for air combat?",
    options: ["Search and rescue aircraft", "Fighter", "Seaplane", "Anti-submarine aircraft"],
    correctAnswer: 1,
    images: [
      require('../assets/images/Search_and_rescue_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Seaplane.png'),
      require('../assets/images/Anti_submarine_aircraft.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 4,
    question: "Which aircraft can take off and land on water?",
    options: ["Seaplane", "Piston trainer aircraft", "Fighter", "Biplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Seaplane.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Biplane.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 5,
    question: "Which aircraft is intended for training new pilots?",
    options: ["Anti-submarine aircraft", "Piston trainer aircraft", "Civilian observation aircraft", "Aerobatic aircraft"],
    correctAnswer: 1,
    images: [
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
      require('../assets/images/Civilian_observation_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 6,
    question: "Which aircraft is used for searching and conducting rescue operations?",
    options: ["Search and rescue aircraft", "Passenger aircraft", "Modern strategic bomber", "Biplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Search_and_rescue_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
      require('../assets/images/Biplane.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 7,
    question: "Which aircraft is used for civilian observation, for example, weather monitoring?",
    options: ["Civilian observation aircraft", "Fighter", "Anti-submarine aircraft", "Seaplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Civilian_observation_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Seaplane.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 8,
    question: "Which aircraft is used to perform aerobatic maneuvers?",
    options: ["Aerobatic aircraft", "Anti-submarine aircraft", "Search and rescue aircraft", "Passenger aircraft"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Aerobatic_aircraft.png'),
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Search_and_rescue_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'),
    ],
    level: 1,
    points: 10,
    difficulty: 'easy',
  },
];

// Level 2 - Medium Questions (20 points each)
export const level2Questions: QuizQuestion[] = [
  {
    id: 9,
    question: "Which aircraft is designed to deliver nuclear and conventional strikes over long distances?",
    options: ["Modern strategic bomber", "Piston trainer aircraft", "Biplane", "Civilian observation aircraft"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Modern_strategic_bomber.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
      require('../assets/images/Biplane.png'),
      require('../assets/images/Civilian_observation_aircraft.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 10,
    question: "Which aircraft patrols the oceans and hunts submarines?",
    options: ["Anti-submarine aircraft", "Passenger aircraft", "Aerobatic aircraft", "Fighter"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
      require('../assets/images/Fighter.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 11,
    question: "Which aircraft was most commonly used during World War I?",
    options: ["Biplane", "Modern strategic bomber", "Fighter", "Piston trainer aircraft"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 12,
    question: "What type of aircraft is typically used for cargo transport?",
    options: ["Fighter", "Passenger aircraft", "Cargo aircraft", "Aerobatic aircraft"],
    correctAnswer: 2,
    images: [
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'), // Using passenger aircraft image as placeholder
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 13,
    question: "Which aircraft is designed for high-speed reconnaissance missions?",
    options: ["Biplane", "Reconnaissance aircraft", "Seaplane", "Piston trainer aircraft"],
    correctAnswer: 1,
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Civilian_observation_aircraft.png'), // Using observation aircraft as placeholder
      require('../assets/images/Seaplane.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 14,
    question: "What aircraft type is known for its ability to hover in place?",
    options: ["Helicopter", "Fighter", "Passenger aircraft", "Biplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Search_and_rescue_aircraft.png'), // Using search and rescue as helicopter placeholder
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Biplane.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 15,
    question: "Which aircraft is primarily used for agricultural purposes like crop dusting?",
    options: ["Agricultural aircraft", "Fighter", "Passenger aircraft", "Modern strategic bomber"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Piston_trainer_aircraft.png'), // Using trainer aircraft as placeholder
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 16,
    question: "What type of aircraft is designed to operate from aircraft carriers?",
    options: ["Carrier-based aircraft", "Seaplane", "Passenger aircraft", "Biplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Fighter.png'), // Using fighter as carrier-based aircraft placeholder
      require('../assets/images/Seaplane.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Biplane.png'),
    ],
    level: 2,
    points: 20,
    difficulty: 'medium',
  },
];

// Level 3 - Hard Questions (30 points each)
export const level3Questions: QuizQuestion[] = [
  {
    id: 17,
    question: "Which aircraft type is known for its stealth capabilities and radar evasion?",
    options: ["Stealth aircraft", "Biplane", "Passenger aircraft", "Seaplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Modern_strategic_bomber.png'), // Using bomber as stealth aircraft placeholder
      require('../assets/images/Biplane.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Seaplane.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 18,
    question: "What aircraft is designed to refuel other aircraft in mid-flight?",
    options: ["Tanker aircraft", "Fighter", "Passenger aircraft", "Aerobatic aircraft"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Passenger_aircraft.png'), // Using passenger aircraft as tanker placeholder
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 19,
    question: "Which aircraft type is specifically designed for electronic warfare?",
    options: ["Electronic warfare aircraft", "Fighter", "Biplane", "Seaplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Modern_strategic_bomber.png'), // Using bomber as EW aircraft placeholder
      require('../assets/images/Fighter.png'),
      require('../assets/images/Biplane.png'),
      require('../assets/images/Seaplane.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 20,
    question: "What aircraft is designed to carry and launch satellites into space?",
    options: ["Space launch aircraft", "Passenger aircraft", "Fighter", "Biplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Modern_strategic_bomber.png'), // Using bomber as space launch aircraft placeholder
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Biplane.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 21,
    question: "Which aircraft type is used for early warning and control systems?",
    options: ["AWACS aircraft", "Fighter", "Passenger aircraft", "Aerobatic aircraft"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Passenger_aircraft.png'), // Using passenger aircraft as AWACS placeholder
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 22,
    question: "What aircraft is designed for high-altitude reconnaissance and surveillance?",
    options: ["High-altitude reconnaissance aircraft", "Fighter", "Biplane", "Seaplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Civilian_observation_aircraft.png'), // Using observation aircraft as high-altitude placeholder
      require('../assets/images/Fighter.png'),
      require('../assets/images/Biplane.png'),
      require('../assets/images/Seaplane.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 23,
    question: "Which aircraft type is specifically designed for maritime patrol and anti-submarine warfare?",
    options: ["Maritime patrol aircraft", "Fighter", "Passenger aircraft", "Aerobatic aircraft"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 24,
    question: "What aircraft is designed for close air support and ground attack missions?",
    options: ["Ground attack aircraft", "Passenger aircraft", "Biplane", "Seaplane"],
    correctAnswer: 0,
    images: [
      require('../assets/images/Fighter.png'), // Using fighter as ground attack aircraft placeholder
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Biplane.png'),
      require('../assets/images/Seaplane.png'),
    ],
    level: 3,
    points: 30,
    difficulty: 'hard',
  },
];

// Combined questions array for backward compatibility
export const quizQuestions: QuizQuestion[] = [
  ...level1Questions,
  ...level2Questions,
  ...level3Questions,
];

// Helper functions for level-based gameplay
export const getQuestionsByLevel = (level: number): QuizQuestion[] => {
  switch (level) {
    case 1:
      return level1Questions;
    case 2:
      return level2Questions;
    case 3:
      return level3Questions;
    default:
      return quizQuestions;
  }
};

export const getTotalQuestionsByLevel = (level: number): number => {
  return getQuestionsByLevel(level).length;
};

export const getMaxPointsByLevel = (level: number): number => {
  const questions = getQuestionsByLevel(level);
  return questions.reduce((total, question) => total + question.points, 0);
};
