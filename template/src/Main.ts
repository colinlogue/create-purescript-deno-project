

export const startServer = (msg: string) => () => {
  Deno.serve(() => new Response(msg));
}

