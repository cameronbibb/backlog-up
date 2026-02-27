class AuthenticationController < ApplicationController
  include JsonWebToken

  # POST /signup
  def signup
    user = User.new(user_params)

    if user.save
      token = encode_token({user_id: user.id})
      render json: { token: token, user: {id: user.id, email: user.email } }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { token: token, user: { id: user.id, email: user.email }}
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end