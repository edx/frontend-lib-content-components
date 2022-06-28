// import { createSelector } from 'reselect';

import keyStore from '../../../../../utils/keyStore';

import { initialState } from './reducers';
// import * as module from './selectors';

const stateKeys = keyStore(initialState);


export const problemState = (state) => state;

export const simpleSelectors = [
  ...stateKeys,
].reduce((obj, key) => ({ ...obj, [key]: state => state[key] }), {});

export default {
  ...simpleSelectors,
};
