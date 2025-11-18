import { Elysia } from "elysia";
import { Innertube } from "youtubei.js";

const app = new Elysia()
  // Trailing slash middleware - redirect all paths without trailing slash (except files)
  .onBeforeHandle(({ request, set }) => {
    const url = new URL(request.url);
    const path = url.pathname;

    // Skip if already has trailing slash, is root, or has file extension
    if (path === "/" || path.endsWith("/") || path.match(/\.[a-zA-Z0-9]+$/)) {
      return;
    }

    // Redirect with trailing slash using 308 (permanent, preserves method)
    set.status = 308;
    set.redirect = path + "/" + url.search;
  })

  // Serve CSS from dist folder
  .get("/dist/output.css", () => Bun.file("public/dist/output.css"))

  // Home page
  .get("/", () => Bun.file("public/index.html"))

  // JSON Viewer & Comparator
  .get("/json", () => Bun.file("public/json-viewer.html"))

  // YouTube Script Extractor
  .get("/watch", () => Bun.file("public/youtube-script.html"))
  .post("/api/youtube-transcript", async ({ body }) => {
    try {
      // sample v=CDeB98AjJY0
      const requestBody = body as { url: string };

      // Extract video ID from URL
      const videoId = requestBody.url.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
      )?.[1];

      if (!videoId) {
        return { success: false, error: "Invalid YouTube URL" };
      }

      console.log("Fetching transcript for video ID:", videoId);

      const youtube = await Innertube.create();
      const info = await youtube.getInfo(videoId);
      const transcriptData = await info.getTranscript();

      console.log("Transcript fetched successfully");

      const segments =
        transcriptData?.transcript?.content?.body?.initial_segments
          ?.map((segment: any) => ({
            text: segment.snippet?.text || "",
            startMs: segment.start_ms || 0,
          }))
          .filter((seg: any) => seg.text.trim().length > 0) || [];

      return { success: true, segments };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error fetching transcript:", error);
      return { success: false, error: message };
    }
  })

  .listen(3333);

console.log(`🦊 Utils server running at http://localhost:${app.server?.port}`);
