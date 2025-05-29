
export const htmlResponse = (html: string): Response => {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

export const jsonResponse = (json: string): Response => {
  return new Response(json, {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
};

export const notFoundResponse = (html: string): Response => {
  return new Response(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

export const readTextFileSync = (path: string): string => {
  try {
    return Deno.readTextFileSync(path);
  } catch (error) {
    console.error("Error reading file:", path, error);
    return "";
  }
};

export const readJsonDbFile = (path: string): string => {
  try {
    // For now, just return an empty JSON response
    // This should be implemented to read from the JSON DB
    return JSON.stringify({ message: "JSON DB not yet implemented for path: " + path });
  } catch (error) {
    console.error("Error reading JSON DB file:", path, error);
    return "";
  }
};
