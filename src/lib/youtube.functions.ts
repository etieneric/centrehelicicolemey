import { createServerFn } from "@tanstack/react-start";

export type YoutubeVideo = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
};

const CHANNEL_ID = "UC_KpRmZCEQKcykn7XS4oGUw";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export const getChannelVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<YoutubeVideo[]> => {
    try {
      const res = await fetch(FEED_URL, {
        headers: { "User-Agent": "Mozilla/5.0 CHMBot" },
      });
      if (!res.ok) return [];
      const xml = await res.text();
      const entries = xml.split("<entry>").slice(1);
      const videos: YoutubeVideo[] = [];
      for (const entry of entries) {
        const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
        const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
        const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
        if (!id || !title) continue;
        videos.push({
          id,
          title: decode(title),
          published: published ?? "",
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        });
      }
      return videos;
    } catch (e) {
      console.error("YouTube feed fetch failed", e);
      return [];
    }
  },
);
