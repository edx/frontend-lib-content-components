import { StrictDict } from '../../../../utils';

const types = {
  SINGLESELECT: {
    title: 'Single Select Problem',
    preview: (<div />),
    description: 'Specify one correct answer from a list of possible options',
    answerDescription: 'Answer Description',
    helpLink: 'something.com',
  },
  MULTISELECT: {
    title: 'Multi Select Problem',
    preview: (<div />),
    description: 'Specify one or more correct answers from a list of possible options.',
    helpLink: 'something.com',
  },
  DROPDOWN: {
    title: 'Dropdown Problem',
    preview: (<div />),
    description: 'Specify one correct answer from a list of possible options, selected in a dropdown menu.',
    helpLink: 'something.com',
  },
  NUMERIC: {
    title: 'Numeric Response Problem',
    preview: (<div />),
    description: 'Specify one or more correct numeric answers, submitted in a response field.',
    helpLink: 'something.com',
  },
  TEXTINPUT: {
    title: 'Text Input Problem',
    preview: (<div />),
    description: 'Specify one or more correct text answers, including numbers and special characters, submitted in a response field.',
    helpLink: 'something.com',
  },
};

export default StrictDict(types);
