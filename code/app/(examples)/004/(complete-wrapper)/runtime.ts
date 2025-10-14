import { ManagedRuntime } from "effect";
import { TodoStore } from "../../001/(business-logic)/todo-store";

const _NextRuntime = ManagedRuntime.make(TodoStore.Default);

declare global {
  var runtime: typeof _NextRuntime | undefined;
}

export const runtime = (() => {
  const current = globalThis.runtime;
  if (current && process.env.NODE_ENV === "development") {
    // If you need HMR during dev
    current.dispose();
  }

  globalThis.runtime = current ?? _NextRuntime;
  return globalThis.runtime;
})();

process.on("SIGTERM", () => {
  globalThis.runtime?.dispose();
});
process.on("SIGINT", () => {
  globalThis.runtime?.dispose();
});
