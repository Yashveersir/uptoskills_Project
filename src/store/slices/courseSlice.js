import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses } from "../../api";
import courseData from "../../constants/courseData";

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
    items: courseData, // Pre-seeded with demo data — never shows "no data" on first load
    loading: false,
    error: null,
    selectedCourse: null,
  },
  reducers: {
    selectCourse: (state, action) => {
      state.selectedCourse = state.items.find((c) => Number(c.id) === Number(action.payload)) || null;
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
        if (!action.payload || action.payload.length === 0) {
          state.items = courseData;
        } else {
          state.items = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.items = courseData;
        state.error = action.payload || action.error?.message || "Failed to fetch courses";
      });
  },
});

export const { selectCourse, clearError } = courseSlice.actions;
export default courseSlice.reducer;
