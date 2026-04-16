class AuthenticationController < ApplicationController
  include JsonWebToken

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
