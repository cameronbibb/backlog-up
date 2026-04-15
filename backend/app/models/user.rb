class User < ApplicationRecord
  has_secure_password

  has_many :user_games
  has_many :games, through: :user_games
  has_many :playlists
  has_many :refresh_tokens, dependent: :destroy
end
