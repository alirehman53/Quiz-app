import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import {fetchQuestions, Difficulty, QuestionState} from './API';
import styled from 'styled-components';
import './App.css';

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);

    setLoading(false);
  };

  const nextQuestion = async () => {
    setNumber(number + 1);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    let obj = {
      question: questions[number].question,
      answer: e.currentTarget.innerText,
      correct: false,
      correct_answer: questions[number].correct_answer,
    };

    if (e.currentTarget.innerText === questions[number].correct_answer) {
      obj.correct = true;
      setScore(score + 1);
    }

    setUserAnswer(() => {
      return userAnswer.concat([obj]);
    });
  };

  const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    color: rgb(0, 64, 107);
  `;

  const Button = styled.button`
    border-radius: 3px;
    border: 2px solid rgb(0, 64, 107);
    fontweight: bold;
    margin: 1em 2em;
    padding: 0.15em 1em;
    background: rgb(19, 128, 201);
    font-size: 1em;
    color: white;
    text-align: center;
  `;

  return (
    <div className={'app'}>
      <Title>Quiz Time!</Title>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <Button className="start" onClick={startQuiz}>
          Begin Quiz
        </Button>
      ) : null}
      {!gameOver ? <Title className="score">Score:{score}</Title> : null}
      {loading ? <p>Loading</p> : null}
      {!loading && !gameOver ? (
        <QuestionCard
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}

      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <Button className="next" onClick={nextQuestion}>
          Next
        </Button>
      ) : null}
    </div>
  );
}

export default App;
