/* Copyright (c) 2026, Yao Zeran
 *
 * Section for configuring the authenticated user role. */


"use client";


import { useAuthContext } from "@/features/auth/context/AuthProvider";

import type { Author, Reader, UserType } from "@/types/user";


function UserRoleSection() {
  const { user, setUser } = useAuthContext();

  const currentRoleLabel = user.role === "author" ? "Writer" : "Reader";

  function handleRoleChange(role: UserType) {
    if (role === "reader") {
      const nextUser: Reader = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: "reader",
      };

      setUser(nextUser);
      return;
    }

    const nextUser: Author = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: "author",
      penName: user.name,
      authorBio: "",
    };

    setUser(nextUser);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Account Role
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">Configure your profile</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {currentRoleLabel}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-600">
        Choose whether this account behaves as a reader or a writer in the space area.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleRoleChange("reader")}
          className={`rounded-2xl border px-4 py-3 text-left transition ${
            user.role === "reader"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
          }`}
        >
          <div className="text-sm font-semibold">Reader</div>
          <p className={`mt-1 text-xs ${user.role === "reader" ? "text-slate-200" : "text-slate-500"}`}>
            Browse books, track reading, and keep a personal shelf.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange("author")}
          className={`rounded-2xl border px-4 py-3 text-left transition ${
            user.role === "author"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
          }`}
        >
          <div className="text-sm font-semibold">Writer</div>
          <p className={`mt-1 text-xs ${user.role === "author" ? "text-slate-200" : "text-slate-500"}`}>
            Publish reviews, build an author identity, and share your work.
          </p>
        </button>
      </div>
    </section>
  );
}


export default UserRoleSection;