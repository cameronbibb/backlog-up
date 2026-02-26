class PlaylistGame < ApplicationRecord
  belongs_to :playlist
  belongs_to :game
end
