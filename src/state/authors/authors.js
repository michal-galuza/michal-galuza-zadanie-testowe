import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadingStatus from "../../consts/loadingStatus";
import authorsAPI from "./authorsAPI";
export const loadAuthors = createAsyncThunk("authors/loadAuthors", async () => {
  const response = await authorsAPI.loadAuthors();
  return response;
});
export const deleteAuthor = createAsyncThunk(
  "authors/deleteAuthor",
  async payload => {
    const response = await authorsAPI.deleteAuthor(payload);
    return response;
  }
);
export const addAuthor = createAsyncThunk(
  "authors/addAuthor",
  async payload => {
    if (
      !payload.firstName ||
      !payload.lastName ||
      typeof payload.lastName === "number" ||
      typeof payload.firstName === "number"
    ) {
      return { message: "Wprowadzono nie poprawne dane" };
    }
    const response = await authorsAPI.addAuthor(payload);
    if (!response) {
      return { message: "Coś poszło nie tak" };
    }
    return response;
  }
);

export const authors = createSlice({
  name: "authors",
  initialState: {
    authors: [],
    status: loadingStatus.INITIAL,
    info: "Ładowanie ...",
    infoForAddAuthor: "",
    infoForRemoveAuthor: ""
  },
  reducers: {
    setAddAuthorInfo: (state, { payload = "" }) => {
      state.infoForAddAuthor = payload;
    }
  },
  extraReducers: {
    [loadAuthors.fulfilled]: (state, { payload }) => {
      if (!payload) {
        state.info = "Coś poszło nie tak";
      } else {
        state.info = "Gotowe";
        state.authors = payload;
        state.status = loadingStatus.OK;
      }
    },
    [loadAuthors.pending]: (state, action) => {
      state.info = "Ładowanie ...";
      state.status = loadingStatus.LOADING;
    },
    [loadAuthors.rejected]: (state, action) => {
      state.info = "Coś poszło nie tak";
      state.status = loadingStatus.ERROR;
    },
    [deleteAuthor.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.info = "Usunięto poprawnie";

      state.status = loadingStatus.LOADING;
    },
    [deleteAuthor.pending]: (state, action) => {
      state.info = "Usuwanie ...";
      state.status = loadingStatus.LOADING;
    },
    [deleteAuthor.rejected]: (state, action) => {
      state.info = "Coś poszło nie tak";
      state.status = loadingStatus.ERROR;
    },
    [addAuthor.pending]: (state, action) => {
      state.infoForAddAuthor = "Dodawanie autora";
    },
    [addAuthor.fulfilled]: (state, action) => {
      if (action.payload.message) {
        state.infoForAddAuthor = "Coś poszło nie tak";
      } else {
        state.authors = [...state.authors, action.payload];
        state.authors = state.authors.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
        state.infoForAddAuthor = "Dodano nowego autora";
      }
    },
    [addAuthor.rejected]: (state, action) => {
      state.infoForAddAuthor = "Coś poszło nie tak";
    }
  }
});
export const { setAddAuthorInfo } = authors.actions;
export const authorsState = state => state.authors;
export default authors.reducer;
