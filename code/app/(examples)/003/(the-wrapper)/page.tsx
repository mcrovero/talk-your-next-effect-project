import { getTodoById } from "@/lib/business-logic";
import { Effect } from "effect";
import { notFound } from "next/navigation";
import { Next } from "./wrapper";

const TodoPage = () =>
  Effect.gen(function* () {
    const todo = yield* getTodoById({ id: 1 });
    return (
      <div>
        <h1>Todo Page</h1>
        <p>{todo.title}</p>
      </div>
    );
  }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Effect.sync(() => notFound());
    })
  );

export default Next(TodoPage);
