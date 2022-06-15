import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import useFetch from './hooks/useFetch';

import Header from './components/js/Header';

import HomeContainer from "./container/home-container";
import CreateGroupContainer from "./container/create-group-container";

import {useLoaderContext} from "./context/loader-context"
import { LinearProgress } from '@mui/material';

// start wih npm run start
function App() {
  const {loading} = useLoaderContext();

  return (
        <Router>
          {
              loading &&
              <LinearProgress style={{position: "absolute", top: "0", width: "100%"}}/>
          }
          <Header />

          <Routes>
              <Route exact path="/" render={(props) =>
                        <HomeContainer
                            {...props}
                        />}
                    />

              <Route exact path="/createGroup" render={(props) =>
                  <CreateGroupContainer
                    {...props}  
                  />}
              />

          </Routes>

        </Router>
    );
}

export default App;
