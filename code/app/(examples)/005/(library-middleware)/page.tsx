import { getTodoById } from "@/lib/business-logic";
import { Redirect } from "@mcrovero/effect-nextjs/Navigation";
import { Effect } from "effect";
import { AuthenticatedPage, CurrentUser } from "./runtime-with-middleware";

const TodoPage = () =>
  Effect.gen(function* () {
    const currentUser = yield* CurrentUser;
    const todo = yield* getTodoById({ id: 1 });
    return (
      <div>
        {todo.title} - {currentUser.name}
      </div>
    );
  }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Redirect("/404");
    })
  );

export default AuthenticatedPage.build(TodoPage);
