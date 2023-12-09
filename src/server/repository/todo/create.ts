import { SUPABASE_FROM } from "@server/infra/supabase/constants";
import { Todo, TodoSchema } from "@server/schema/todo";
import { HttpInvalidParsedDataException } from "@server/infra/exceptions";

/**
 * Creates a new post with the given content.
 *
 * @param {string} content - The content of the post.
 * @return {Promise<Todo>} - A Promise that resolves to the created post.
 */
export default async function (content: string): Promise<Todo> {
  const { data } = await SUPABASE_FROM.todos()
    .insert([
      {
        content,
      },
    ])
    .select()
    .single();

  const parsedData = TodoSchema.safeParse(data);

  if (!parsedData.success) {
    throw new HttpInvalidParsedDataException(
      "Invalid created todo format received from database",
    );
  }

  return parsedData.data;
}
