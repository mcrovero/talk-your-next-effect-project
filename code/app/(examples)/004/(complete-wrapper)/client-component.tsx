"use client";

import { getTodoByIdAction } from "./action";

export default function ClientComponent() {
  return (
    <div>
      <button
        onClick={() => getTodoByIdAction().then((todo) => alert(todo.title))}
      >
        Get Todo
      </button>
    </div>
  );
}
