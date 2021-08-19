import React, { Fragment } from 'react';

// routing
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

// componentes
import Personas from './components/Personas';
import NuevaPersona from './components/NuevaPersona';
import EditarPersona from './components/EditarPersona';


function App() {

  return (
    <Router>
      <Fragment>
        <header className="site-header">
          <h1><Link to="/">ABM Axon</Link></h1>
        </header>
        <Switch>
          <Route exact path="/" component={Personas} />
          <Route exact path="/personas/nuevo" component={NuevaPersona} />
          <Route exact path="/personas/editar/:id" component={EditarPersona} />
        </Switch>

      </Fragment>
    </Router>
  );
}

export default App;
