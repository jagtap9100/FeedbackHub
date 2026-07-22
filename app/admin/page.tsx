"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  category: string;
  feedback?: string;
  message?: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch("/api/feedback");
        const result = await response.json();
        if (response.ok && result.success) {
          setFeedbackList(result.data || []);
        } else {
          setError(result.error || "Failed to load feedback data");
        }
      } catch (err: unknown) {
        setError((err as Error).message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, []);

  // Filter & Search Logic
  const filteredFeedback = feedbackList.filter((item) => {
    const messageText = item.feedback || item.message || "";
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      messageText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate statistics
  const totalCount = feedbackList.length;
  const bugCount = feedbackList.filter((f) => f.category === "Bug").length;
  const featureCount = feedbackList.filter(
    (f) => f.category === "Feature Request",
  ).length;
  const questionCount = feedbackList.filter(
    (f) => f.category === "Question",
  ).length;
  const generalCount = feedbackList.filter(
    (f) => f.category === "General Feedback",
  ).length;
  const praiseCount = feedbackList.filter(
    (f) => f.category === "Praise",
  ).length;

  const categoriesData = [
    {
      name: "Bug",
      count: bugCount,
      color: "bg-red-500",
      text: "text-red-500",
      fill: "#EF4444",
    },
    {
      name: "Feature Request",
      count: featureCount,
      color: "bg-blue-500",
      text: "text-blue-500",
      fill: "#3B82F6",
    },
    {
      name: "Question",
      count: questionCount,
      color: "bg-amber-500",
      text: "text-amber-500",
      fill: "#F59E0B",
    },
    {
      name: "General Feedback",
      count: generalCount,
      color: "bg-slate-500",
      text: "text-slate-500",
      fill: "#64748B",
    },
    {
      name: "Praise",
      count: praiseCount,
      color: "bg-emerald-500",
      text: "text-emerald-500",
      fill: "#10B981",
    },
  ];

  const maxCount = Math.max(...categoriesData.map((d) => d.count), 1);

  // SVG Pie Chart calculations
  let accumulatedPercent = 0;
  const pieSlices = categoriesData
    .filter((d) => d.count > 0)
    .map((d) => {
      const percent = (d.count / (totalCount || 1)) * 100;
      const startPercent = accumulatedPercent;
      accumulatedPercent += percent;

      // Convert percentage to coordinate points for SVG slice path
      const getCoordinatesForPercent = (percentage: number) => {
        const x = Math.cos(2 * Math.PI * (percentage - 0.25));
        const y = Math.sin(2 * Math.PI * (percentage - 0.25));
        return [x, y];
      };

      const [startX, startY] = getCoordinatesForPercent(startPercent / 100);
      const [endX, endY] = getCoordinatesForPercent(accumulatedPercent / 100);
      const largeArcFlag = percent > 50 ? 1 : 0;

      const pathData = [
        `M 0 0`,
        `L ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`,
      ].join(" ");

      return {
        ...d,
        percent,
        pathData,
      };
    });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-blue-600 flex items-center gap-2">
              Feed-back-Hub
            </h1>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("Dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition ${
                activeTab === "Dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("Feedback List")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition ${
                activeTab === "Feedback List"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Feedback List
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {activeTab === "Dashboard"
                ? "Overview Dashboard"
                : "All Feedback Submissions"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="md:hidden text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100/80 transition"
            >
              Public Form
            </Link>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-semibold border border-slate-200/50">
              Admin Mode
            </span>
          </div>
        </header>

        <div className="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="text-sm font-medium text-slate-500">
                Loading dashboard data...
              </p>
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-100 text-rose-800 p-6 rounded-2xl flex flex-col gap-2">
              <h3 className="font-bold text-lg">Error loading platform data</h3>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 self-start bg-rose-600 text-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-rose-700 transition"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <>
              {/* Dashboard Tab Content */}
              {activeTab === "Dashboard" && (
                <>
                  {/* Statistics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Total
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                        {totalCount}
                      </h3>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100 ">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Bugs
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                        {bugCount}
                      </h3>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100 ">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Features
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                        {featureCount}
                      </h3>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100 ">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Questions
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                        {questionCount}
                      </h3>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100  text-left col-span-2 lg:col-span-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Praise
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                        {praiseCount}
                      </h3>
                    </div>
                  </div>

                  {/* Analytics Section (Pie Chart & Bar Chart) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        Category Distribution
                      </h3>
                      <p className="text-xs text-slate-400 mb-6">
                        Visual percentage breakdown
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                        {totalCount === 0 ? (
                          <div className="text-center text-sm text-slate-400 py-10">
                            No data available yet.
                          </div>
                        ) : (
                          <>
                            <div className="relative w-40 h-40">
                              <svg
                                className="w-full h-full transform -rotate-90"
                                viewBox="-1 -1 2 2"
                              >
                                {pieSlices.map((slice, index) => (
                                  <path
                                    key={index}
                                    d={slice.pathData}
                                    fill={slice.fill}
                                  />
                                ))}
                              </svg>
                              <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center border border-slate-50">
                                <span className="text-2xl font-black text-slate-900">
                                  {totalCount}
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                  Total
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {pieSlices.map((slice, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3"
                                >
                                  <span
                                    className={`w-3 h-3 rounded-full ${slice.color}`}
                                  />
                                  <span className="text-xs font-semibold text-slate-700 min-w-32">
                                    {slice.name}
                                  </span>
                                  <span className="text-xs text-slate-400 font-bold">
                                    {Math.round(slice.percent)}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Bar Chart Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        Feedback Count by Type
                      </h3>
                      <p className="text-xs text-slate-400 mb-6">
                        Quantity breakdown comparisons
                      </p>

                      <div className="space-y-4 py-2">
                        {categoriesData.map((d, index) => {
                          const percentageWidth = Math.max(
                            (d.count / maxCount) * 100,
                            2,
                          );
                          return (
                            <div key={index} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs font-semibold">
                                <span className="text-slate-700">{d.name}</span>
                                <span className="text-slate-900 font-bold">
                                  {d.count}
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${d.color}`}
                                  style={{ width: `${percentageWidth}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Feedback List Section / Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Recent Feedbacks
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Filter, search and explore user submissions
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-700 w-full sm:w-48"
                      />
                      <svg
                        className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z"
                        />
                      </svg>
                    </div>

                    {/* Filter Dropdown */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white text-slate-700 cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      <option value="Bug">Bugs</option>
                      <option value="Feature Request">Features</option>
                      <option value="Question">Questions</option>
                      <option value="General Feedback">General</option>
                      <option value="Praise">Praise</option>
                    </select>
                  </div>
                </div>

                {filteredFeedback.length === 0 ? (
                  <div className="py-16 text-center text-sm text-slate-400 font-medium">
                    No matching feedback entries found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
                          <th className="py-3.5 px-6 font-semibold">
                            User Details
                          </th>
                          <th className="py-3.5 px-6 font-semibold">
                            Category
                          </th>
                          <th className="py-3.5 px-6 font-semibold">Message</th>
                          <th className="py-3.5 px-6 font-semibold">
                            Submitted On
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredFeedback.map((item) => {
                          const categoryBadgeColors: { [key: string]: string } =
                            {
                              Bug: "bg-red-50 text-red-600 border border-red-100",
                              "Feature Request":
                                "bg-blue-50 text-blue-600 border border-blue-100",
                              Question:
                                "bg-amber-50 text-amber-600 border border-amber-100",
                              "General Feedback":
                                "bg-slate-50 text-slate-600 border border-slate-100",
                              Praise:
                                "bg-emerald-50 text-emerald-600 border border-emerald-100",
                            };

                          const createdDate = new Date(
                            item.created_at,
                          ).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          });

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-slate-50/50 transition"
                            >
                              <td className="py-4 px-6">
                                <div className="font-semibold text-slate-900">
                                  {item.name}
                                </div>
                                <div className="text-slate-400 mt-0.5">
                                  {item.email}
                                </div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${categoryBadgeColors[item.category] || "bg-slate-50 text-slate-600"}`}
                                >
                                  {item.category}
                                </span>
                              </td>
                              <td className="py-4 px-6 max-w-sm">
                                <div className="text-slate-600 line-clamp-2 leading-relaxed">
                                  {item.feedback || item.message}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-slate-400 whitespace-nowrap font-medium">
                                {createdDate}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
