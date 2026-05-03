import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";

const port = Number(process.env.PORT || 4173);
const root = resolve("..", "SourceCode");

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function resolveRequestPath(requestUrl = "/") {
  const pathname = new URL(requestUrl, `http://127.0.0.1:${port}`).pathname;
  const filePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const absolutePath = resolve(root, normalize(filePath));

  if (!absolutePath.startsWith(root)) {
    return null;
  }

  return absolutePath;
}

createServer((request, response) => {
  const filePath = resolveRequestPath(request.url);

  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`QA server listening on http://127.0.0.1:${port}`);
});
