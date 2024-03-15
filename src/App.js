import './App.css';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import SignupScreen from "./components/screens/SignupScreen";
import LoginScreen from './components/screens/LoginScreen';
import Home from './components/screens/Home';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/user/register" element={<SignupScreen />} />
            <Route path="/user/login" element={<LoginScreen />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
