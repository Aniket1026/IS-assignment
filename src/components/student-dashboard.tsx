"use client";

import { StudentTable } from "@/components/student-table";
import FilterStudentOptions from "./filter-student-option";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchStudents } from "@/lib/redux/studentSlice";
import { AddStudentModal } from "./add-student-modal";

const sessions = ["AY 2023-24", "AY 2024-25", "All"];
const classes = ["CBSE 9", "CBSE 10", "All"];

export function StudentDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSession, setSelectedSession] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const { students, status, error } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  
const filteredStudents = useMemo(() => {
  return students.filter((student) => {
    const matchesSession =
      selectedSession === "All" || student.cohort === selectedSession;
    const matchesClass =
      selectedClass === "All" ||
      student.courses.some((course) =>
        course
          .toUpperCase().split("-")[0]
          .startsWith(selectedClass.replace(" ", ""))
      );

    return matchesSession && matchesClass;
  });
}, [students, selectedSession, selectedClass]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <FilterStudentOptions
          defaultValue={selectedSession}
          options={sessions}
          onSelectOption={setSelectedSession}
        />
        <FilterStudentOptions
          defaultValue={selectedClass}
          options={classes}
          onSelectOption={setSelectedClass}
        />
        <div className="ml-auto">
          <AddStudentModal />
        </div>
      </div>
      <StudentTable students={filteredStudents} />
    </div>
  );
}
