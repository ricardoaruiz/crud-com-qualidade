import fs from "fs";
import { DB_FILE_PATH } from "./constants";

/**
 * Clears the contents of the database file.
 *
 * @return {void} This function does not return anything.
 */
export function clearDB(): void {
  fs.writeFileSync(DB_FILE_PATH, "");
}
