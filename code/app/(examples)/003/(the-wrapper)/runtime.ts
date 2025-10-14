import { RandomScopedLayer } from "@/lib/scoped";
import { TodoStore } from "@/lib/todo-store";
import { Effect, Layer, ManagedRuntime } from "effect";
import { globalValue } from "effect/GlobalValue";

/**
 * We're creating a runtime that contains the stateful layer.
 * This runtime is then used to create a context that can be used to provide services to the application.
 * On HMR this layer won't be re-created, to use the new layer we need to restart the application.
 */
export const statefulRuntime = globalValue("statefulRuntime", () => {
  const runtime = ManagedRuntime.make(RandomScopedLayer);
  process.on("SIGTERM", () => {
    runtime.dispose();
  });
  process.on("SIGINT", () => {
    runtime.dispose();
  });
  return runtime;
});

const statefulContext = statefulRuntime.runtimeEffect.pipe(
  Effect.map((r) => r.context)
);

/**
 * This is the runtime we use in the application and should not contain scoped
 * layers but only stateless services.
 * Having just ephemeral layers makes HMR during development easier.
 */

export const LiveLayer = Layer.mergeAll(
  TodoStore.Default,
  // We can get a resourceful layer using the context we created in runtime-stateful.ts
  Layer.effectContext(statefulContext)
);

export const runtime = ManagedRuntime.make(LiveLayer);
