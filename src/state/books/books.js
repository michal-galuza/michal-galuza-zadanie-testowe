import { createSlice } from "@reduxjs/toolkit";
import { loadingStatus } from "../../consts/index";

export const books = createSlice({
  name: "books",
  initialState: {
    info: "Ładowanie ...",
    status: loadingStatus.INITIAL,
    books: []
  }
});
export const booksState = state => state.books;
export default books.reducer;
