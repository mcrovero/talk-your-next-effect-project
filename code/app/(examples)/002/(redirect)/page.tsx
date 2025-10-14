"use client";

import { getTodoByIdAction1 } from "./action-with-redirect";

export default function Page() {
  return (
    <div>
      <button onClick={getTodoByIdAction1}>Get Todo</button>
    </div>
  );
}
