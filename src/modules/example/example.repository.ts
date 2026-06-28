import { db } from "@/db";
import { examples } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NewExample } from "./example.types";

export class ExampleRepository {
  async findMany() {
    return db.select().from(examples)
  }

  async findById(
    id: string
  ) {
    const [example] = await db
      .select()
      .from(examples)
      .where(eq(examples.id, id))

    return example ?? null
  }

  async create(
    data: NewExample
  ) {
    const [example] = await db
      .insert(examples)
      .values(data)
      .returning()

    return example ?? null
  }

  async update(
    id: string,
    data: Partial<NewExample>
  ) {
    const [example] = await db
      .update(examples)
      .set(data)
      .where(eq(examples.id, id))
      .returning()

    return example ?? null
  }

  async delete(
    id: string
  ) {
    const [example] = await db
      .delete(examples)
      .where(eq(examples.id, id))
      .returning()

    return example ?? null
  }
}
