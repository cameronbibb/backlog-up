class ApplicationController < ActionController::API
  include JsonWebToken
  
  def authorize_request
    token = request.headers['Authorization']&.split(" ")&.last

    decoded_token = decode_token(token)

    return render json: { error: 'Unauthorized' }, status: :unauthorized unless decoded_token

    user_id = decoded_token[:user_id]
    @current_user = User.find(user_id) 

  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def current_user
    @current_user
  end
end
