class Playlist < ApplicationRecord
  belongs_to :user
  has_many :playlist_games
  has_many :games, through: :playlist_games
end
