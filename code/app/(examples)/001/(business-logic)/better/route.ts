import { getTodoById } from "@/lib/business-logic";
import { TodoStore } from "@/lib/todo-store";
import { Effect, ManagedRuntime } from "effect";
import { NextResponse } from "next/server";

// Here we use a managed runtime to handle dependencies
export const runtime = ManagedRuntime.make(TodoStore.Default);

export const GET = async () => {
  // We handle the error inside the effect world
  return runtime.runPromise(
    Effect.gen(function* () {
      const todo = yield* getTodoById({ id: 1 });

      return NextResponse.json({ data: todo }, { status: 200 });
    }).pipe(
      Effect.catchTag("TodoNotFoundError", () => {
        return Effect.succeed(
          NextResponse.json({ message: "No todos found" }, { status: 404 })
        );
      })
    )
  );
};
