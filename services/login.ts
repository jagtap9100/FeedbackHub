import axios from "axios";

export default async function login() {
  type ApiError = {
    error: string;
  };

  try {
    console.log("calling api ");
    const res = await axios.get("/api/v1/supabase");
    console.log("Supabase Data:", res.data);
    // return res.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.error(error.response?.data?.error || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    } else {
      console.error("Unknown error in login:", error);
      return { success: false, error: "An unknown error occurred" };
    }
  }
}
