import { Effect, Either } from "effect";
import { NextResponse } from "next/server";
import { Todo, TodoNotFoundError } from "./business-logic";
import { TodoStore } from "./todo-store";

declare function getTodoById(args: {
  id: number;
}): Effect.Effect<Todo, TodoNotFoundError, TodoStore>;

export const GET = async () => {
  // We need to exit the effect world
  const todo = await Effect.runPromise(
    getTodoById({ id: 2 }).pipe(
      Effect.provide(TodoStore.Default),
      Effect.either
    )
  );

  if (Either.isLeft(todo)) {
    // The error tag is typed
    if (todo.left._tag === "TodoNotFoundError") {
      return NextResponse.json({ message: "No todos found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
  return NextResponse.json({ data: todo.right }, { status: 200 });
};
