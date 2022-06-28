import React from 'react';
import ProblemTypes from '../../../data/constants/ProblemTypes';
import {Button} from '@edx/paragon';

export const hooks = {
    displayAnswers: ({problemType, answers})=>{
        // Some modifcation of the redux state
        return (<p>A List of Answers</p>);
    },
    addAnswer: () => ({answers}) =>{
         // Some modifcation of the redux state
        return;
    },
}
export const AnswersContainer = ({
  //Redux
  problemType,
  answers
}) => {

  const problemStaticData = ProblemTypes[problemType];
  return (
    <div>
        {hooks.displayAnswers({problemType, answers})}
        <div>
        <Button onClick={hooks.addAnswer(answers)}/>
        </div>
    </div>
  );
}

export default