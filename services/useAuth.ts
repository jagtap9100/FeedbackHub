"use client";
import { useState, useEffect } from "react";
import login from "@/services/login";

export default function useAuth() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response: unknown = await login();
        if (response && (response as { success: boolean }).success) {
          setData((response as { data: unknown }).data);
        } else {
          setError(
            (response as { error: string })?.error || "Failed to load data",
          );
        }
      } catch (err: unknown) {
        setError((err as Error).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
