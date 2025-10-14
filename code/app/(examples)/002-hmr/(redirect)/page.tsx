import { Effect, ManagedRuntime } from "effect";

class Db extends Effect.Service<Db>()("Db", {
  scoped: Effect.gen(function* () {
    yield* Effect.log("Starting Db 5");
    yield* Effect.addFinalizer(() =>
      Effect.sync(() => {
        console.log("Finalizing Db");
      })
    );
    return {
      getTodoById: ({ id }: { id: number }) => {
        return Effect.gen(function* () {
          return { id, title: "Todo 1" };
        });
      },
    };
  }),
}) {}

const runtime = ManagedRuntime.make(Db.Default);

export default async function Page() {
  const todo = await runtime.runPromise(
    Effect.succeed({ id: 1, title: "Todo 1" })
  );
  return <div>{todo.title}</div>;
}
