class AuthenticationController < ApplicationController
  include JsonWebToken
  include ActionController::Cookies

  # POST /signup
  def signup
    user = User.new(user_params)

    if user.save
      access_token = encode_token({ user_id: user.id }, 15.minutes.from_now)
      raw_refresh_token = create_refresh_token(user.id)
      cookies[:refresh_token] = {
        value: raw_refresh_token,
        httponly: true,
        expires: 30.days.from_now,
        secure: Rails.env.production?
      }
      render json: { access_token: access_token, user: { id: user.id, email: user.email } }, status: :created
      Rails.logger.debug "Cookies set: #{cookies[:refresh_token]}"
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      access_token = encode_token({ user_id: user.id }, 15.minutes.from_now)
      raw_refresh_token = create_refresh_token(user.id)
      cookies[:refresh_token] = {
        value: raw_refresh_token,
        httponly: true,
        expires: 30.days.from_now,
        secure: Rails.env.production?
      }
      render json: { access_token: access_token, user: { id: user.id, email: user.email } }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  # POST /refresh
  def refresh
    raw_client_refresh_token = cookies[:refresh_token]
    if raw_client_refresh_token.nil?
      render json: { error: "Refresh token doesn't exist. User must login." }, status: :unauthorized
      return
    end

    hashed_client_refresh_token = Digest::SHA256.hexdigest(raw_client_refresh_token)
    refresh_token = RefreshToken.find_by(token: hashed_client_refresh_token)

    if refresh_token.nil? || !refresh_token.active?
      render json: { error: "Refresh token expired. User must login." }, status: :unauthorized
    else
      refresh_token.revoke!()
      new_access_token = encode_token({ user_id: refresh_token.user_id }, 15.minutes.from_now)
      new_raw_refresh_token = create_refresh_token(refresh_token.user_id)
      cookies[:refresh_token] = {
        value: new_raw_refresh_token,
        httponly: true,
        expires: 30.days.from_now,
        secure: Rails.env.production?
      }
      render json: { access_token: new_access_token, user: { id: refresh_token.user.id, email: refresh_token.user.email } }
    end
  end

  # POST / logout
  def logout
    raw_client_refresh_token = cookies[:refresh_token]
    if raw_client_refresh_token.nil?
      render json: { error: "Refresh token doesn't exist. User must login." }, status: :unauthorized
      return
    end

    hashed_client_refresh_token = Digest::SHA256.hexdigest(raw_client_refresh_token)
    refresh_token = RefreshToken.find_by(token: hashed_client_refresh_token)

    if refresh_token.nil?
      render json: { error: "Refresh token doesn't exist." }, status: :not_found
      return
    end

    refresh_token.revoke!
    cookies.delete :refresh_token
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def create_refresh_token(user_id)
    new_raw_token = SecureRandom.hex(32)
    new_hashed_token = Digest::SHA256.hexdigest(new_raw_token)
    RefreshToken.create!({ user_id: user_id, token: new_hashed_token, expires_at: 30.days.from_now })
    new_raw_token
  end
end
