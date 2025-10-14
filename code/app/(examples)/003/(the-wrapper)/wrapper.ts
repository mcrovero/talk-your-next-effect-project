import { Cause, Chunk, Effect, Exit, ManagedRuntime } from "effect";
import { unstable_rethrow } from "next/navigation";
import { runtime } from "./runtime";

export type RuntimeDependencies = ManagedRuntime.ManagedRuntime.Context<
  typeof runtime
>;

export function Next<I extends Array<unknown>, A>(
  effectFn: (...args: I) => Effect.Effect<A, never, RuntimeDependencies>
) {
  return async (...args: I): Promise<A> => {
    return await runtime.runPromiseExit(effectFn(...args)).then((res) => {
      if (Exit.isFailure(res)) {
        const defects = Chunk.toArray(Cause.defects(res.cause));

        if (defects.length === 1) {
          unstable_rethrow(defects[0]);
        }

        const errors = Cause.prettyErrors(res.cause);
        throw errors[0];
      }

      return res.value;
    });
  };
}
