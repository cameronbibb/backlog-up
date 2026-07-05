import "./GamesDrawer.css";

function GamesDrawer({ children }: { children: React.ReactNode }) {
  return <div className="games-drawer">{children}</div>;
}

export default GamesDrawer;
