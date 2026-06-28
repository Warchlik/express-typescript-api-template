import { examples } from "@/db/schema";

export type Example = typeof examples.$inferSelect
export type NewExample = typeof examples.$inferInsert
