import { FilterOption } from "../types/todo";

export const FILTER_OPTIONS: { label: string; value: FilterOption }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];
