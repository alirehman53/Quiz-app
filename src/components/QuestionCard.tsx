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

  const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: ${(props) => props.theme.main};
    border: 2px solid ${(props) => props.theme.main};
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
              <Button
                theme={{main: 'royalblue'}}
                disabled={userAnswer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{__html: answer}} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
