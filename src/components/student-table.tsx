import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BeakerIcon, BookOpenIcon, Trash2 } from "lucide-react";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { deleteStudent } from "@/lib/redux/studentSlice";
import { Button } from "./ui/button";

export function StudentTable() {
  const dispatch = useDispatch<AppDispatch>();

  const students = useSelector((state: RootState) => state.students.students);
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "dd MMM yyyy");
  };

  const formatDateTime = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "dd MMM yyyy HH:mm'PM'");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Cohort</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead>Date Joined</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.cohort}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                {student.courses.map((course) => (
                  <div
                    key={course}
                    className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                  >
                    {course === "CBSE9 SCIENCE" ||
                    course === "CBSE10 SCIENCE" ? (
                      <BeakerIcon className="h-3 w-3" />
                    ) : (
                      <BookOpenIcon className="h-3 w-3" />
                    )}
                    {course}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>{formatDate(student.dateJoined)}</TableCell>
            <TableCell>{formatDateTime(student.lastLogin)}</TableCell>
            <TableCell>
              <div
                className={`h-2 w-2 rounded-full ${
                  student.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(student.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}