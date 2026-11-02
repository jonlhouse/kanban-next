export const priorities = [
  { name: "Critical", icon: "▲", color: "text-red-700" },
  { name: "High", icon: "◆", color: "text-orange-700" },
  { name: "Medium", icon: "●", color: "text-violet-700" },
  { name: "Low", icon: "▼", color: "text-blue-700" },
] as const;

export type Priority = (typeof priorities)[number]["name"];

export function priorityPresentation(priority: Priority) {
  const presentation = priorities.find((level) => level.name === priority);
  if (!presentation) throw new Error(`Unknown Priority: ${priority}`);
  return presentation;
}
