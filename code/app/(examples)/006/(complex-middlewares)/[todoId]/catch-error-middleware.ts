import { TodoNotFoundError } from "@/lib/business-logic";
import { NextMiddleware } from "@mcrovero/effect-nextjs";
import { Layer, Schema } from "effect";
import * as Effect from "effect/Effect";

export class HandleCommonErrorsMiddleware extends NextMiddleware.Tag<HandleCommonErrorsMiddleware>()(
  "HandleCommonErrorsMiddleware",
  {
    returns: Schema.String,
    failure: Schema.String,
    catches: Schema.instanceOf(TodoNotFoundError),
    wrap: true,
  }
) {}

// Live implementation for the middleware
export const HandleCommonErrorsLive = Layer.succeed(
  HandleCommonErrorsMiddleware,
  HandleCommonErrorsMiddleware.of(({ next }) =>
    Effect.gen(function* () {
      yield* Effect.log("Handling common errors");
      return yield* next.pipe(
        Effect.catchTag("TodoNotFoundError", () => {
          return Effect.succeed("Todo not found");
        })
      );
    })
  )
);
