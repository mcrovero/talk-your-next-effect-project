import { Effect, ManagedRuntime } from "effect";
import { NextResponse } from "next/server";
import { Todo, TodoNotFoundError } from "./business-logic";
import { TodoStore } from "./todo-store";

declare function getTodoById(args: {
  id: number;
}): Effect.Effect<Todo, TodoNotFoundError, TodoStore>;

// Here we use a managed runtime to handle dependencies
export const runtime = ManagedRuntime.make(TodoStore.Default);

export const GET = async () => {
  // We handle the error inside the effect world
  return runtime.runPromise(
    getTodoById({ id: 1 }).pipe(
      Effect.map((res) => {
        return NextResponse.json({ data: res }, { status: 200 });
      }),
      Effect.catchTag("TodoNotFoundError", () => {
        return Effect.succeed(
          NextResponse.json({ message: "No todos found" }, { status: 404 })
        );
      }),
      Effect.catchAllDefect(() => {
        return Effect.succeed(
          NextResponse.json({ message: "Unknown error" }, { status: 500 })
        );
      })
    )
  );
};
