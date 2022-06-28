import {
  useState,
} from 'react';
import { StrictDict } from '../../utils';

import * as module from './hooks';

export const state = StrictDict({
  selected: (val) => useState(val),
});

export default { state };
