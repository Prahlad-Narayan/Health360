// Importing necessary dependencies and styles
import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Header component representing the navigation bar
const Header: React.FC = () => {

  // Initializing translation hook
  const {t} = useTranslation('common');

  return (
    // Navigation bar container
    <div className="navigation-bar">
        {/* Home link */}
        <div>
            <a href="/dashboard">{t('navbar.myhome')}</a>
        </div>
        {/* Add Food link */}
        <div>
            <a href="/addFood">{t('navbar.food')}</a>
        </div>
        {/* Add Exercise link */}
        <div>
            <a href="/addExercise">{t('navbar.exercise')}</a>
        </div>
        {/* Blogs link */}
        <div>
            <a href="blogs">{t('navbar.blog')}</a>
        </div>
        {/* Diet Plan link */}
        <div>
            <a href="/dietPlan">{t('navbar.dietplan')}</a>
        </div>
        {/* Workout Plan link */}
        <div>
            <a href="/workoutPlan">{t('navbar.workoutplan')}</a>
        </div>
        {/* Update Profile link */}
        <div>
            <Link to="/update-profile">{t('navbar.updateprofile')}</Link>
        </div>
    </div>
  );
};

// Exporting the Header component
export default Header;
