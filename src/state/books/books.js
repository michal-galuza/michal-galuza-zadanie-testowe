import { createSlice } from "@reduxjs/toolkit";
import { loadingStatus } from "../../consts";
import { converToArray, sortFunction } from "../../utils";

const SLICE_NAME = "books";
const initialState = {
  status: loadingStatus.INITIAL,
  books: []
};
const SORTBY = "title";
export const books = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addNewBook: (state, { payload }) => {
      state.books = sortFunction([...state.books, payload], SORTBY);
      state.status = loadingStatus.OK;
    },

    updateBook: (state, { payload }) => {
      const indexToUpdate = state.books.findIndex(
        item => item.id === payload.id
      );
      state.books[indexToUpdate] = payload;
      state.books = sortFunction(state.books, SORTBY);
      state.status = loadingStatus.OK;
    },
    loadBooks: (state, { payload }) => {
      state.books = sortFunction(converToArray(payload), SORTBY);
      state.status = loadingStatus.OK;
    },
    deleteBook: (state, { payload }) => {
      state.status = loadingStatus.OK;
      let newArr = [
        ...state.books.filter((item, index) => {
          return item.id !== payload;
        })
      ];
      state.books = newArr;
    },
    setStatusBooks: (state, { payload }) => {
      state.status = payload;
    }
  }
});
export const {
  addNewBook,
  updateBook,
  loadBooks,
  deleteBook,
  setStatusBooks
} = books.actions;
export const booksState = state => state[SLICE_NAME];
export default books.reducer;
