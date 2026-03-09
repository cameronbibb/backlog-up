class GamesController < ApplicationController
  before_action :authorize_request

  def search
    query = params[:query]

    return render json: { error: "Query parameter required" }, status: :bad_request if query.blank?

    service = IgdbService.new
    results = service.search_games(query)

    render json: results
  end

  def show
    game_id = params[:id]

    return render json: { error: "Please enter a valid game id." }, status: :bad_request if game_id.blank?

    service = IgdbService.new
    result = service.get_game(game_id)

    render json: result
  end
end
