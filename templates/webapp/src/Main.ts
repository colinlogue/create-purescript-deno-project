
export const _htmlResponse = (html: string): Response => {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

export const _notFoundResponse = (html: string): Response => {
  return new Response(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

export const requestUrl = (request: Request): URL => new URL(request.url);
