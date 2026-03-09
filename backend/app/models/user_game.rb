class UserGame < ApplicationRecord
  belongs_to :user
  belongs_to :game

  VALID_STATUSES = [ "backlog", "playing", "completed" ]

  validates :status, inclusion: { in: VALID_STATUSES }
  validates :game_id, uniqueness: { scope: :user_id }

  enum status: {
    backlog: "backlog",
    playing: "playing",
    completed: "completed"
  }
end
