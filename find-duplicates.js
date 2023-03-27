import {getAdler32} from './adler32.js'

export let findDuplicates = async (files) => {
  const hashToFileMap = {};
  for (const file of files) {
    const hash = await getAdler32(file);
    if (!hashToFileMap[hash]) {
      hashToFileMap[hash] = [file];
    } else {
      hashToFileMap[hash].push(file);
    }
  }
  return Object.entries(hashToFileMap).reduce((result, [hash, files]) => {
    if (files.length > 1) {
      result[hash] = files;
    }
    return result;
  }, {});
}


