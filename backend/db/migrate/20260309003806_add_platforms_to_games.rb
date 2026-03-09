class AddPlatformsToGames < ActiveRecord::Migration[7.2]
  def change
    add_column :games, :platforms, :jsonb
  end
end
