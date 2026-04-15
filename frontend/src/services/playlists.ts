import apiClient from "./apiClient";
import type { Playlist } from "../types";

export async function getPlaylists(): Promise<Playlist[]> {
  const response = await apiClient.get<Playlist[]>(`/playlists`);
  return response.data;
}

export async function getPlaylist(playlistId: number): Promise<Playlist> {
  const response = await apiClient.get<Playlist>(`/playlists/${playlistId}`);
  return response.data;
}

export async function createPlaylist(playlistName: string): Promise<Playlist> {
  const response = await apiClient.post<Playlist>(`/playlists`, {
    playlist: { name: playlistName },
  });
  return response.data;
}

export async function updatePlaylist(
  playlistId: number,
  newPlaylistName: string,
): Promise<Playlist> {
  const response = await apiClient.patch<Playlist>(`/playlists/${playlistId}`, {
    playlist: { name: newPlaylistName },
  });

  return response.data;
}

export async function deletePlaylist(playlistId: number): Promise<void> {
  await apiClient.delete(`/playlists/${playlistId}`);
}

export async function addGameToPlaylist(
  playlistId: number,
  gameId: number,
): Promise<void> {
  await apiClient.post(`/playlists/${playlistId}/games`, {
    game_id: gameId,
  });
}
export async function removeGameFromPlaylist(
  playlistId: number,
  gameId: number,
): Promise<void> {
  await apiClient.delete(`/playlists/${playlistId}/games/${gameId}`);
}
