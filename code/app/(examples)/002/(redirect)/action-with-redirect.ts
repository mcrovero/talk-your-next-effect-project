"use server";

import { Cause, Effect, Exit } from "effect";
import { redirect } from "next/navigation";
import { runtime } from "../../001/(business-logic)/api-handler-better";
import {
  Todo,
  TodoNotFoundError,
} from "../../001/(business-logic)/business-logic";
import { TodoStore } from "../../001/(business-logic)/todo-store";

declare function getTodoById(args: {
  id: number;
}): Effect.Effect<Todo, TodoNotFoundError, TodoStore>;

export const getTodoByIdAction1 = async () => {
  // This will not work because the redirect is handled as defect
  const todos = await getTodoById({ id: 2 }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Effect.sync(() => redirect("/404"));
    }),
    runtime.runPromise
  );

  return todos;
};

export const getTodoByIdAction2 = async () => {
  const todos = await getTodoById({ id: 2 }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Effect.sync(() => redirect("/404"));
    }),
    runtime.runPromiseExit
  );

  // Here we exit and throw manually the catched error
  if (Exit.isFailure(todos)) {
    if (Cause.isDie(todos.cause)) {
      throw (todos.cause as Cause.Die).defect;
    }
  }

  return todos;
};
