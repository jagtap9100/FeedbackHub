"use client";
import React, { useState } from "react";
import useFeedbackform from "@/services/useFeedbackform";
export default function FeedbackForm() {
  const { state, handleChange, handleSubmit } = useFeedbackform();

  return (
    <div className=" bg-gray-900 mt-4 w-[33vw] p-8 rounded-2xl">
      <div className="mx-auto max-w-2xl text-center ">
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
          FeedBack
        </h2>
      </div>
      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-2  mt-4">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-semibold text-white"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => handleChange(e)}
                value={state.firstName}
                id="first-name"
                type="text"
                name="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm/6 font-semibold text-white"
            >
              Select Category
            </label>
            <div className="mt-2.5">
              <select
                value={state.category}
                name="cars"
                onChange={(e) => handleChange(e)}
                id="category"
                className="block w-full rounded-md  text-gray-500 px-3.5 py-2 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-white"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                value={state.email}
                id="email"
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm/6 font-semibold text-white"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                value={state.message}
                name="message"
                onChange={(e) => handleChange(e)}
                rows={4}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}
