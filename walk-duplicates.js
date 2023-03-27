import { findDuplicates } from "./find-duplicates.js"

export let walkDuplicates = async (directory) => {
  const files = [];
  for await (const dirEntry of Deno.readDir(directory)) {
    const path = `${directory}/${dirEntry.name}`;
    if (dirEntry.isFile) {
      files.push(path);
    } else if (dirEntry.isDirectory) {
      files.push(...await walkDuplicates(path));
    }
  }
  return await findDuplicates(files);
}


console.log(await walkDuplicates(Deno.args[0]))