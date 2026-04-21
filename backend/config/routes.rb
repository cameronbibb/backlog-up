Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  #
  post "/signup", to: "authentication#signup"
  post "/login", to: "authentication#login"
  post "/refresh", to: "authentication#refresh"
  post "/logout", to: "authentication#logout"

  resources :user_games, only: [ :index, :create, :update, :destroy ]

  resources :playlists, only: [ :index, :create, :update, :show, :destroy ] do
    post "games", to: "playlists#add_game"
    delete "games/:game_id", to: "playlists#remove_game"
  end

  get "/games/search", to: "games#search"
  get "/games/:id", to: "games#show"
end
