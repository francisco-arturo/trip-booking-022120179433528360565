// Local-only static server for the prototype. Vercel serves the root as static assets.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const candidate = resolve(join(root, normalize(requested).replace(/^([/\\])+/, "")));
  return candidate.startsWith(root) ? candidate : null;
}

export function createAppServer() {
  return createServer(async (request, response) => {
    const filePath = safePath(request.url || "/");
    if (!filePath) {
      response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }
    try {
      const info = await stat(filePath);
      if (!info.isFile()) throw new Error("Not a file");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store"
      });
      response.end(body);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });
}

export async function startServer(port = Number(process.env.PORT) || 4173) {
  const server = createAppServer();
  await new Promise((resolveListen) => server.listen(port, "127.0.0.1", resolveListen));
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT) || 4173;
  startServer(port).then(() => {
    console.log(`Meridian prototype running at http://127.0.0.1:${port}`);
  });
}
