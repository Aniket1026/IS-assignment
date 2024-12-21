import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.student.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Student deleted successfully..." });
  } catch (error) {
    console.error("Failed to delete student:", error);
    return NextResponse.json(
      { error: "Failed to delete student " },
      { status: 500 }
    );
  }
}
