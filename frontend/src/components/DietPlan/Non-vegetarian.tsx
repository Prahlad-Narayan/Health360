import React, { useState, useEffect } from 'react';
import "./dietplan.scss"
import Header from '../LandingPage/Header'
import axios from 'axios';

// Interface for representing a Meal
interface Meal {
  type: string;
  name: string;
  description: string;
  portion: string;
  calories: number;
}

// Interface for representing a DietPlan
interface DietPlan {
  goal: string;
  plan_name: string;
  meals: Meal[];
}

// Interface for DietPlanCardProps
interface DietPlanCardProps {
  plan: DietPlan;
}

// DietPlanCard component definition
const DietPlanCard: React.FC<DietPlanCardProps> = ({ plan }) => {
  // Filtering non-vegetarian meals from the plan
  const nonVegMeals = plan.meals.filter((meal) => meal.type.toLowerCase().includes('nv'));

  // JSX structure for displaying a diet plan card with non-vegetarian meals
  return (
    <div className="card">
      <h3>{plan.plan_name}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Portion</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {nonVegMeals.map((meal, index) => (
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

// Interface for NonVegDietListProps
interface NonVegDietListProps {
  dietPlans: DietPlan[];
}

// NonVegDietList component definition
const NonVegDietList: React.FC<NonVegDietListProps> = ({ dietPlans }) => {
  // JSX structure for displaying a list of non-vegetarian diet plans
  return (
    <div className="diet-plan-list">
      {dietPlans.map((plan, index) => (
        <DietPlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

// NonVegDietApp component definition
const NonVegDietApp: React.FC = () => {
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

  // Filtering non-vegetarian diet plans
  const nonVegDietPlans = dietPlans.filter((plan) =>
    plan.meals.some((meal) => meal.type.toLowerCase().includes('nv'))
  );

  // JSX structure for displaying the NonVegDietApp component
  return (
    <div className="App">
      <Header />
      <div className='pic'>
        <p className='dietname'>Non-Vegetarian Diet Plans</p>
        <NonVegDietList dietPlans={nonVegDietPlans} />
      </div>
    </div>
  );
};

// Exporting the NonVegDietApp component
export default NonVegDietApp;
