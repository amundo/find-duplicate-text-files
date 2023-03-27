import { walk } from "https://deno.land/std/fs/mod.ts"
import { encode, Hash } from "https://deno.land/x/checksum@1.2.0/mod.ts"
// import {isTextFile } from './is-text-file.js'

let md5 = (content) => new Hash("md5").digest(encode(content)).hex()



const duplicates = new Map()

async function findDuplicates(dirPath) {
  for await (
    const entry of walk(dirPath, {
      includeFiles: true,
      // skip: ["wav", "WAV", "sfk"],
      exts: ["txt", "TXT"]
    })
  ) {
    if (entry.isFile) {
      const fileContents = await Deno.readTextFile(entry.path)

      const hash = md5(fileContents)
      if (duplicates.has(hash)) {
        duplicates.get(hash)?.push(entry.path)
      } else {
        duplicates.set(hash, [entry.path])
      }
    }
  }
}

await findDuplicates(".")

for (const [hash, files] of duplicates.entries()) {
  if (files.length > 1) {
    console.log(`Files with hash ${hash}:`)
    for (const file of files) {
      console.log(`  ${file}`)
    }
  }
}
