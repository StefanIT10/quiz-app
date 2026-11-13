import "./App.css";
import React, { useState } from "react";
import { questions } from "./data/questions";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const answerLetters = ["A", "B", "C", "D"];

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) {
      return;
    }
    setSelectedAnswer(index);

    if (index === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Exquiz Me?</h1>

      {quizFinished ? (
        <div className="results-card">
          <h2>Quiz Completed! 🎉</h2>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
          <button className="next-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="question-progress">
            <span className="question-label">QUESTION</span>
            <span className="question-number">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="question-card">
            <h2>{currentQuestion.question}</h2>

            <div className="answers">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={
                    selectedAnswer !== null
                      ? index === currentQuestion.correctAnswer
                        ? "correct"
                        : index === selectedAnswer
                          ? "incorrect"
                          : ""
                      : ""
                  }
                >
                  <span className="answer-letter">{answerLetters[index]}</span>
                  <span className="answer-text">{answer}</span>
                </button>
              ))}
            </div>
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
          <div className="score-badge">⭐ Score: {score}</div>
        </>
      )}
    </div>
  );
}

export default App;
