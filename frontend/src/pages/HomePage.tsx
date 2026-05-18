import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserGames } from "../services/userGames";
import { type UserGame, type IgdbGame } from "../types";
import { searchGames } from "../services/games";
import { formatReleaseYear } from "../utils";

function Home() {
  const { logout } = useAuth();
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [searchText, setSearchText] = useState("");
  const [foundGames, setFoundGames] = useState<IgdbGame[]>([]);

  useEffect(() => {
    const retrieveUserGames = async () => {
      const data = await getUserGames();
      console.log(data);
      setUserGames(data);
    };

    retrieveUserGames();
  }, []);

  const searchGame = async () => {
    const data = await searchGames(searchText);
    console.log(data);
    const formatted = data.map((gameObj) => ({
      ...gameObj,
      first_release_date: formatReleaseYear(gameObj.first_release_date),
    }));
    setFoundGames(formatted);
  };
  //add game to user games
  //-update the user games on add

  //delete game from user games
  //-update user games on delete

  return (
    <>
      <h1>Backlog Up</h1>
      <p>Welcome to your game collection.</p>
      <div>
        <label htmlFor="search"></label>
        <input
          type="text"
          placeholder="search for new games"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button onClick={searchGame}>search</button>
      </div>
      <div>
        {foundGames && (
          <ul>
            {foundGames.map((game) => (
              <li key={game.id}>
                {game.name} {game.first_release_date}
              </li>
            ))}
          </ul>
        )}
      </div>
      {userGames && (
        <ul>
          {userGames.map((game) => {
            return <li key={game.id}>{game.game.name}</li>;
          })}
        </ul>
      )}
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Home;
