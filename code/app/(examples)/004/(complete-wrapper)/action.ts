"use server";

import { Effect } from "effect";
import { Next } from "./wrapper";

const getTodoAction = Effect.fn("getTodoAction")(function* () {
  return { id: 1, title: "Todo 1" };
});

export const getTodoByIdAction = Next(getTodoAction);
