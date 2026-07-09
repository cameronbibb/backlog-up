import "./GamesList.css";
import GameListing from "../GameListing/GameListing";
import type { UserGame } from "../../../types";

function GamesList({ userGames }: { userGames: UserGame[] }) {
  return (
    <div className="games-drawer">
      {userGames && (
        <>
          {userGames.map((game) => {
            return <GameListing key={game.id} userGame={game}></GameListing>;
          })}
        </>
      )}
      {userGames.length === 0 && (
        <>
          <p>Hey! Your game drawer is empty, noob!</p>
        </>
      )}
    </div>
  );
}

export default GamesList;
