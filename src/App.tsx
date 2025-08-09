import React, { useState, useEffect, useCallback } from 'react';
// API & Types
import { fetchQuizQuestions, Difficulty, QuestionsState } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Styles
import { GlobalStyle, Wrapper, ResultsWrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [timeLeft, setTimeLeft] = useState(30);

  // Wrap nextQuestion in useCallback
  const nextQuestion = useCallback(() => {
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
      setTimeLeft(30);
    }
  }, [number]);

  // Timer effect
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          nextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, nextQuestion]);

  // Start quiz
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setTimeLeft(30);
    setLoading(false);
  };

  // Check answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  // Early end quiz
  const endQuizEarly = () => {
    setGameOver(true);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Math Quiz</h1>

        {/* Show Results if game over and user answered at least one question */}
        {gameOver && userAnswers.length > 0 && (
          <ResultsWrapper style={{ animation: 'fadeIn 0.6s ease-in-out' }}>
            <h2>
              Final Score: {score} / {TOTAL_QUESTIONS}
            </h2>
            <p>
              Difficulty:{' '}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>

            <div className="summary">
              {userAnswers.map((answer, idx) => (
                <div key={idx} className="summary-item">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${idx + 1}. ${answer.question}`,
                    }}
                  />
                  <p>
                    Your Answer:{' '}
                    <span style={{ color: answer.correct ? 'limegreen' : 'red' }}>
                      {answer.answer}
                    </span>
                  </p>
                  {!answer.correct && (
                    <p style={{ color: 'lightblue' }}>
                      Correct Answer: {answer.correctAnswer}
                    </p>
                  )}
                  <hr />
                </div>
              ))}
            </div>

            <button className="start" onClick={startQuiz}>
              Restart
            </button>
          </ResultsWrapper>
        )}

        {/* Difficulty select + Start button (only if game over and quiz not done) */}
        {gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
          <>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
            </select>
            <button className="start" onClick={startQuiz}>
              Start
            </button>
          </>
        )}

        {/* Show score, timer and End button during quiz */}
        {!gameOver && (
          <>
            <p className="score">Score: {score}</p>
            <p>Time Left: {timeLeft}s</p>

            <button className="end" onClick={endQuizEarly}>
              End Quiz
            </button>
          </>
        )}

        {loading && <p>Loading Questions...</p>}

        {/* Show current question */}
        {!loading && !gameOver && questions.length > 0 && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {/* Next question button */}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};

export default App;
