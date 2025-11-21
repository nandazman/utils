import openapi, { fromTypes } from "@elysiajs/openapi";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { Innertube } from "youtubei.js";

export const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
    })
  )
  .use(
    await staticPlugin({
      prefix: "/",
    })
  )
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

      // Try multiple possible paths for title and duration
      const title =
        info.basic_info?.title ||
        (info as any).primary_info?.title?.text ||
        (info as any).video_details?.title ||
        "Unknown Title";

      // Try to extract duration from various possible locations
      let duration = 0;

      // Check all possible duration sources
      if (info.basic_info?.duration) {
        duration = info.basic_info.duration;
      } else if (
        (info as any).page?.microformat?.playerMicroformatRenderer
          ?.lengthSeconds
      ) {
        duration = parseInt(
          (info as any).page.microformat.playerMicroformatRenderer.lengthSeconds
        );
      } else if ((info as any).streaming_data?.formats?.[0]?.approxDurationMs) {
        duration = Math.floor(
          (info as any).streaming_data.formats[0].approxDurationMs / 1000
        );
      } else if (
        (info as any).playability_status?.miniplayer?.miniplayerRenderer
          ?.playbackMode
      ) {
        // Last resort: try to parse from storyboards
        const storyboard = (info as any).storyboards?.boards?.[0];
        if (storyboard?.thumbnails_per_row && storyboard?.storyboard_count) {
          duration = Math.floor(
            storyboard.storyboard_count * storyboard.thumbnails_per_row * 2
          ); // rough estimate
        }
      }

      console.log("Extracted title:", title, "duration:", duration);

      return {
        success: true,
        title,
        duration,
        segments,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error fetching transcript:", error);
      return { success: false, error: message };
    }
  })

  .listen(3333);

console.log(
  `🦊 Utils server running at ${app.server?.hostname}:${app.server?.port}`
);
