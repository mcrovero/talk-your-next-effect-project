"use client";

import { getTodoByIdAction } from "./action";

export default function Page() {
  return (
    <div>
      <button onClick={() => getTodoByIdAction(2)}>Get Todo</button>
    </div>
  );
}
