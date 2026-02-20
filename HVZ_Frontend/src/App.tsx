import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Header Elements
import Logo from "./components/Logo.tsx";
import StaggeredDropDown from "./components/StaggeredDropdown.tsx";
import SearchPlayer from "./components/SearchPlayer.tsx";

//Page Elements
import Home from "./components/Home.tsx";
import PlayerTable from "./components/PlayerTable.tsx";
import Rules from "./components/Rules.tsx";
import Links from "./components/Links.tsx";
import Profile from "./components/Profile.tsx";

//Wrapper component to extract player_name from URL params for profile page
function ProfileWrapper() {
  const { player_name } = useParams<{ player_name: string }>();
  return <Profile player_name={String(player_name)} />;
}

//Top Level of the Website
function App() {
  return (
    <Router>
      <div className="app-root">
        <header className="app-header">
          <div className="app-header-left">
            <Logo />
          </div>

          <div className="app-header-right" style={{ marginLeft: "100px" }}>
            <span style={{ marginRight: "30px", marginTop: "15px" }}>
              <SearchPlayer />
            </span>
            <StaggeredDropDown />
          </div>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<PlayerTable />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/links" element={<Links />} />
            <Route path="/profile/:player_name" element={<ProfileWrapper />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
