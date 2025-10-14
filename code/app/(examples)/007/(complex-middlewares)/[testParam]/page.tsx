import { Effect, Schema } from "effect";
import { AuthenticatedPage } from "./runtime-with-middleware";
import { decodeParams, decodeSearchParamsUnknown } from "./utils";

const TodoPage = Effect.fn("TodoPage")(function* (
  props: PageProps<"/[todoId]">
) {
  const params = yield* decodeParams(Schema.Struct({ todoId: Schema.String }))(
    props.params
  );

  return yield* decodeSearchParamsUnknown(
    Schema.Struct({ search: Schema.String })
  )(props.searchParams).pipe(
    Effect.flatMap((searchParams) =>
      Effect.succeed(
        <div>
          TodoPage {params.todoId} {searchParams.search}
        </div>
      )
    ),
    Effect.catchTag("ParseError", () => {
      return Effect.succeed(
        <div>There was an error parsing the search params</div>
      );
    })
  );
});

export default AuthenticatedPage.build(TodoPage);
