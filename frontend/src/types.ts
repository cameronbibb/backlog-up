interface Game {
  id: number;
  name: string;
  cover_url: string;
  first_release_date: string;
  summary: string;
  created_at: string;
  updated_at: string;
  platforms: string[];
}

interface UserGame {
  id: number;
  user_id: number;
  game_id: number;
  status: "backlog" | "playing" | "completed"; //add "dropped"?
  platform_owned: string;
  created_at: string;
  updated_at: string;
  game: Game;
}

interface IgdbGame {
  id: number;
  cover: { id: number; url: string };
  first_release_date: string;
  name: string;
  platforms: { id: number; name: string }[];
  summary: string;
}
