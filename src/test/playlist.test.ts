import { expect, test } from "@jest/globals";
import { testApiHandler } from "next-test-api-route-handler";
import getPlaylists from "../pages/api/playlist";
import createPlaylist from "../pages/api/playlist";
import getPlaylist from "../pages/api/playlist/[id]";
import removePlaylist from "../pages/api/playlist/[id]";

test("flow", async () => {
  const playlist1 = {
    name: "Playlist 1",
    owner: "michal.warda@elpassion.pl",
    slug: "playlist-1",
    spotifyId: "1234567890",
    upvote: 0,
  };

  let playlistId: string | null = null;

  await testApiHandler({
    handler: createPlaylist,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        body: JSON.stringify(playlist1),
        headers: { "Content-Type": "application/json" },
      });
      const body = await res.json();
      await expect(body).toEqual({
        data: {
          color: "#000000",
          id: expect.any(String),
          name: "Playlist 1",
          owner: "michal.warda@elpassion.pl",
          slug: "playlist-1",
          spotifyId: "1234567890",
          upvote: 0,
        },
      });
      // @ts-ignore
      playlistId = body.data!.id;
    },
  });

  await testApiHandler({
    handler: getPlaylists,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      const body = await res.json();
      expect(body.data).toEqual(
        expect.arrayContaining([
          {
            id: playlistId,
            name: "Playlist 1",
            owner: "michal.warda@elpassion.pl",
            slug: "playlist-1",
            spotifyId: "1234567890",
            color: "#000000",
            upvote: 0,
          },
        ])
      );
    },
  });

  await testApiHandler({
    handler: getPlaylist,
    params: {
      id: playlistId!,
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      await expect(res.json()).resolves.toEqual({
        data: {
          color: "#000000",
          id: playlistId,
          name: "Playlist 1",
          owner: "michal.warda@elpassion.pl",
          slug: "playlist-1",
          spotifyId: "1234567890",
          upvote: 0,
        },
      });
    },
  });

  await testApiHandler({
    handler: removePlaylist,
    params: {
      id: playlistId!,
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await expect(res.json()).resolves.toEqual({
        data: null,
      });
    },
  });

  await testApiHandler({
    handler: getPlaylists,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      const body = await res.json();
      expect(body.data).not.toEqual(
        expect.arrayContaining([
          {
            id: playlistId,
            name: "Playlist 1",
            owner: "michal.warda@elpassion.pl",
            slug: "playlist-1",
            spotifyId: "1234567890",
            color: "#000000",
            upvote: 0,
          },
        ])
      );
    },
  });

  await testApiHandler({
    handler: getPlaylist,
    params: {
      id: playlistId!,
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      await expect(res.json()).resolves.toEqual({
        data: null,
      });
    },
  });
});
