import { Track } from "src/app/tracks/interfaces";

export interface Playlist {
  id?: number;
  name: string;
  description: string;
  playlist_cover: any;
  tracks?: Track[];
}