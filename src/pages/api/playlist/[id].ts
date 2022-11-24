import type { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CARD_COLOR } from "~/config/common.config";
import { dbConnect, isValidId } from "~/libraries/mongoose.library";
import Playlist, { PlaylistModelWithId } from "~/models/Playlist.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  await dbConnect();

  let { id } = req.query;

  if (req.method === "GET") {
    try {
      const playlist = await getPlaylist(id);
      res.status(200).json({ data: playlist });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }

  if (req.method === "DELETE") {
    try {
      const playlist = await removePlaylist(id);
      res.status(200).json({ data: null });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }
}

export async function getPlaylist(id: string | string[] | undefined) {
  if (id && typeof id == "string") {
    if (!isValidId(id)) return null;
    const result = await Playlist.findById(id);
    if (!result) return null;
    const playlist = result.toObject();
    return {
      color: playlist.color || DEFAULT_CARD_COLOR,
      name: playlist.name,
      owner: playlist.owner,
      slug: playlist.slug,
      spotifyId: playlist.spotifyId,
      upvote: playlist.upvote,
      id: playlist._id,
    };
  }
  return null;
}

export async function removePlaylist(id: string | string[] | undefined) {
  return Playlist.findByIdAndDelete<PlaylistModelWithId>(id);
}

export type Response = any;
