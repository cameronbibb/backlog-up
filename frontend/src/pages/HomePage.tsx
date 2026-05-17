import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserGames } from "../services/userGames";
import { type UserGame } from "../types";

function Home() {
  const { logout } = useAuth();
  const [userGames, setUserGames] = useState<UserGame[]>([]);

  useEffect(() => {
    const retrieveUserGames = async () => {
      const data = await getUserGames();
      console.log(data);
      setUserGames(data);
    };

    retrieveUserGames();
  }, []);

  return (
    <>
      <h1>Backlog Up</h1>
      <p>Welcome to your game collection.</p>
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
