import { BrowserRouter as Router } from 'react-router-dom';

import RouteList from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <RouteList />
    </Router>
  </>
);

export default App;
