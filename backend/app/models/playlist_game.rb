class PlaylistGame < ApplicationRecord
  belongs_to :playlist
  belongs_to :game

  validates :game_id, uniqueness: { scope: :playlist_id }
end
