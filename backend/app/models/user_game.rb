class UserGame < ApplicationRecord
  belongs_to :user
  belongs_to :game

  enum status: {
    backlog: "backlog",
    playling: "playing",
    completed: "completed"
  }
end
