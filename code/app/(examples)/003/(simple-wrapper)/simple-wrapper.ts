import { Cause, Chunk, Effect, Exit } from "effect";
import { unstable_rethrow } from "next/navigation";

export async function effectNext<A>(effectFn: Effect.Effect<A, never, never>) {
  const res = await Effect.runPromiseExit(effectFn);
  if (Exit.isFailure(res)) {
    const defects = Chunk.toArray(Cause.defects(res.cause));
    if (defects.length === 1) {
      // This allows redirect(), notFound(), etc. to work
      unstable_rethrow(defects[0]);
    }

    const errors = Cause.prettyErrors(res.cause);
    throw errors[0];
  }
  return res.value;
}
