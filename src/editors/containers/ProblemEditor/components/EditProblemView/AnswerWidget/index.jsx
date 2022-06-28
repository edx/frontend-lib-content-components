import React from 'react';
import ProblemTypes from '../../../data/constants/ProblemTypes';


// This widget should be connected, grab all answers from store, update them as needed.
const AnswerWidget = ({
  //Redux
  problemType
})=> {
  const problemStaticData = ProblemTypes[problemType];
  return (
    <div>
      <div>
        <h1 className='problem-answer-title'>
          Answers
        </h1>
        <h3>
          {problemStaticData.answerDescription}
        </h3>
      </div>
      <AnswersContainer/>
    </div>
  );
}

export default  AnswerWidget
