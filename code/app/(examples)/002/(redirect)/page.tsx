"use client";

import { getTodoByIdAction1 } from "./action-with-redirect";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black flex-col">
      <button
        onClick={getTodoByIdAction1}
        className="px-6 py-3 bg-white text-black font-semibold rounded shadow hover:bg-gray-200 transition-colors"
      >
        Fetch Todo and Redirect on 404
      </button>

       <p className="text-white mt-4">
        This will not work because the redirect is handled as defect
       </p>
    </div>
  );
}
