import { Cause, Chunk, Effect, Exit, Fiber } from "effect";
import { unstable_rethrow } from "next/navigation";
import { getRuntime, RuntimeDependencies } from "./runtime";

// Small utility to adapt an Effectful function to a Next.js-compatible async
// function. It ensures execution within the managed runtime and surfaces rich
// diagnostics in development by pretty-printing Effect causes.
export function Next<I extends Array<unknown>, A>(
  effectFn: (...args: I) => Effect.Effect<A, never, RuntimeDependencies>
) {
  return async (...args: I): Promise<A> => {
    const runtime = getRuntime();

    // 1) Run in a fiber we can observe/join (no re-run later).
    const fiber = runtime.runFork(effectFn(...args));

    // 2) Inspect outcome without changing it.
    const exit = await runtime.runPromise(Fiber.await(fiber));

    if (Exit.isSuccess(exit)) return exit.value;

    // 3) Preserve Next.js control-flow errors (redirect/notFound).
    const defects = Chunk.toArray(Cause.defects(exit.cause));
    if (defects.length === 1) {
      unstable_rethrow(defects[0]); // never returns
    }

    // 4) Re-throw with the SAME fiber identity.
    //    Joining fails exactly as the original fiber failed,
    //    yielding the canonical FiberFailure for that fiber.
    return await runtime.runPromise(Fiber.join(fiber)); // never resolves
  };
}
