import { Effect } from "effect";

export class TodoStore extends Effect.Service<TodoStore>()("app/TodoStore", {
  effect: Effect.gen(function* () {
    return {
      getTodoById: Effect.fn("getTodoById")(function* ({ id }: { id: number }) {
        if (id !== 1) {
          return null;
        }

        // We return the todo
        return { id, title: "Todo 1" };
      }),
    };
  }),
}) {}
