import { Effect } from "effect";
import { AuthenticatedLayout, CurrentUser } from "./runtime-with-middleware";

const Layout = Effect.fn("Layout")(function* ({
  children,
}: LayoutProps<"/006">) {
  const currentUser = yield* CurrentUser;
  return (
    <>
      Layout {children} User: {currentUser.name}
    </>
  );
});

export default AuthenticatedLayout.build(Layout);
