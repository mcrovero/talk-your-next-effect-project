import { Data, Effect } from "effect";
import { TodoStore } from "./todo-store";

// The error is part of the domain
export class TodoNotFoundError extends Data.TaggedError("TodoNotFoundError") {}

export const getTodoById = Effect.fn("getTodoById")(function* ({
  id,
}: {
  id: number;
}) {
  // We define a dependency
  const todoStore = yield* TodoStore;

  const todo = yield* todoStore.getTodoById({ id });

  if (!todo) {
    // We throw an error by yielding it
    return yield* new TodoNotFoundError();
  }
  return todo;
});
