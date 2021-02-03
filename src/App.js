import './App.scss';
import React from "react";
import Characters from './components/Characters/Characters'
import Episodes from './components/Episodes/Episodes'
import Home from './components/Home/Home'
import Locations from './components/Locations/Locations'
import WatchList from './components/WatchList/WatchList'
import { Switch, Route, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#AAFF5A',
    flexGrow: 1,
    textAlign: 'center',
  },
  link: {
    '&:hover': {
      transform: 'scale(1.1)',
    }
  }
});

 function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        <Tabs
          value={value}
          onChange={handleChange}
          textcolor="primary"
        >
          <Paper className={classes.root}>
            <Tab className={classes.link} label="Home" to="/" component={NavLink}/>
            <Tab className={classes.link} label="Characters" to="/characters" component={NavLink}/>
            <Tab className={classes.link} label="Locations" to="/locations" component={NavLink} />
            <Tab className={classes.link} label="Episodes" to="/episodes" component={NavLink} />
            <Tab className={classes.link} label="My Watch List" to="/watch-list" component={NavLink} />
          </Paper>
        </Tabs>

        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/episodes">
            <Episodes />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/watch-list">
            <WatchList />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
        </>
  );
}

export default App
