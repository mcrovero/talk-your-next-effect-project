import { Next } from "@mcrovero/effect-nextjs";
import { Layer, ManagedRuntime } from "effect";
import { TodoStore } from "../../001/(business-logic)/todo-store";

export const BasePage = Next.make("BasePage", TodoStore.Default);

export const BaseRoute = Next.make(
  "BaseRoute",
  Layer.mergeAll(TodoStore.Default, EmailService.Default)
);

const runtime = ManagedRuntime.make(Layer.mergeAll(TodoStore.Default));
export const BaseLayout = Next.makeWithRuntime("BaseLayout", runtime);
