import { Effect } from "effect";
import { AuthenticatedLayout } from "./runtime-with-middleware";

const Layout = Effect.fn("Layout")(function* ({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh bg-black text-white antialiased">
      <div className="mx-auto max-w-3xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Complex middlewares</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
});

export default AuthenticatedLayout.build(Layout);
