import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// console.log("supabase connections:", supabase);
export async function GET() {
  try {
    const { data, error } = await supabase.from("feedbackhub_user").select("*");
    // console.log("Data:", data);
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      { status: 200 },
    );
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
