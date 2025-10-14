import { Effect } from "effect";
import { getTodoByIdUseCase } from "../../001/(business-logic)/business-logic";
import ClientComponent from "./client-component";
import { Next } from "./wrapper";

const HomePage = Effect.fn("HomePage")(function* () {
  yield* Effect.log("Home Page");
  const todo = yield* getTodoByIdUseCase({ id: 1 });

  return (
    <div>
      Home Page
      <ClientComponent />
    </div>
  );
});

export default Next(HomePage);
