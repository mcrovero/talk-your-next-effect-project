import { Schema } from "effect";

export const TodoSchema = Schema.Struct({
  id: Schema.Number,
  title: Schema.String,
});

export type Todo = Schema.Schema.Type<typeof TodoSchema>;
