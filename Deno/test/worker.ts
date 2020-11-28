new Worker('https://deno.land/std/examples/welcome.ts', { type: 'module' });
new Worker(new URL("workerJs.ts", import.meta.url).href, { type: 'module' });
