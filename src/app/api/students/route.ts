import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const students = await prisma.student.findMany();
    return NextResponse.json(students);
  } catch (error: any) {
    console.error("Failed to fetch students:", error);

    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const student = await prisma.student.create({
      data: {
        name: body.name,
        cohort: body.cohort,
        courses: body.courses,
        status: body.status,
      },
    });
    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Failed to create student:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
