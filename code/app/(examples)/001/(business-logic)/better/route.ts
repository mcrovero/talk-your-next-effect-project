import { getTodoById } from "@/lib/business-logic";
import { TodoStore } from "@/lib/todo-store";
import { Effect, ManagedRuntime } from "effect";
import { NextResponse } from "next/server";

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
