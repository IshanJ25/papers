import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Paper from "@/db/papers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const subjects: string[] = body;

    const usersPapers = await Paper.find({
      subject: { $in: subjects },
    });

    const transformedPapers = usersPapers.reduce((acc, paper) => {
      const existing = acc.find((item) => item.subject === paper.subject);

      if (existing) {
        existing.slots.push(paper.slot);
      } else {
        acc.push({ subject: paper.subject, slots: [paper.slot] });
      }

      return acc;
    }, []);

    // check duplicates
    const seenSubjects = new Set();
    const uniquePapers = transformedPapers.filter((paper) => {
      if (seenSubjects.has(paper.subject)) return false;
      seenSubjects.add(paper.subject);
      return true;
    });

    return NextResponse.json(uniquePapers, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch papers.",
      },
      { status: 500 },
    );
  }
}
