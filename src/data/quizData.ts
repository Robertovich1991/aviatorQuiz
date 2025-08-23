import { ImageSourcePropType } from 'react-native';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  images: ImageSourcePropType[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the aircraft that carries passengers over long distances?",
    options: ["Biplane", "Fighter", "Passenger aircraft", "Aerobatic aircraft"],
    correctAnswer: 2, // C) Passenger aircraft
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
  },
  {
    id: 2,
    question: "Which aircraft has two wings placed one above the other?",
    options: ["Biplane", "Passenger aircraft", "Civilian observation aircraft", "Modern strategic bomber"],
    correctAnswer: 0, // A) Biplane
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Civilian_observation_aircraft.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
    ],
  },
  {
    id: 3,
    question: "Which aircraft is designed for air combat?",
    options: ["Search and rescue aircraft", "Fighter", "Seaplane", "Anti-submarine aircraft"],
    correctAnswer: 1, // B) Fighter
    images: [
      require('../assets/images/Search_and_rescue_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Seaplane.png'),
      require('../assets/images/Anti_submarine_aircraft.png'),
    ],
  },
  {
    id: 4,
    question: "Which aircraft was most commonly used during World War I?",
    options: ["Biplane", "Modern strategic bomber", "Fighter", "Piston trainer aircraft"],
    correctAnswer: 0, // A) Biplane
    images: [
      require('../assets/images/Biplane.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
    ],
  },
  {
    id: 5,
    question: "Which aircraft is used to perform aerobatic maneuvers?",
    options: ["Aerobatic aircraft", "Anti-submarine aircraft", "Search and rescue aircraft", "Passenger aircraft"],
    correctAnswer: 0, // A) Aerobatic aircraft
    images: [
      require('../assets/images/Aerobatic_aircraft.png'),
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Search_and_rescue_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'),
    ],
  },
  {
    id: 6,
    question: "Which aircraft can take off and land on water?",
    options: ["Seaplane", "Piston trainer aircraft", "Fighter", "Biplane"],
    correctAnswer: 0, // A) Seaplane
    images: [
      require('../assets/images/Seaplane.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Biplane.png'),
    ],
  },
  {
    id: 7,
    question: "Which aircraft is intended for training new pilots?",
    options: ["Anti-submarine aircraft", "Piston trainer aircraft", "Civilian observation aircraft", "Aerobatic aircraft"],
    correctAnswer: 1, // B) Piston trainer aircraft
    images: [
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
      require('../assets/images/Civilian_observation_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
    ],
  },
  {
    id: 8,
    question: "Which aircraft is used for searching and conducting rescue operations?",
    options: ["Search and rescue aircraft", "Passenger aircraft", "Modern strategic bomber", "Biplane"],
    correctAnswer: 0, // A) Search and rescue aircraft
    images: [
      require('../assets/images/Search_and_rescue_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Modern_strategic_bomber.png'),
      require('../assets/images/Biplane.png'),
    ],
  },
  {
    id: 9,
    question: "Which aircraft is used for civilian observation, for example, weather monitoring?",
    options: ["Civilian observation aircraft", "Fighter", "Anti-submarine aircraft", "Seaplane"],
    correctAnswer: 0, // A) Civilian observation aircraft
    images: [
      require('../assets/images/Civilian_observation_aircraft.png'),
      require('../assets/images/Fighter.png'),
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Seaplane.png'),
    ],
  },
  {
    id: 10,
    question: "Which aircraft is designed to deliver nuclear and conventional strikes over long distances?",
    options: ["Modern strategic bomber", "Piston trainer aircraft", "Biplane", "Civilian observation aircraft"],
    correctAnswer: 0, // A) Modern strategic bomber
    images: [
      require('../assets/images/Modern_strategic_bomber.png'),
      require('../assets/images/Piston_trainer_aircraft.png'),
      require('../assets/images/Biplane.png'),
      require('../assets/images/Civilian_observation_aircraft.png'),
    ],
  },
  {
    id: 11,
    question: "Which aircraft patrols the oceans and hunts submarines?",
    options: ["Anti-submarine aircraft", "Passenger aircraft", "Aerobatic aircraft", "Fighter"],
    correctAnswer: 0, // A) Anti-submarine aircraft
    images: [
      require('../assets/images/Anti_submarine_aircraft.png'),
      require('../assets/images/Passenger_aircraft.png'),
      require('../assets/images/Aerobatic_aircraft.png'),
      require('../assets/images/Fighter.png'),
    ],
  },
];
