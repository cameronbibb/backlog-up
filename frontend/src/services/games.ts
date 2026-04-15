import apiClient from "./apiClient";
import type { IgdbGame } from "../types";

export async function searchGames(query: string): Promise<IgdbGame[]> {
  const response = await apiClient.get<IgdbGame[]>(`/games/search`, {
    params: { query },
  });
  return response.data;
}

export async function getGame(igdbGameId: number): Promise<IgdbGame> {
  const response = await apiClient.get<IgdbGame>(`/games/${igdbGameId}`);
  return response.data;
}
