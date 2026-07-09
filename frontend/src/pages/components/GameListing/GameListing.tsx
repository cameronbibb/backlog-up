import "./GameListing.css";
import { type UserGame } from "../../../types";
import { formatPlatformName } from "../../../utils";

function GameListing({ userGame }: { userGame: UserGame }) {
  return (
    <div className="game-listing">
      <div
        className={`platform-indicator ${formatPlatformName(userGame.platform_owned)}`}
      ></div>
      <div className="game-name">{userGame.game.name}</div>
      <div className="game-details">
        {userGame.platform_owned} (
        {userGame.game.first_release_date.split("-")[0]})
      </div>
    </div>
  );
}

export default GameListing;
