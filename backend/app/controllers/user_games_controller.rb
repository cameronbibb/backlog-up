class UserGamesController < ApplicationController
  before_action :authorize_request

  def index
    user_games = current_user.user_games.includes(:game)
    render json: user_games, include: :game
  end

  def create
    user_game = current_user.user_games.build(user_game_params)
    
    if user_game.save
      render json: user_game, status: :created
    else
      render json: { errors: user_game.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ArgumentError => e
    render json: { errors: [e.message] }, status: :unprocessable_entity
  end

  private

  def user_game_params
    params.require(:user_game).permit(:game_id, :status, :platform_owned)
  end
end
