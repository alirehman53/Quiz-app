import React from 'react';
import styled from 'styled-components';
import './Question.css';
type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNum: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  const Title = styled.h1`
    font-size: 1.8em;
    text-align: center;
    color: rgb(77, 13, 57);
  `;

  // Define what main theme will look like

  return (
    <div className={'quest'}>
      <Title>
        Question:{questionNum}/{totalQuestions}
      </Title>
      <Title dangerouslySetInnerHTML={{__html: question}} />
      <div>
        {answers.map((answer) => {
          return (
            <div>
              <button
                key={answer}
                className={'but'}
                disabled={userAnswer}
                onClick={callback}
              >
                {answer}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
