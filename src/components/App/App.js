import { FilterContext } from "context/FilterContext";
import Home from "domain/Home/Home";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Favs from "domain/Favs/Favs";
import Album from "domain/Album/Album";
import Artist from "domain/Artist/Artist";
import TrackPage from "domain/TrackPage/TrackPage";
import NotFound from "domain/NotFound/NotFound";

function App() {
  const [filter, setFilter] = useState("TRACK_ASC")
  return (
    <div className="App">
      <Nav />
      <Switch >
        <Route exact path="/" component={() => <Redirect to='/accueil' />} />
        <Route path="/accueil">
          <FilterContext.Provider value={{ filter, setFilter }}>
            <Home />
          </FilterContext.Provider>
        </Route>


        <Route path="/favoris">
          <Favs />
        </Route>

        <Route path="/artiste/:id">
          <Artist />
        </Route>

        <Route path="/album/:id">
          <Album />
        </Route>

        <Route path="/musique/:id">
          <TrackPage />
        </Route>

        {/* REDIRECTS */}
        <Route exact path="/album">
          <Redirect to='/accueil' />
        </Route>
        <Route exact path="/musique">
          <Redirect to='/accueil' />
        </Route>
        <Route exact path="/artiste">
          <Redirect to='/accueil' />
        </Route>

        <Route component={NotFound} />

      </Switch>
    </div>
  );
}

export default App;
