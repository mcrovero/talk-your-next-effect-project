import { TodoNotFoundError } from "@/lib/business-logic";
import { Todo } from "@/lib/todo";
import { TodoStore } from "@/lib/todo-store";
import { Effect } from "effect";
import { NextResponse } from "next/server";

declare function getTodoById(
  id: number
): Effect.Effect<Todo, TodoNotFoundError, TodoStore>;

export const GET = async () => {
  try {
    // We need to exit the effect world
    const todo = await Effect.runPromise(
      getTodoById(2).pipe(Effect.provide(TodoStore.Default))
    );

    return NextResponse.json({ data: todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
