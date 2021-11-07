import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Productpage from './components/Productpage'
import Userpage from './components/Userpage'
import Salepage from './components/Salepage'
import Navigation from './components/Navigation'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/products" component={Productpage} />
        <Route path="/users" component={Userpage} />
        <Route path="/sales" component={Salepage} />
      </Router>
    </div>
  );
}

export default App;
