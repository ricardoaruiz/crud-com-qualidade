import { SUPABASE_FROM } from "@server/infra/supabase/constants";
import { Todo, TodoSchema } from "@server/schema/todo";
import {
  HttpInternalServerErrorException,
  HttpInvalidParsedDataException,
} from "@server/infra/exceptions";

interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface TodosRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

/**
 * Retrieves a list of todos based on the provided parameters.
 *
 * @param {TodoRepositoryGetParams} params - The parameters for the get operation.
 * @param {number} params.page - The page number to retrieve.
 * @param {number} params.limit - The maximum number of todos to retrieve per page.
 * @param {string} params.search - The search string to filter todos by their content.
 * @returns {Promise<TodosRepositoryGetOutput>} A promise that resolves to the retrieved todos.
 */
export default async function ({
  page,
  limit,
  search,
}: TodoRepositoryGetParams): Promise<TodosRepositoryGetOutput> {
  const currentPage = page || 1;
  const currentLimit = limit || 10;

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit - 1;

  const query = SUPABASE_FROM.todos()
    .select("*", {
      count: "exact",
    })
    .order("date", { ascending: false });

  if (search) {
    query.ilike("content", `%${search}%`);
  }

  query.range(startIndex, endIndex);

  const { data, count, error } = await query;

  if (error) {
    throw new HttpInternalServerErrorException("Failed to fetch todos");
  }

  const parsedData = TodoSchema.array().safeParse(data);

  if (!parsedData.success) {
    throw new HttpInvalidParsedDataException(
      "Invalid data returned from database",
    );
  }

  const todos = parsedData.data;
  const total = count || todos.length;
  const pages = Math.ceil(total / currentLimit);

  return {
    todos,
    total,
    pages,
  };
}
