import { createSlice } from '@reduxjs/toolkit';

import { StrictDict } from '../../../utils';

const initialState = {
  videoSource: '',
  fallbackVideos: [
    '',
    '',
  ],
  allowVideoDownloads: false,
  thumbnail: null,
  transcripts: {},
  allowTranscriptDownloads: false,
  duration: {
    startTime: '00:00:00',
    stopTime: '00:00:00',
    total: '00:00:00',
  },
  showTranscriptByDefault: false,
  handout: null,
  licenseType: null,
  licenseDetails: {
    attribution: false,
    noncommercial: false,
    noDerivatives: false,
    shareAlike: false,
  },
};

// eslint-disable-next-line no-unused-vars
const video = createSlice({
  name: 'video',
  initialState,
  reducers: {
    updateField: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    load: (state, { payload }) => ({
      ...payload,
    }),
  },
});

const actions = StrictDict(video.actions);

const { reducer } = video;

export {
  actions,
  initialState,
  reducer,
};
