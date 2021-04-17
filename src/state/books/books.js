import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadingStatus from "../../consts/loadingStatus";
import booksAPI from "./booksAPI";

export const loadBooks = createAsyncThunk("books/loadBooks", async () => {
  const response = await booksAPI.loadBooks();
  return response;
});
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async payload => {
    console.log(payload);
    const response = await booksAPI.deleteBook(payload);
    console.log(response);
    return response;
  }
);
export const books = createSlice({
  name: "books",
  initialState: {
    info: "Ładowanie ...",
    status: loadingStatus.INITIAL,
    books: []
  },
  extraReducers: {
    [loadBooks.fulfilled]: (state, { payload }) => {
      if (!payload) {
        state.info = "Coś poszło nie tak";
      } else {
        state.info = "Gotowe";
        state.books = payload;
        state.status = loadingStatus.OK;
      }
    },
    [loadBooks.pending]: (state, action) => {
      state.info = "Ładowanie ...";
      state.status = loadingStatus.LOADING;
    },
    [loadBooks.rejected]: (state, action) => {
      state.info = "Coś poszło nie tak ...";
      state.status = loadingStatus.ERROR;
    },
    [deleteBook.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.info = "Usunięto";

      state.status = loadingStatus.LOADING;
    },
    [deleteBook.pending]: (state, action) => {
      state.info = "Usuwanie ...";
      state.status = loadingStatus.LOADING;
    },
    [deleteBook.rejected]: (state, action) => {
      state.info = "Coś poszło nie tak ...";
      state.status = loadingStatus.ERROR;
    }
  }
});
export const booksState = state => state.books;
export default books.reducer;
