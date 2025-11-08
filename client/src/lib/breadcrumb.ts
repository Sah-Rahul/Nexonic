export function formatBreadcrumb(path: string) {
  if (!path) return "Home";

  const trimmedPath = path.replace(/^\/+|\/+$/g, "").replace(/\/+/g, "/");

  if (!trimmedPath) return "Home";

  return trimmedPath
    .split("/")
    .map((part) =>
      part
        .split(/[-_]/g)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(" > ");
}
