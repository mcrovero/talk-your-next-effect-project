"use server";

import { getTodoById } from "@/lib/business-logic";
import { Effect } from "effect";
import { redirect } from "next/navigation";
import { runtime } from "../../001/(business-logic)/better/route";

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
