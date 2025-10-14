"use server";
import { Effect } from "effect";
import { redirect } from "next/navigation";
import { TodoNotFoundError } from "../../001/(business-logic)/business-logic";
import { effectNext } from "./simple-wrapper";

export const getTodoByIdAction = async (id: number) =>
  await effectNext(
    Effect.gen(function* () {
      if (id !== 1) {
        yield* new TodoNotFoundError();
      }
      const todos = yield* Effect.succeed({ id: 1, title: "Todo 1" });
      return todos;
    }).pipe(
      Effect.catchTag("TodoNotFoundError", () => {
        return Effect.sync(() => redirect("/404"));
      })
    )
  );
