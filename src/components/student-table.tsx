import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BeakerIcon, BookOpenIcon, Trash2 } from "lucide-react";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import { deleteStudent } from "@/lib/redux/studentSlice";
import { Button } from "./ui/button";
import { Student } from "../lib/redux/studentSlice";

export function StudentTable({ students}: { students: Student[] }) {
  const dispatch = useDispatch<AppDispatch>();

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
    <div className="">
      <div className="relative h-[400px] hidden sm:block overflow-x-auto overflow-y-auto rounded-sm">
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
                        className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
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
                    className={`h-3 w-3 rounded-full m-auto ${
                      student.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
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
      </div>

      <div className="grid gap-4 sm:hidden">
        {students.map((student) => (
          <div
            key={student.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-2">{student.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Cohort:</span> {student.cohort}
            </p>
            <div className="mb-2">
              <span className="font-medium text-sm text-gray-600">
                Courses:
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
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
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Date Joined:</span>{" "}
              {formatDate(student.dateJoined)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Last Login:</span>{" "}
              {formatDateTime(student.lastLogin)}
            </p>
            <div className="flex items-center mb-2">
              <span className="font-medium text-sm text-gray-600 mr-2">
                Status:
              </span>
              <div
                className={`h-3 w-3 rounded-full ${
                  student.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="ml-1 text-sm capitalize">{student.status}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(student.id)}
              className="w-full justify-end mt-2"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}