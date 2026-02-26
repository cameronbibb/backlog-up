class CreateGames < ActiveRecord::Migration[7.2]
  def change
    create_table :games, id: false do |t|
      t.integer :id, primary_key: true
      t.string :name
      t.string :cover_url
      t.date :first_release_date
      t.text :summary

      t.timestamps
    end
  end
end
