import { Next, NextMiddleware } from "@mcrovero/effect-nextjs";
import { Layer, Schema } from "effect";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import { TodoStore } from "../../../../../lib/todo-store";

// A simple service
export class CurrentUser extends Context.Tag("CurrentUser")<
  CurrentUser,
  { id: string; name: string }
>() {}

export class AuthMiddleware extends NextMiddleware.Tag<AuthMiddleware>()(
  "AuthMiddleware",
  {
    provides: CurrentUser,
    failure: Schema.String,
  }
) {}

// Live implementation for the middleware
export const AuthLive = Layer.succeed(
  AuthMiddleware,
  AuthMiddleware.of(() => Effect.succeed({ id: "123", name: "Ada" }))
);

// Combine all lives you need
const AppLive = Layer.mergeAll(AuthLive, TodoStore.Default);

// Create a typed page handler
export const AuthenticatedPage = Next.make("BasePage", AppLive).middleware(
  AuthMiddleware
);

// Create a typed layout handler
export const AuthenticatedLayout = Next.make("BaseLayout", AppLive).middleware(
  AuthMiddleware
);
