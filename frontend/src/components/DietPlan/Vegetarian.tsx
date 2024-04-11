// Importing necessary React hooks, components, and styles
import React, { useState, useEffect } from 'react';
import "./dietplan.scss"
import Header from '../LandingPage/Header'
import axios from 'axios';

// Defining interfaces for Meal and DietPlan
interface Meal {
  type: string;
  name: string;
  description: string;
  portion: string;
  calories: number;
}

interface DietPlan {
  goal: string;
  plan_name: string;
  meals: Meal[];
}

// Defining interface for DietPlanCardProps
interface DietPlanCardProps {
  plan: DietPlan;
}

// DietPlanCard component definition
const DietPlanCard: React.FC<DietPlanCardProps> = ({ plan }) => {
  // Filtering vegetarian meals from the plan
  const vegetarianMeals = plan.meals.filter((meal) => meal.type.toLowerCase().includes('vegetarian'));

  // JSX structure for displaying a diet plan card
  return (
    <div className="card">
      <h3 className='plannum'>{plan.plan_name}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Portion</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {vegetarianMeals.map((meal, index) => (
            <tr key={index}>
              <td>{meal.name}</td>
              <td>{meal.description}</td>
              <td>{meal.portion}</td>
              <td>{meal.calories} calories</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Defining interface for VegetarianDietListProps
interface VegetarianDietListProps {
  dietPlans: DietPlan[];
}

// VegetarianDietList component definition
const VegetarianDietList: React.FC<VegetarianDietListProps> = ({ dietPlans }) => {
  // JSX structure for displaying a list of vegetarian diet plans
  return (
    <div className="diet-plan-list">
      {dietPlans.map((plan, index) => (
        <DietPlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

// VegetarianDietApp component definition
const VegetarianDietApp: React.FC = () => {
  // State for storing diet plans and loading status
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching diet plans from the server using Axios and updating state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/diets');
        setDietPlans(response.data[0].diet_plans);
        setLoading(false);
        console.log(response.data[0].diet_plans);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Displaying a loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Filtering vegetarian diet plans
  const vegetarianDietPlans = dietPlans.filter((plan) =>
    plan.meals.some((meal) => meal.type.toLowerCase().includes('vegetarian'))
  );

  // JSX structure for displaying the VegetarianDietApp component
  return (
    <div className="App">
      <Header />
      <div className='pic'>
        <p className='dietname'>Vegetarian Diet Plans</p>
        <div className="diet-plan-list">
          {vegetarianDietPlans.map((plan, index) => (
            <DietPlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporting the VegetarianDietApp component
export default VegetarianDietApp;
