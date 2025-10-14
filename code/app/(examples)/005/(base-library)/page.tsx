import { Context, Effect } from "effect";
import { redirect } from "next/navigation";
import { TodoStore } from "../../001/(business-logic)/todo-store";
import {
  Todo,
  TodoNotFoundError,
} from "../../001/(business-logic)/business-logic";
import { BasePage } from "./runtime";

declare function getTodoById(args: {
  id: number;
}): Effect.Effect<Todo, TodoNotFoundError, TodoStore>;

class Email extends Context.Tag("Email")<Email, string>() {}

const Page1 = BasePage.build(() =>
  Effect.gen(function* () {
    console.log("TodoPage");
    const todo = yield* getTodoById({ id: 1 });

    yield* Email;
    return <div>Home {todo.title}</div>;
  }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Redirect("/404");
    })
  )
);

const Page2Effect = Effect.gen(function* () {
  console.log("TodoPage");
  const todo = yield* getTodoByIdUseCase({ id: 1 });

  yield* Email;
  return <div>Home {todo.title}</div>;
}).pipe(
  Effect.catchTag("TodoNotFoundError", () => {
    return Effect.sync(() => redirect("/404"));
  })
);
const Page2 = BasePage.build(() => Page2Effect);
