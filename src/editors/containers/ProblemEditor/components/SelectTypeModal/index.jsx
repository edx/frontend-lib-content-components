import React from 'react';
import PropTypes from 'prop-types';

import ProblemTypeSelect from './content/ProblemTypeSelect';
import Preview from './content/Preview';
import SelectTypeWrapper from './SelectTypeWrapper'

export const SelectTypeModal = ({
  onClose,
}) => {
  const { selected, setSelected } = hooks.state.selected(null);

  return (
    <div>
      <SelectTypeWrapper selected={selected}>
      <ProblemTypeSelect setSelected={setSelected} />
      <Preview
        problemType={selected}
      />
      </SelectTypeWrapper>
    </div>
  );
};

SelectTypeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SelectTypeModal;
