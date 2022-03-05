import './app.css';
import BrewTable from './BrewTable/BrewTable'
import history from './history';
import { Router } from 'react-router-dom'

function App() {

  //redirection to homepage
  if (!history.location.pathname.includes("/brew-table")) history.push("/brew-table")

  return (
    <Router history={history}>
      <div className="App">
        <BrewTable />
      </div>
    </Router>
  );
}

export default App;
