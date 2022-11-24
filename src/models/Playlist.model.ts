export interface PlaylistModel {
  color?: string;
  name: string;
  owner: string;
  slug: string;
  spotifyId: string;
  upvote: number;
}

export type PlaylistModelWithId = PlaylistModel & { id: string };
