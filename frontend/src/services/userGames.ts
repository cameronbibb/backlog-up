import apiClient from "./apiClient";
import type { UserGame } from "../types";

export async function getUserGames(): Promise<UserGame[]> {
  const response = await apiClient.get<UserGame[]>("/user_games");
  return response.data;
}

export async function addUserGame(
  igdbGameId: number,
  status: "backlog" | "playing" | "completed",
  platformOwned: string,
): Promise<UserGame> {
  const response = await apiClient.post<UserGame>("/user_games", {
    user_game: {
      game_id: igdbGameId,
      status: status,
      platform_owned: platformOwned,
    },
  });

  return response.data;
}

export async function editUserGame(
  userGameId: number,
  status?: "backlog" | "playing" | "completed",
  platformOwned?: string,
): Promise<UserGame> {
  const response = await apiClient.patch<UserGame>(
    `/user_games/${userGameId}`,
    {
      user_game: { status, platform_owned: platformOwned },
    },
  );

  return response.data;
}

export async function deleteUserGame(userGameId: number): Promise<void> {
  await apiClient.delete(`/user_games/${userGameId}`);
}
