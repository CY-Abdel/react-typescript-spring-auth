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

import * as AuthService from './services/auth.service';
import { useEffect, useState } from 'react';
import IUser from './types/user.type';
import eventBus from './common/EventBus';
import Parallax from './components/Parallax/Parallax';
import ProgressBar from './components/ProgressBar/ProgressBar';

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      // console.log("user roles: ", user.roles);
    }

    eventBus.on("logout", logOut);

    return () => {
      eventBus.remove("logout", logOut);
    };

  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5">

          <Link to={"/"} className="navbar-brand">
            <img className='logo' src={Logo} alt="logo" />
          </Link>

          <div className="navbar-nav d-flex me-auto">
            <li className="nav-item">
              <Link to={"/home"} className='nav-link'>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/parallax"} className='nav-link'>
                Parallax
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/progressbar"} className='nav-link'>
                ProgressBar
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className='nav-link'>
                  Moderator
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className='nav-link'>
                  Admin
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className='nav-link'>
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav d-flex ms-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profil {currentUser.username}
                </Link>
              </li>

              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  Déconnexion
                </a>
              </li>
            </div>
          ) : (
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
          )}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/parallax" element={<Parallax />} />
        <Route path="/progressbar" element={<ProgressBar />} />
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
