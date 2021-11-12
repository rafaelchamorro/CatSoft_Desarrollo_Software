import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react";

import Productpage from './components/Productpage'
import Userpage from './components/Userpage'
import Salepage from './components/Salepage'
import Navigation from './components/Navigation'
import Home from './components/Home'

function App() {
  return (
    <Auth0Provider 
    domain="misiontic-catsoft.us.auth0.com"
    clientId="3S7XmXTnaC6YmfgoJ5Geq3XXe2k8pMTg"
    redirectUri={window.location.origin}>
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/products" component={Productpage} />
        <Route path="/users" component={Userpage} />
        <Route path="/sales" component={Salepage} />
      </Router>
    </div>
    </Auth0Provider>
  );
}

export default App;
