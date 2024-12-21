import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: string[];
  dateJoined: string;
  lastLogin: string;
  status: "active" | "inactive";
}

interface StudentState {
  students: Student[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await fetch("/api/students");
      if (!response.ok) throw new Error("Failed to fetch students");
      return response.json() as Promise<Student[]>;
    } catch (error: any) {
      throw error.message;
    }
  }
);

export const addStudent = createAsyncThunk(
  "add/addStudent",
  async (student: Omit<Student, "id">) => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) throw new Error("Failed to add student");
      return response.json() as Promise<Student>;
    } catch (error: any) {
      throw error.message;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id: string) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete student");
      return id;
    } catch (error: any) {
      console.log("Error in deleting student: ", error.message);
      throw new error.message();
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.status = "success";
          state.students = action.payload;
        }
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.status = "success";
          state.students.push(action.payload);
        }
      )
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        deleteStudent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.students = state.students.filter(
            (student) => student.id !== action.payload
          );
        }
      );
  },
});

export default studentSlice.reducer;
