import { createSlice } from "@reduxjs/toolkit";
import { loadingStatus } from "../../consts";
import { converToArray, sortFunction } from "../../utils";

const SLICE_NAME = "publishers";
const initialState = {
  status: loadingStatus.INITIAL,
  publishers: []
};
const SORTBY = "name";
const publishers = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addNewPublisher: (state, { payload }) => {
      state.publishers = sortFunction([...state.publishers, payload], SORTBY);
      state.status = loadingStatus.OK;
    },
    updatePublisher: (state, { payload }) => {
      const indexToUpdate = state.publishers.findIndex(
        item => item.id === payload.id
      );
      state.publishers[indexToUpdate] = payload;
      state.publishers = sortFunction(state.publishers, SORTBY);
      state.status = loadingStatus.OK;
    },
    loadPublishers: (state, { payload }) => {
      state.publishers = sortFunction(converToArray(payload), SORTBY);
      state.status = loadingStatus.OK;
    },
    deletePublisher: (state, { payload }) => {
      state.status = loadingStatus.OK;
      let newArr = [
        ...state.publishers.filter((item, index) => {
          return item.id !== payload;
        })
      ];
      state.publishers = newArr;
    },
    setStatusPublishers: (state, { payload }) => {
      state.status = payload;
    }
  }
});
export const {
  addNewPublisher,
  updatePublisher,
  loadPublishers,
  deletePublisher,
  setStatusPublishers
} = publishers.actions;
export const publishersState = state => state[SLICE_NAME];
export default publishers.reducer;
