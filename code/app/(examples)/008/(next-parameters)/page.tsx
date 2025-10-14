import { Effect } from "effect";
import { redirect } from "next/navigation";
import { getTodoByIdUseCase } from "../../001/(business-logic)/business-logic";
import { AuthenticatedPage, CurrentUser } from "./runtime-with-middleware";

const TodoPage = () =>
  Effect.gen(function* () {
    const currentUser = yield* CurrentUser;
    console.log("TodoPage");
    const todo = yield* getTodoByIdUseCase({ id: 1 });
    return (
      <div>
        Home {todo.title} {currentUser.name}
      </div>
    );
  }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Effect.sync(() => redirect("/404"));
    })
  );

export default AuthenticatedPage.build(TodoPage);
