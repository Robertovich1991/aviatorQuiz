# Aviation Juego Quiz

A React Native quiz game that tests your knowledge about different types of aircraft and aviation.

## Features

- **Interactive Quiz**: 11 carefully crafted questions about aviation
- **Beautiful UI**: Modern, aviation-themed design with smooth animations
- **Score Tracking**: Real-time score display and final results
- **Responsive Design**: Works on both iOS and Android devices
- **User-Friendly**: Intuitive navigation and clear feedback

## Quiz Questions

The app includes 11 questions covering various aircraft types:

1. **Passenger Aircraft** - Long-distance passenger transport
2. **Biplane** - Aircraft with two wings stacked vertically
3. **Fighter** - Air combat aircraft
4. **World War I Aircraft** - Historical biplane usage
5. **Aerobatic Aircraft** - Aircraft for aerial maneuvers
6. **Seaplane** - Water takeoff and landing capability
7. **Piston Trainer Aircraft** - Pilot training aircraft
8. **Search and Rescue Aircraft** - Emergency response aircraft
9. **Civilian Observation Aircraft** - Weather monitoring and observation
10. **Modern Strategic Bomber** - Long-range strike aircraft
11. **Anti-submarine Aircraft** - Submarine hunting aircraft

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aviatorQuiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the Metro bundler:
```bash
npx react-native start
```

4. Run the app:

For Android:
```bash
npx react-native run-android
```

For iOS:
```bash
npx react-native run-ios
```

## How to Play

1. **Start the Game**: Tap "New Game" on the main menu
2. **Answer Questions**: Select the correct answer from the four options
3. **See Results**: Get immediate feedback on your answer
4. **Track Progress**: Monitor your score as you progress
5. **Complete the Quiz**: Finish all 11 questions to see your final score
6. **Play Again**: Restart the quiz or return to the main menu

## Scoring System

- **80-100%**: Excellent! You're an aviation expert!
- **60-79%**: Good job! You know your aircraft!
- **40-59%**: Not bad! Keep learning about aviation!
- **0-39%**: Keep studying! Aviation is fascinating!

## Technical Details

- **Framework**: React Native 0.81.0
- **Language**: TypeScript
- **Navigation**: State-based navigation (no external navigation library)
- **Styling**: React Native StyleSheet
- **State Management**: React Hooks (useState)

## Project Structure

```
aviatorQuiz/
├── src/
│   ├── components/
│   │   ├── GameMenu.tsx      # Main menu component
│   │   └── GameScreen.tsx    # Quiz game screen
│   └── data/
│       └── quizData.ts       # Quiz questions and answers
├── App.tsx                   # Main app component
└── README.md                 # This file
```

## Contributing

Feel free to contribute to this project by:
- Adding more quiz questions
- Improving the UI/UX
- Adding new features
- Fixing bugs

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Aviation enthusiasts and experts for the quiz content
- React Native community for the excellent framework
- Aircraft images and information from various aviation resources
