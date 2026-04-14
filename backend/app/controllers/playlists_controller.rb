class PlaylistsController < ApplicationController
  before_action :authorize_request
  before_action :set_playlist, only: [ :update, :show, :destroy, :add_game, :remove_game ]

  def index
    playlists = current_user.playlists
    render json: playlists
  end

  def create
    playlist = current_user.playlists.build(playlist_params)

    if playlist.save
      render json: playlist, status: :created
    else
      render json: { errors: playlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    playlist = current_user.playlists.includes(:games).find(params[:id])
    render json: playlist, include: :games
  end

  def update
    if @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: { errors: @playlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @playlist.destroy
    head :no_content
  end

  def add_game
    playlist_game = @playlist.playlist_games.build(game_params)

    if playlist_game.save
      render json: playlist_game, status: :created
    else
      render json: { errors: playlist_game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def remove_game
    playlist_game = @playlist.playlist_games.find_by!(game_id: params[:game_id])
    playlist_game.destroy
    head :no_content
  end

  private

  def set_playlist
    id = params[:id] || params[:playlist_id]
    @playlist = current_user.playlists.find(id)
  end

  def playlist_params
    params.require(:playlist).permit(:name)
  end

  def game_params
    params.permit(:game_id)
  end
end
