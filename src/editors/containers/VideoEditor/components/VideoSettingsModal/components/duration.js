import { useCallback } from 'react';
import * as module from './duration';

const durationMatcher = /^(\d+)?:?(\d+)?:?(\d+)?$/i;

/**
 * durationFromValue(value)
 * Returns a duration string in 'hh:mm:ss' format from the given ms value
 * @param {number} value - duration (in milliseconds)
 * @return {string} - duration in 'hh:mm:ss' format
 */
export const durationFromValue = (value) => {
  const seconds = Math.floor((value / 1000) % 60);
  const minutes = Math.floor((value / 60000) % 60);
  const hours = Math.floor((value / 3600000) % 24);
  const zeroPad = (num) => String(num).padStart(2, '0');
  return [hours, minutes, seconds].map(zeroPad).join(':');
};

/**
 * valueFromDuration(duration)
 * Returns a millisecond duration value from the given 'hh:mm:ss' format string
 * @param {string} duration - duration in 'hh:mm:ss' format
 * @return {number} - duration in milliseconds. Returns null if duration is invalid.
 */
export const valueFromDuration = (duration) => {
  let matches = duration.trim().match(durationMatcher);
  if (!matches) {
    return null;
  }
  matches = matches.slice(1).filter(v => v !== undefined);
  if (matches.length < 3) {
    for (let i = 0; i <= 3 - matches.length; i++) {
      matches.unshift(0);
    }
  }
  const [hours, minutes, seconds] = matches.map(x => parseInt(x, 10) || 0);
  return ((hours * 60 + minutes) * 60 + seconds) * 1000;
};

/**
 * durationValue(duration)
 * Returns the display value for embedded start and stop times
 * @param {object} duration - object containing startTime and stopTime millisecond values
 * @return {object} - start and stop time from incoming object mapped to duration strings.
 */
export const durationValue = (duration) => ({
  startTime: module.durationFromValue(duration.startTime),
  stopTime: module.durationFromValue(duration.stopTime),
});

/**
 * updateDuration({ formValue, local, setLocal, setFormValue })
 * Returns a memoized callback based on inputs that updates local value and form value
 * if the new string is valid (formValue stores a number, local stores a string).
 * If the duration string is invalid, resets the local value to the latest good value.
 * @param {object} formValue - redux-stored durations in milliseconds
 * @param {object} local - hook-stored duration in 'hh:mm:ss' format
 * @param {func} setFormValue - set form value
 * @param {func} setLocal - set local object
 * @return {func} - callback to update duration locally and in redux
 *   updateDuration(args)(index, durationString)
 */
export const updateDuration = ({
  formValue,
  local,
  setFormValue,
  setLocal,
}) => useCallback(
  (index, durationString) => {
    const newValue = module.valueFromDuration(durationString);
    if (newValue !== null) {
      setLocal({ ...local, [index]: durationString });
      setFormValue({ ...formValue, [index]: newValue });
    } else {
      // If invalid duration string, reset to last valid value
      setLocal({ ...local, [index]: module.durationFromValue(formValue[index]) });
    }
  },
  [formValue, local, setLocal, setFormValue],
);
