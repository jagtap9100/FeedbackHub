import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("feedbackhub_details")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, feedback } = body;

    if (!name || !email || !category || !feedback) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Insert into feedbackhub_details. We support inserting standard columns:
    // name, email, category, feedback.
    const { data, error } = await supabase
      .from("feedbackhub_details")
      .insert([
        {
          name,
          email,
          category,
          feedback,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error during insert:", error);
      // Attempt fallback column name if 'feedback' column isn't found
      if (
        error.message.includes("column") &&
        error.message.includes("feedback")
      ) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("feedbackhub_details")
          .insert([
            {
              name,
              email,
              category,
              message: feedback,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (fallbackError) {
          return NextResponse.json(
            { success: false, error: fallbackError.message },
            { status: 500 },
          );
        }
        return NextResponse.json({ success: true, data: fallbackData });
      }

      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
