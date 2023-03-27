import { open } from "https://deno.land/std/fs/mod.ts"
import * as chardet from "https://cdn.skypack.dev/jschardet"

/**
 * Determines whether a file is a text file based on its contents.
 *
 * @param filePath - The path to the file to check.
 * @param maxBytes - The maximum number of bytes to read from the file.
 * @returns true if the file is a text file, false otherwise.
 */
export async function isTextFile(
  filePath: string,
  maxBytes = 1024,
): Promise<boolean> {
  const file = await open(filePath)
  const buffer = new Uint8Array(maxBytes)
  const { nread } = await file.read(buffer)
  await file.close()
  const encoding = chardet.detect(buffer.subarray(0, nread))
  return ["UTF-8", "ISO-8859-1", "Windows-1252"].includes(encoding?.encoding)
}
