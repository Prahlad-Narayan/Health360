// Importing necessary React hooks and components
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import Navigation from './Navigation';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';

// Interface for the decoded JWT payload with additional userId
interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

// Variable to store user ID
let userId: string;

// Header component definition
const Header: React.FC = () => {
  // Initializing useDispatch and useSelector hooks from Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const history = useNavigate();
  const [firstName, setFirstName] = useState<string>("");

  // Async function to fetch user data based on userId
  async function fetchUser(userId: string) {
    try {
      const userResponse = await axios.get(`http://localhost:3000/user/${userId}`);
      setFirstName(userResponse.data.firstName);
      return userResponse.data.firstName;
    } catch (error) {
      throw new Error("Failed to fetch user profile");
    }
  }

  // Checking if the user is logged in
  if (isLoggedIn) {
    const token = localStorage.getItem('token');

    if (token) {
      // Decoding the JWT token to get the userId
      const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
      userId = decoded.userId;
    }
    // Fetching user data
    fetchUser(userId);
  }

  // Initializing i18n translation hook
  const { t } = useTranslation('common');

  // Handling logout functionality
  const handleLogout = () => {
    dispatch(logout());
    history('/');
  };

  // JSX structure for the header component
  return (
    <div>
      {/* Navbar section */}
      <header className="navbar">
        {/* Top logo section */}
        <a href={isLoggedIn ? "/dashboard" : "/"} className="top-logo">
          <img className="logo" src={process.env.PUBLIC_URL + "/Health360LOGO.png"} alt="Logo" />
          <h2 className="name">{t('title')}</h2>
        </a>
        {/* Navigation section */}
        <nav>
          {isLoggedIn ? (
            // If logged in, display user greeting and logout option
            <div className="nav-items">
              <p>{t('greeting.label')}, {firstName}</p>
              <a href="/" onClick={handleLogout}>
                {t('logout.button.label')}
              </a>
            </div>
          ) : (
            // If not logged in, display login option
            <a href="/login">Login</a>
          )}
        </nav>
      </header>
      {/* Conditional rendering of Navigation component if logged in */}
      <div>
        {isLoggedIn ? (
          <Navigation />
        ) : (<div></div>)}
      </div>
    </div>
  );
};

// Exporting the Header component
export default Header;
