export function formatBreadcrumb(path) {
  if (!path) return "";

  const trimmedPath = path.startsWith("/") ? path.slice(1) : path;

  return trimmedPath
    .split("/")
    .map(part =>
      part
        .split(/[-_]/g)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(" > ");
}
