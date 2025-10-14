import { Data, Effect, Schema } from "effect";
import { TodoStore } from "./todo-store";

export const TodoSchema = Schema.Struct({
  id: Schema.Number,
  title: Schema.String,
});

export type Todo = Schema.Schema.Type<typeof TodoSchema>;

// The error is part of the domain
export class TodoNotFoundError extends Data.TaggedError("TodoNotFoundError") {}

export const getTodoById: (args: {
  id: number;
}) => Effect.Effect<Todo, TodoNotFoundError, TodoStore> = Effect.fn(
  "getTodoById"
)(function* ({ id }: { id: number }) {
  // We define a dependency
  const todoStore = yield* TodoStore;

  const todo = yield* todoStore.getTodoById({ id });

  if (!todo) {
    // We throw an error by yielding it
    return yield* new TodoNotFoundError();
  }
  return todo;
});
