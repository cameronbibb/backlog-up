import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserGames, addUserGame } from "../services/userGames";
import { type UserGame, type IgdbGame } from "../types";
import { searchGames } from "../services/games";
import { formatReleaseYear } from "../utils";
import GamesList from "./components/GamesList/GamesList";

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

  //List Selection
  const [selectedList, setSelectedList] = useState<
    "all" | "backlog" | "playing" | "completed"
  >("all");

  const filteredList = useMemo(() => {
    if (selectedList === "all") return userGames;
    return userGames.filter((g) => g.status === selectedList);
  }, [userGames, selectedList]);

  const backgroundImage = () => {
    //get image url from a game
    //->use the length of userGames array to pick a random number between 0 and length - 1
    //->use this number as the index to choose a game
    //->modify cover url by replacing cover_big with screenshot_huge
    //  https://images.igdb.com/igdb/image/upload/t_screenshot_huge/co2dto.jpg
    //->load image from game's url
  };

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
    <div className="page-wrapper">
      <nav className="nav-bar">
        <h1 className="logo">Backlog Up</h1>
        <div className="account-icon">username</div>
        {/* <button className="logout-button" onClick={logout}>
          Logout
        </button> */}
      </nav>
      <div className="hero-banner">
        <div className="hero-background-image">
          <div
            className="hero-background-image-top"
            style={{
              backgroundImage:
                "url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/co2dto.jpg)",
            }}
          ></div>
          <div
            className="hero-background-image-center"
            style={{
              backgroundImage:
                "url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/co2dto.jpg)",
            }}
          ></div>
          <div
            className="hero-background-image-bottom"
            style={{
              backgroundImage:
                "url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/co2dto.jpg)",
            }}
          ></div>
          <div className="selected-list-title">
            {selectedList === "all" ? "all games" : selectedList}
          </div>
        </div>
        <div className="list-selection-row">
          {" "}
          <span onClick={() => setSelectedList("all")}>ALL</span> |{" "}
          <span onClick={() => setSelectedList("backlog")}>BACKLOG</span> |{" "}
          <span onClick={() => setSelectedList("playing")}>PLAYING</span> |{" "}
          <span onClick={() => setSelectedList("completed")}>COMPLETED</span>
        </div>
      </div>
      <div>
        <p>Your game collection.</p>
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
        <GamesList userGames={filteredList} />
      </div>
    </div>
  );
}

export default Home;
