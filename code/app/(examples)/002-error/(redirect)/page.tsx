import { runtime } from "../../001/(business-logic)/api-handler-better";
import { getTodoByIdUseCase } from "../../001/(business-logic)/business-logic";
import PageClient from "./page-client";

export default async function Page() {
  const todo = await getTodoByIdUseCase({ id: 1 }).pipe(runtime.runPromise);
  return (
    <div>
      <PageClient />

      {todo?.title}
    </div>
  );
}
