"use server";

import { Cause, Effect, Exit } from "effect";
import { redirect } from "next/navigation";
import { runtime } from "../../001/(business-logic)/api-handler-better";
import { getTodoByIdUseCase } from "../../001/(business-logic)/business-logic";

// Handle redirect in the effect world

export const getTodoByIdAction1 = async () => {
  console.log("getTodoByIdAction1");
  // This will not work because the redirect is handled as defect
  const todos = await getTodoByIdUseCase({ id: 2 }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Effect.sync(() => redirect("/404"));
    }),
    Effect.tapErrorCause((cause) => {
      console.log("cause", cause);
      console.log("cause", Cause.pretty(cause));
      return Effect.logError(cause);
    }),
    runtime.runPromise
  );

  return todos;
};

export const getTodoByIdAction2 = async () => {
  const todos = await getTodoByIdUseCase({ id: 2 }).pipe(
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
