import { getTodoById } from "@/lib/business-logic";
import { NotFound } from "@mcrovero/effect-nextjs/Navigation";
import { Effect } from "effect";
import { BasePage } from "./runtime";

const TodoPage = () =>
  Effect.gen(function* () {
    const todo = yield* getTodoById({ id: 1 });

    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-4">Base Library Example</h1>
          <p className="text-lg">
            Loaded todo: <span className="font-semibold">{todo.title}</span>
          </p>
        </div>
      </div>
    );
  }).pipe(
    Effect.catchTag("TodoNotFoundError", () => {
      return NotFound;
    })
  );

export default BasePage.build(TodoPage);
