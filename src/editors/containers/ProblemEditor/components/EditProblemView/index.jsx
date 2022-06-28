import React from 'react';

import AnswerWidget from './AnswerWidget';
import SettingsWidget from './SettingsWidget';
import QuestionWidget from './QuestionWidget';
import { EditorContainer } from '../../../EditorContainer';

export const hooks = {
  captureMarkdownAndSettings: () => {
    const currentstate = useSelector(selectors.problem.problemState);
    return {
      /*Some State based off the xblock API needs*/

    }

  }
}

export default function EditProblemView() {
  return (
    <div>
      <EditorContainer getContent={hooks.get}>
        <div>
          <h1>
            Edit Problem View
          </h1>
        </div>
        <AnswerWidget />
        <SettingsWidget />
        <QuestionWidget />
      </EditorContainer>
    </div>
  );
}
