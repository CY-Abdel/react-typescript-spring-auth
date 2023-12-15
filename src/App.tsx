import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Logo from './assets/logo.jpg';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

function App() {

  const logOut = () => {

  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            <img className='logo' src={Logo} alt="logo" />
          </Link>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className='nav-link'>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/mod"} className='nav-link'>
                Moderator
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/admin"} className='nav-link'>
                Admin
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/user"} className='nav-link'>
                User
              </Link>
            </li>
          </div>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                profile to show if connected !
              </Link>
            </li>

            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                Déconnexion
              </a>
            </li>
          </div>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Se connecter
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={"/register"} className="nav-link">
                S'inscrire
              </Link>
            </li>
          </div>

        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>

    </>
  )
}

export default App
