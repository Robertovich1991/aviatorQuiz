import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { quizQuestions, QuizQuestion } from '../data/quizData';

interface GameScreenProps {
  onBackToMenu: () => void;
}


const GameScreen: React.FC<GameScreenProps> = ({ onBackToMenu }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
  };

  const getOptionStyle = (optionIndex: number) => {
    if (!showResult) {
      return [
        styles.option,
        selectedAnswer === optionIndex && styles.selectedOption,
      ];
    }

    if (optionIndex === currentQuestion.correctAnswer) {
      return [styles.option, styles.correctOption];
    }

    if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return [styles.option, styles.incorrectOption];
    }

    return styles.option;
  };

  const getOptionTextStyle = (optionIndex: number) => {
    if (!showResult) {
      return [
        styles.optionText,
        selectedAnswer === optionIndex && styles.selectedOptionText,
      ];
    }

    if (optionIndex === currentQuestion.correctAnswer) {
      return [styles.optionText, styles.correctOptionText];
    }

    if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return [styles.optionText, styles.incorrectOptionText];
    }

    return styles.optionText;
  };

  if (gameCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score}/{quizQuestions.length} ({percentage}%)
          </Text>
          
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {percentage >= 80 ? 'Excellent! You\'re an aviation expert!' :
               percentage >= 60 ? 'Good job! You know your aircraft!' :
               percentage >= 40 ? 'Not bad! Keep learning about aviation!' :
               'Keep studying! Aviation is fascinating!'}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRestartGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onBackToMenu}>
              <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground  source={require('../assets/images/planeBackground.png')} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleAnswerSelect(index)}
            disabled={showResult}
          >
            <View style={styles.optionContent}>
              <Image 
                source={currentQuestion.images[index]} 
                style={styles.optionImage}
                resizeMode="contain"
              />
              <Text style={getOptionTextStyle(index)}>
                {String.fromCharCode(65 + index)}) {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {selectedAnswer === currentQuestion.correctAnswer
              ? '✅ Correct!'
              : '❌ Incorrect!'}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#cccccc',
    fontSize: 16,
  },
  scoreText: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    width: '100%',
    flex: 1,
  },
  option: {
    backgroundColor: '#16213e',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionImage: {
    width: 120,
    height: 70,
    marginRight: 15,
    borderRadius: 8,
  },
  selectedOption: {
    borderColor: '#e94560',
    backgroundColor: '#e94560',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    borderColor: '#f44336',
    backgroundColor: '#f44336',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'left',
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  correctOptionText: {
    fontWeight: 'bold',
  },
  incorrectOptionText: {
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#e94560',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
  },
  secondaryButton: {
    backgroundColor: '#0f3460',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;
