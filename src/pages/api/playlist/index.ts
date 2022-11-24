import type { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CARD_COLOR } from "~/config/common.config";
import { dbConnect } from "~/libraries/mongoose.library";
import {
  Playlist,
  PlaylistModel,
  PlaylistModelWithId,
} from "~/models/Playlist.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const response: PlaylistModelWithId[] = await getPlaylists();
      res.status(200).json({ data: response });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }

  if (req.method === "POST") {
    try {
      const response = await createPlaylist(req.body);
      if (!response.color) response.color = DEFAULT_CARD_COLOR;
      res.status(201).json({
        data: {
          color: response.color,
          id: response.id,
          name: response.name,
          owner: response.owner,
          slug: response.slug,
          spotifyId: response.spotifyId,
          upvote: response.upvote,
        },
      });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }
}

export async function getPlaylists() {
  const result = await Playlist.find();
  return result.map((doc) => {
    const playlist = doc.toObject();
    return {
      color: playlist.color || DEFAULT_CARD_COLOR,
      name: playlist.name,
      owner: playlist.owner,
      slug: playlist.slug,
      spotifyId: playlist.spotifyId,
      upvote: playlist.upvote,
      id: playlist._id,
    };
  });
}

export async function createPlaylist(obj: unknown) {
  return Playlist.create<PlaylistModelWithId>(obj);
}
