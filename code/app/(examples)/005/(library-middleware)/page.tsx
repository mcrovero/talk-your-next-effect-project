import { getTodoById } from "@/lib/business-logic";
import { Redirect } from "@mcrovero/effect-nextjs/Navigation";
import { Effect } from "effect";
import { AuthenticatedPage, CurrentUser } from "./runtime-with-middleware";

const TodoPage = () =>
  Effect.gen(function* () {
    const currentUser = yield* CurrentUser;
    console.log("TodoPage");
    const todo = yield* getTodoById({ id: 1 });
    return (
      <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-medium">Todo</h2>
        <p className="text-zinc-200">
          {todo.title} •{" "}
          <span className="text-zinc-400">{currentUser.name}</span>
        </p>
      </section>
    );
  }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Redirect("/404");
    })
  );

export default AuthenticatedPage.build(TodoPage);
