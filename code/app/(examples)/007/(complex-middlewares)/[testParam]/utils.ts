import { Effect, Schema } from "effect";

type NextBaseSearchParams = Promise<
  Record<string, string | Array<string> | undefined>
>;

export const decodeSearchParamsUnknown =
  <T, P extends NextBaseSearchParams>(schema: Schema.Schema<T, any>) =>
  (props: P) =>
    Effect.gen(function* () {
      const searchParams = yield* Effect.promise(() => props);
      return yield* Schema.decodeUnknown(schema)(searchParams);
    });

export const decodeParams =
  <T, P>(schema: Schema.Schema<T, P>) =>
  (params: Promise<P>) =>
    Effect.gen(function* () {
      const paramsResolved = yield* Effect.promise(() => params);
      return yield* Effect.orDie(Schema.decode(schema)(paramsResolved));
    });
