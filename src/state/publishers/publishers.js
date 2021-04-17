import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadingStatus from "../../consts/loadingStatus";
import publishersAPI from "./publisherAPI";

export const loadPublishers = createAsyncThunk(
  "publishers/loadPublishers",
  async () => {
    const response = await publishersAPI.loadPublishers();
    return response;
  }
);
export const deletePublisher = createAsyncThunk(
  "publishers/deletePublisher",
  async payload => {
    console.log(payload);
    const response = await publishersAPI.deletePublisher(payload);
    console.log(response);
    return response;
  }
);

const publishers = createSlice({
  name: "publishers",
  initialState: {
    info: "Ładowanie ...",
    status: loadingStatus.INITIAL,
    publishers: []
  },
  extraReducers: {
    [loadPublishers.fulfilled]: (state, { payload }) => {
      if (!payload) {
        state.info = "Coś poszło nie tak";
      } else {
        state.info = "Gotowe";
        state.books = payload;
        state.status = loadingStatus.OK;
      }
    },
    [loadPublishers.pending]: (state, action) => {
      state.info = "Ładowanie ...";
      state.status = loadingStatus.LOADING;
    },
    [loadPublishers.rejected]: (state, action) => {
      state.info = "Coś poszło nie tak ...";
      state.status = loadingStatus.ERROR;
    },
    [deletePublisher.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.info = "Usunięto";

      state.status = loadingStatus.LOADING;
    },
    [deletePublisher.pending]: (state, action) => {
      state.info = "Usuwanie ...";
      state.status = loadingStatus.LOADING;
    },
    [deletePublisher.rejected]: (state, action) => {
      state.info = "Coś poszło nie tak ...";
      state.status = loadingStatus.ERROR;
    }
  }
});
