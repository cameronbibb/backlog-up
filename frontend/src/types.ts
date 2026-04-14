export interface Game {
  id: number;
  name: string;
  cover_url: string;
  first_release_date: string;
  summary: string;
  created_at: string;
  updated_at: string;
  platforms: string[];
}

export interface UserGame {
  id: number;
  user_id: number;
  game_id: number;
  status: "backlog" | "playing" | "completed"; //add "dropped"?
  platform_owned: string;
  created_at: string;
  updated_at: string;
  game: Game;
}

// interface IgdbGame {
//   id: number;
//   cover: { id: number; url: string };
//   first_release_date: string;
//   name: string;
//   platforms: { id: number; name: string }[];
//   summary: string;
// }

// interface User {
//   leaving this here in case I want to add some sort of user profile page/viewer
// }

export interface Playlist {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  games: Game[];
}
