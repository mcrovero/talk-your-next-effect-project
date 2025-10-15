import {
  decodeParams,
  decodeSearchParamsUnknown,
} from "@mcrovero/effect-nextjs/Params";
import { Effect, Schema } from "effect";
import { HandleCommonErrorsMiddleware } from "./catch-error-middleware";
import { AuthenticatedPage } from "./runtime-with-middleware";

const TodoPage = Effect.fn("TodoPage")(function* (
  props: PageProps<"/006/[todoId]">
) {
  return yield* Effect.all([
    decodeParams(Schema.Struct({ todoId: Schema.String }))(props.params),
    decodeSearchParamsUnknown(
      Schema.Struct({ search: Schema.optional(Schema.String) })
    )(props.searchParams),
  ]).pipe(
    Effect.flatMap(([params, searchParams]) =>
      Effect.succeed(
        <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-medium">Todo</h2>
          <p className="text-zinc-200">
            id: {params.todoId}
            {searchParams.search ? (
              <>
                {" "}
                • <span className="text-zinc-400">{searchParams.search}</span>
              </>
            ) : null}
          </p>
        </section>
      )
    ),
    Effect.catchTag("ParseError", () => {
      return Effect.succeed(
        <div>There was an error parsing the search params</div>
      );
    })
  );
});

export default AuthenticatedPage.middleware(HandleCommonErrorsMiddleware).build(
  TodoPage
);
