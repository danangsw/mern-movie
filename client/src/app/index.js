import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MovieList, MovieCreate, MovieUpdate } from '../pages'
import { Home } from '../pages/Home'
import { Default } from '../pages/Default'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
        <Switch>
            <Route path="/movie/list" exact component={MovieList} />
            <Route path="/movie/create" exact component={MovieCreate} />
            <Route path="/movie/update/:id" exact component={MovieUpdate} />
            <Route path="/" exact component={Home} />
            <Route component={Default} />
        </Switch>
    </Router>
  )
}

export default App
