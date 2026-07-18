import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — C.H.M" }, { name: "robots", content: "noindex" }] }),
  component: () => <Outlet />,
});
