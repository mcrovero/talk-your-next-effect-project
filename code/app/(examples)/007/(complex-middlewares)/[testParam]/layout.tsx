import { Effect } from "effect";
import { AuthenticatedLayout } from "./runtime-with-middleware";

const Layout = Effect.fn("Layout")(function* ({
  children,
}: LayoutProps<"/">) {
  // already typed
  return <div>{children}</div>;
});

export default AuthenticatedLayout.build(Layout);
