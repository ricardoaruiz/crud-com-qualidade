import { supabase } from "@server/infra/supabase";
import { Todo, TodoSchema } from "@server/schema/todo";
import { ERROR_CODES } from "@server/infra/supabase/constants";
import {
  HttpInternalServerErrorException,
  HttpInvalidParsedDataException,
  HttpNotFoundException,
} from "@server/infra/exceptions/";

interface TodoRepositoryFindOneParams {
  id: string;
}

export default async function ({
  id,
}: TodoRepositoryFindOneParams): Promise<Todo | undefined> {
  const { error, data } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === ERROR_CODES.NOT_FOUND) {
      throw new HttpNotFoundException("Todo not found");
    }
    throw new HttpInternalServerErrorException(
      "Something went wrong on findOne todo",
    );
  }

  const parsedData = TodoSchema.safeParse(data);

  if (!parsedData.success) {
    throw new HttpInvalidParsedDataException(
      "Invalid todo received from database on findOne todo",
    );
  }

  return parsedData.data;
}
