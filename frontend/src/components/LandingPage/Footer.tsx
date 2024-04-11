// Importing necessary React hooks and components
import React from 'react';
import "./Landing.scss"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice'; 
import { useTranslation } from 'react-i18next';

// Footer component definition
const Footer = () => {
    // Using Redux hooks to check if the user is logged in
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    
    // Initializing i18n translation hook
    const { t } = useTranslation('common');

    // Initializing navigate hook to enable page redirection
    let navigate = useNavigate();

    // Function to handle page redirection on button click
    const routeChange = () => {
        let path = `signup`;
        navigate(path);
    }

    // JSX structure for the footer component
    return (
        <footer>
            <section>
                {/* Logo and title section */}
                <div className="footer-logo">
                    <img className="logo" src={process.env.PUBLIC_URL + "/Health360LOGO.png"} alt="Logo"></img>
                    <p>{t('title')}</p>
                </div>
                {/* Slogan section */}
                <p className="slogan">{t('slogan')}</p>
            </section>
            {/* Displaying the "Start Now" button only if the user is not logged in */}
            {!isLoggedIn && (
                <button className="footer-start" onClick={routeChange}>Start Now</button>
            )}
            {/* Copyright, social icons, and company information section */}
            <div>
                <p className="certificate">©2023 Health360, Inc.</p>
                <div className="social">
                    <img className="icon" src={process.env.PUBLIC_URL + "/instagram.png"} alt="icon"></img>
                    <img className="icon" src={process.env.PUBLIC_URL + "/facebook.png"} alt="icon"></img>
                    <img className="icon" src={process.env.PUBLIC_URL + "/twitterx.png"} alt="icon"></img>
                    <img className="icon" src={process.env.PUBLIC_URL + "/reddit.png"} alt="icon"></img>
                </div>
            </div>
        </footer>
    )
}

// Exporting the Footer component
export default Footer;
