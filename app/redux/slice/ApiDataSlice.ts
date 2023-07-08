import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  load: false,
  data: {
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: [],
  },
};

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState: initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },
    deleteData: state => {
      state = initialState;
      return {...state};
    },
    updatePage: state => {
      state.data.page += 1;
    },
    changeLoad: state => {
      state.load = !state.load;
    },
    updateData: (state, action) => {
      state.data.data = action.payload?.data;
    },
  },
});

export const apiDataReducer = apiDataSlice.reducer;
export const apiDataActions = apiDataSlice.actions;
