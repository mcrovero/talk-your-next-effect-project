import { getTodoById } from "@/lib/business-logic";
import { Effect } from "effect";
import { notFound } from "next/navigation";
import { Next } from "./wrapper";

const HomePage = () =>
  getTodoById({ id: 1 }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return Effect.sync(() => notFound());
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

export default Next(HomePage);
