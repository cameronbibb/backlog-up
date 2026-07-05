import "./BoxSide.css";
import { type UserGame } from "../../types";

function BoxSide({ userGame }: { userGame: UserGame }) {
  return (
    <div className="box-side">
      <h3>{userGame.game.name}</h3>
    </div>
  );
}

export default BoxSide;
