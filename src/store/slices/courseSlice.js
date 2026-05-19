import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses } from "../../api/courseApi";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCourses();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch courses");
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedCourse: null,
  },
  reducers: {
    selectCourse: (state, action) => {
      state.selectedCourse = state.items.find((c) => c.id === action.payload) || null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectCourse, clearError } = courseSlice.actions;
export default courseSlice.reducer;
