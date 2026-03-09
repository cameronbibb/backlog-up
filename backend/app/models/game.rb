class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games

  has_many :playlist_games
  has_many :playlists, through: :playlist_games

  def self.find_or_create_from_igdb(igdb_id)
    game = find_by(id: igdb_id)
    return game if game

    igdb_data = IgdbService.new.get_game(igdb_id)
    create_from_igdb(igdb_data)
  end

  def self.create_from_igdb(igdb_data)
    create!(
      id: igdb_data["id"],
      name: igdb_data["name"],
      cover_url: format_cover_url(igdb_data["cover"]),
      first_release_date: parse_release_date(igdb_data["first_release_date"]),
      summary: igdb_data["summary"],
      platforms: extract_platforms(igdb_data["platforms"])
    )
  end

  private

  def self.format_cover_url(cover_data)
    return nil unless cover_data && cover_data["url"]
    "https:#{cover_data['url']}".gsub("t_thumb", "t_cover_big")
  end

  def self.parse_release_date(timestamp)
    return nil unless timestamp
    Time.at(timestamp).to_date
  end

  def self.extract_platforms(platforms_data)
    return [] unless platforms_data
    platforms_data.map { |p| p["name"] }
  end
end
