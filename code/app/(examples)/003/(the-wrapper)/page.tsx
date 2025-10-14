import { getTodoById } from "@/lib/business-logic";
import { Redirect } from "@mcrovero/effect-nextjs/Navigation";
import { Effect } from "effect";
import { Next } from "./wrapper";

const HomePage = Effect.fn("HomePage")(function* () {
  yield* Effect.log("Home Page");
  return yield* getTodoById({ id: 1 }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Redirect("/404");
    }),
    Effect.flatMap((todo) =>
      Effect.succeed(
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-white text-2xl font-semibold flex flex-col items-center">
            <span className="mb-2">Home Page</span>
            <span className="text-lg font-normal">{todo.title}</span>
          </div>
        </div>
      )
    )
  );
});

export default Next(HomePage);
