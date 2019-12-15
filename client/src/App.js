import React from "react";
import { Menu, Segment } from 'semantic-ui-react'
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link, useParams } from "react-router-dom";
import HourlyEventsPage from "./pages/HourlyEventsPage";
import DailyEventsPage from "./pages/DailyEventsPage";
import HourlyStatsPage from "./pages/HourlyStatsPage";
import DailyStatsPage from "./pages/DailyStatsPage";
import POIPage from "./pages/POIPage";
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

function App() {
const [activeItem,setActiveItem] = React.useState("home")
const handleItemClick=(e)=> setActiveItem(e.target.name)

return (
    <div className="App">
      <Segment inverted>
        <Menu style={{display:"flex",justifyContent:"space-between"}} size="massive" inverted secondary>
        <Link to="/hourly-events"><Menu.Item 
          name="hourly-events"
          active={activeItem === 'hourly-events'}
          onClick={handleItemClick} /></Link>
          <Link to="/daily-events"><Menu.Item 
          name="daily-events"
          active={activeItem === 'daily-events'}
          onClick={handleItemClick} /></Link>
          <Link to="/hourly-stats"><Menu.Item 
          name="hourly-stats"
          active={activeItem === 'hourly-stats'}
          onClick={handleItemClick} /></Link>
          <Link to="/daily-stats"><Menu.Item 
          name="daily-stats"
          active={activeItem === 'daily-stats'}
          onClick={handleItemClick} /></Link>
          <Link to="/poi"><Menu.Item 
          name="POI"
          active={activeItem === 'POI'}
          onClick={handleItemClick} /></Link>
        </Menu>
      </Segment>
      
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/hourly-events">
          <HourlyEventsPage />
        </Route>
        <Route path="/daily-events">
          <DailyEventsPage />
        </Route>
        <Route path="/hourly-stats">
          <HourlyStatsPage />
        </Route>
        <Route path="/daily-stats">
          <DailyStatsPage />
        </Route>
        <Route path="/poi">
          <POIPage />
        </Route>
        <Route path="*">
          <ErrorPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
