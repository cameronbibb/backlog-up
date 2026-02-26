class CreatePlaylistGames < ActiveRecord::Migration[7.2]
  def change
    create_table :playlist_games do |t|
      t.references :playlist, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
