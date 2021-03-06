import { createSlice } from "@reduxjs/toolkit";
import { loadingStatus } from "../../consts/index";
import { converToArray, sortFunction } from "../../utils";
const SILCE_NAME = "authors";
const initialState = {
  status: loadingStatus.INITIAL,
  authors: []
};
const SORTBY = "lastName";
const authors = createSlice({
  name: SILCE_NAME,
  initialState,
  reducers: {
    addNewAuthor: (state, { payload }) => {
      state.authors = sortFunction([...state.authors, payload], SORTBY);
      state.status = loadingStatus.OK;
    },
    updateAuthor: (state, { payload }) => {
      const indexToUpdate = state.authors.findIndex(
        item => item.id === payload.id
      );
      state.authors[indexToUpdate] = payload;
      state.authors = sortFunction(state.authors, SORTBY);
      state.status = loadingStatus.OK;
    },
    loadAuthors: (state, { payload }) => {
      state.authors = sortFunction(converToArray(payload), SORTBY);
      state.status = loadingStatus.OK;
    },
    deleteAuthor: (state, { payload }) => {
      state.status = loadingStatus.OK;
      let newArr = [
        ...state.authors.filter((item, index) => {
          return item.id !== payload;
        })
      ];
      state.authors = newArr;
    },
    setStatusAuthors: (state, { payload }) => {
      state.status = payload;
    }
  }
});
export const {
  deleteAuthor,
  loadAuthors,
  updateAuthor,
  addNewAuthor,
  setStatusAuthors
} = authors.actions;
export const authorsState = state => state[SILCE_NAME];
export default authors.reducer;
