
export let getAdler32 =  async (file) => {
  let data;
  if (typeof file === 'string' && file.startsWith('http')) {
    const response = await fetch(file);
    const buffer = await response.arrayBuffer();
    data = new Uint8Array(buffer);
  } else {
    data = await Deno.readFile(file);
  }
  const hash = adler32(data);
  return hash.toString(16);
}

export let adler32 = data => { 
  var MOD_ADLER = 65521;
  var a = 1, b = 0;

  for (var i = 0; i < data.length; i++) {
    a = (a + data[i]) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }

  return (b << 16) | a;
}

