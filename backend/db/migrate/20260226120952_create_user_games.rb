class CreateUserGames < ActiveRecord::Migration[7.2]
  def change
    create_table :user_games do |t|
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true
      t.string :status
      t.string :platform_owned

      t.timestamps
    end
  end
end
