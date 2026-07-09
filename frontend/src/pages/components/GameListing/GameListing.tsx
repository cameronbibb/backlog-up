import "./GameListing.css";
import { type UserGame } from "../../../types";

function GameListing({ userGame }: { userGame: UserGame }) {
  return (
    <div className="box-side">
      <h3>{userGame.game.name}</h3>
      <p>{userGame.status}</p>
    </div>
  );
}

export default GameListing;
