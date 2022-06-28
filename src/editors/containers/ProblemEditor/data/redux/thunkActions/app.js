export const initialize = () => (dispatch) => {

  const blockValue = useSelector(selectors.app.blockValue);

  //NOTE: These are to-do methods.
  const data = {...MarkdownParser.getProblem(blockValue.metadata.markdown), getSettingsFromMetaData(blockValue.metadata)}
  dispatch(actions.problem.initialize(data));
};

export default { initialize };
