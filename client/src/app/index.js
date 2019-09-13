import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MovieList } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
        <Switch>
            <Route path="/movie/list" exact component={MovieList} />
        </Switch>
    </Router>
  )
}

export default App
