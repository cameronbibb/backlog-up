class UserGamesController < ApplicationController
  before_action :authorize_request

  def index
    user_games = current_user.user_games
    render json: user_games
  end
end
