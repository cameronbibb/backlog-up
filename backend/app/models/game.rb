class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games
  
  has_many :playlist_games
  has_many :playlists, through: :playlist_games
end
