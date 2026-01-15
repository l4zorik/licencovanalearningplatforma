import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assumes @ alias points to src
import { prisma } from "@/lib/prisma";
import { courseSchema } from "@/lib/validations/course";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      // If user is in session but not DB (e.g. dev env mismatch), return empty or 404
      return NextResponse.json([]);
    }

    const courses = await prisma.course.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. Security: Check Authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Security: Input Validation (Zod)
    const json = await req.json();
    const body = courseSchema.parse(json);

    // 3. Logic: Ensure User Exists in DB
    // We upsert the user to ensure foreign key constraint is satisfied
    // (In a real production app with synced auth, you might just findUnique)
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {},
      create: {
        email: session.user.email,
        name: session.user.name,
      },
    });

    // 4. Execution: Create Record
    const newCourse = await prisma.course.create({
      data: {
        title: body.title,
        platform: body.platform,
        instructor: body.instructor,
        totalHours: body.totalHours,
        spentHours: body.spentHours,
        priority: body.priority,
        deadline: body.deadline ? new Date(body.deadline) : null,
        description: body.description,
        tags: body.tags,
        resources: body.resources,
        notes: body.notes,
        category: body.category,
        userId: user.id,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return detailed validation errors
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }

    console.error("Course creation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
