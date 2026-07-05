import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserGames, addUserGame } from "../services/userGames";
import { type UserGame, type IgdbGame } from "../types";
import { searchGames } from "../services/games";
import { formatReleaseYear } from "../utils";
import BoxSide from "../components/BoxSide/BoxSide";
import GamesDrawer from "../components/GamesDrawer/GamesDrawer";

function Home() {
  const { logout } = useAuth();
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [searchText, setSearchText] = useState("");
  const [foundGames, setFoundGames] = useState<IgdbGame[]>([]);
  const [gameToAdd, setGameToAdd] = useState<IgdbGame | null>(null);
  const [status, setStatus] = useState<"backlog" | "playing" | "completed">(
    "backlog",
  );
  const [platformOwned, setPlatformOwned] = useState("");

  useEffect(() => {
    const retrieveUserGames = async () => {
      const data = await getUserGames();
      console.log(data);
      setUserGames(data);
    };

    retrieveUserGames();
  }, []);

  const searchForGame = async () => {
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

  const handleDisplayGame = (game: IgdbGame) => {
    console.log(game);
    setGameToAdd(game);
    if (game.platforms) {
      setPlatformOwned(game.platforms[0].name);
    }
  };

  const handleConfirmAdd = async () => {
    if (!gameToAdd) {
      return;
    }
    const response = await addUserGame(gameToAdd.id, status, platformOwned);
    console.log(`game successfully added to your ${response.status} playlist`);
  };

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
        <button onClick={searchForGame}>search</button>
      </div>
      {gameToAdd && (
        <div>
          <img src={gameToAdd?.cover.url} alt={gameToAdd?.name} />
          <h3>Playlist:</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
          >
            <option value="backlog">backlog</option>
            <option value="playing">playing</option>
            <option value="completed">completed</option>
          </select>
          <h3>Platform:</h3>
          <select
            value={platformOwned}
            onChange={(e) => setPlatformOwned(e.target.value)}
          >
            {gameToAdd?.platforms?.map((platform) => {
              return (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              );
            })}
          </select>
          <div>
            <button onClick={handleConfirmAdd}>add game</button>
          </div>
        </div>
      )}
      <div>
        {foundGames && (
          <ul>
            {foundGames.map((game) => (
              <li key={game.id}>
                <a onClick={() => handleDisplayGame(game)}>
                  {game.name} {game.first_release_date}{" "}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <GamesDrawer>
        {userGames && (
          <>
            {userGames.map((game) => {
              return <BoxSide key={game.id} userGame={game}></BoxSide>;
            })}
          </>
        )}
        {userGames.length === 0 && (
          <>
            <p>Hey! Your game drawer is empty. Are you a noob?</p>
          </>
        )}
      </GamesDrawer>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Home;
