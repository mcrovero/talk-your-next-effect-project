import { Effect } from "effect";

export class TodoStore extends Effect.Service<TodoStore>()("app/TodoStore", {
  effect: Effect.gen(function* () {
    return {
      getTodoById: Effect.fn("getTodoById")(function* ({ id }: { id: number }) {
        console.log("getTodoById", id);
        // We simulate a slow operation
        yield* Effect.sleep(1000);
        yield* Effect.die(new Error("Unrecoverable error"));

        if (id !== 1) {
          return null;
        }

        // We return the todo
        return { id, title: "Todo 1" };
      }),
    };
  }),
}) {}
