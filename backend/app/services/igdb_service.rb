class IgdbService
  TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token"
  IGDB_BASE_URL = "https://api.igdb.com/v4"

  def initialize
    @client_id = ENV["TWITCH_CLIENT_ID"]
    @client_secret = ENV["TWITCH_CLIENT_SECRET"]
    @access_token = null
  end

  # Public methods (what controllers will call)
  def search_games(query)
    # 1. Get access token
    # 2. Make request to IGDB search endpoint
    # 3. Return parsed results
  end

  def get_game(id)
    # 1. Get access token
    # 2. Make request to IGDB games endpoint for specific ID
    # 3. Return parsed result
  end

  private

  # Private helper methods
  def get_access_token
    # 1. Return cached token if exists
    # 2. Otherwise, fetch new token from Twitch
    # 3. Cache it
  end

  def fetch_access_token
    response = HTTParty.post(
      TWITCH_AUTH_URL,
      body: {
        client_id: @client_id,
        client_secret: @client_secret,
        grant_type: "client_credentials"
      }
    )

    response.parsed_response["access_token"]
  end

  def igdb_request(endpoint, body)
    # Generic method to make requests to IGDB
    # Handles headers, auth, parsing
  end
end
