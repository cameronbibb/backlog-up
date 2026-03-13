class IgdbService
  TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token"
  IGDB_BASE_URL = "https://api.igdb.com/v4"

  def initialize
    @client_id = ENV["TWITCH_CLIENT_ID"]
    @client_secret = ENV["TWITCH_CLIENT_SECRET"]
    @access_token = access_token
  end

  def search_games(query, limit: 10)
    body = <<~QUERY
      search "#{query}";
      fields id,name,cover.url,first_release_date,summary;
      limit #{limit};
    QUERY

    igdb_request("games", body)
  end

  def get_game(id)
    body = <<~QUERY
      where id = #{id};
      fields id,name,cover.url,first_release_date,summary,platforms.name;
    QUERY
    igdb_request("games", body).first
  end

  private

  def access_token
    Rails.cache.fetch("igdb_access_token", expires_in: 59.days) do
      fetch_access_token
    end
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
    url = "#{IGDB_BASE_URL}/#{endpoint}"
    response = HTTParty.post(
      url,
      headers: {
        "Client-ID" => @client_id,
        "Authorization" => "Bearer #{access_token}"
      },
      body: body
    )
    response.parsed_response
  end
end
