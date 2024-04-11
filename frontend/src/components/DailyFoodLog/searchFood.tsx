import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../LandingPage/Header';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './searchFood.scss';

// Define the structure of a FoodItem
type FoodItem = {
  userId: string;
  mealType: string;
  date: string;
  foodName: string;
  servingSize: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  sodium: number;
  sugar: number;
};

// Define the structure of URL parameters
type Params = {
  mealType: string;
  formattedDate: string;
};

// Define a custom interface for JwtPayload with userId
interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

// Global variable to store userId
let userId: string;

// Component for searching and adding food items
const SearchFood: React.FC = () => {
  const navigate = useNavigate();
  const { mealType, formattedDate } = useParams<Params>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [initialCalories, setInitialCalories] = useState<number>(0);
  const [initialCarbs, setInitialCarbs] = useState<number>(0);
  const [initialFat, setInitialFat] = useState<number>(0);
  const [initialProtein, setInitialProtein] = useState<number>(0);
  const [initialSodium, setInitialSodium] = useState<number>(0);
  const [initialSugar, setInitialSugar] = useState<number>(0);
  const [initialServingSize, setInitialServingSize] = useState<number>(0);
  const meal = mealType!;
  const date = formattedDate!;

  // Retrieve and decode user ID from JWT token stored in localStorage
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
    userId = decoded.userId;
  }

  // Function to handle changes in quantity input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);
    setSelectedQuantity(quantity);

    if (selectedFood) {
      if(quantity === 0 || Number.isNaN(quantity)) {
        setSelectedFood({ ...selectedFood, servingSize: initialServingSize, calories: initialCalories, carbs: initialCarbs, 
        fat: initialFat, protein: initialProtein, sodium: initialSodium, sugar: initialSugar });
      } else {
        const updatedServingSize = Math.round(initialServingSize * quantity * 100) / 100;
        const updatedCalories = Math.round(initialCalories * quantity * 100) / 100;
        const updatedCarbs = Math.round(initialCarbs * quantity* 100) / 100;
        const updatedFat = Math.round(initialFat * quantity * 100) / 100;
        const updatedProtein = Math.round(initialProtein * quantity * 100) / 100;
        const updatedSodium = Math.round(initialSodium * quantity * 100) / 100;
        const updatedSugar = Math.round(initialSugar * quantity * 100) / 100;
        setSelectedFood({ ...selectedFood, servingSize: updatedServingSize, calories: updatedCalories, carbs: updatedCarbs, 
          fat: updatedFat, protein: updatedProtein, sodium: updatedSodium, sugar: updatedSugar });
      }
    }
  };

  // Function to search for food items using Nutritionix API
  const searchFood = async () => {
    try {
      setSearchResults([]);
      setSelectedFood(null);
      if (searchTerm !== "") {
        const response = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
          headers: {
            'x-app-id': `${process.env.REACT_APP_X_APP_ID}`,
            'x-app-key': `${process.env.REACT_APP_X_APP_KEY}`,
          },
          params: {
            query: searchTerm,
            branded: false
          },
        });

        if (response.data.common.length === 0) {
          setError("No results found!");
        }
        setSearchResults(response.data.common.slice(0, 5));
      } else {
        setError("Please provide a phrase to search for!");
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError("Error fetching search results!");
    }
  };

  // Function to handle a clicked food item from search results
  const handleClick = async (food: any) => {
    const response = await axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients/`, 
        {
            query: food.food_name
        },
        {
            headers: {
                'Content-type': 'application/json',
                'x-app-id': `${process.env.REACT_APP_X_APP_ID}`,
                'x-app-key': `${process.env.REACT_APP_X_APP_KEY}`
            },
    });

    console.log(response.data);


    const selectedFoodObj = {
        userId: userId,
        foodName: food.food_name,
        date: date,
        mealType: meal,
        servingSize: response.data.foods[0].serving_weight_grams * response.data.foods[0].serving_qty,
        calories: response.data.foods[0].nf_calories,
        carbs: response.data.foods[0].nf_total_carbohydrate,
        fat: response.data.foods[0].nf_total_fat,
        protein: response.data.foods[0].nf_protein,
        sodium: response.data.foods[0].nf_sodium,
        sugar: response.data.foods[0].nf_sugars
      };

    setSelectedFood(selectedFoodObj);
    setInitialCalories(response.data.foods[0].nf_calories);
    setInitialServingSize(response.data.foods[0].serving_weight_grams * response.data.foods[0].serving_qty);
    setInitialCarbs(response.data.foods[0].nf_total_carbohydrate);
    setInitialFat(response.data.foods[0].nf_total_fat);
    setInitialProtein(response.data.foods[0].nf_protein);
    setInitialSodium(response.data.foods[0].nf_sodium);
    setInitialSugar(response.data.foods[0].nf_sugars);
  };

  // Function to save selected food to the backend
  const handleSave = async () => {
    if(selectedFood) {
      try {
        const res = await axios.post("http://localhost:3000/addfood", selectedFood);
        console.log(res);
        if (res.status === 200 ) {
          navigate("/addfood");
        }
      } catch (error: any) {
        setError("Error saving the values!");
      }
    } else {
      setError("Please select a food to save!");
    }
};

  // TSX returned by the component
  return (
    <div className="search-food-page">
      <Header />
      {/* Renders the Header component */}
      {/* The following section is responsible for the search food functionality */}
      <div className="bg-img-food">
        {/* Container for the search food functionality */}
        <div className="search-food-container-wrapper">
          <div className="search-food-page-container">
            {/* Input section for searching food */}
            <div className="search-food-input-section">
              <h2 className="search-heading">Search {mealType} Food</h2>
              <div>
                {/* Input field for searching food */}
                <input
                  className='search-food-input'
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setError("");
                  }}
                  placeholder={`Search for ${mealType} food...`}
                />
                {/* Button to trigger the food search */}
                <button className='search-btn' onClick={searchFood}>Search</button>
              </div>
              {/* Display error messages */}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
  
            {/* Display search results */}
            <div className='search-food-result'>
              <h3>Search Results:</h3>
              <ul className='search-list'>
                {/* List of search results */}
                {searchResults.map((item, index) => (
                  <li className="search-item" key={index} onClick={() => handleClick(item)}>
                    {item.food_name}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Section for displaying selected food details */}
            <div className="search-food-save">
              {/* Display selected food details if a food is selected */}
              {selectedFood && (
                <div className='save-container'>
                  <div className='select-and-save'>
                    {/* Display selected food name and input for selecting quantity */}
                    <h3 className='selected-food'>Selected Food: {selectedFood.foodName.charAt(0).toUpperCase() + selectedFood.foodName.slice(1)}</h3>
                    <div className='select-qty-container'>
                      <h3>Select Serving size:</h3>
                      <input className='add-qty-input' name="quantity" value={selectedQuantity} type="number" placeholder='Add Quantity' onChange={handleQuantityChange} />
                    </div>
                    {/* Button to save the selected food */}
                    <button className='save-btn' onClick={handleSave}>Save</button>
                  </div>
                  {/* Display nutrition facts of the selected food */}
                  <div className='nutrition-facts'>
                    <h3>Nutrition facts:</h3>
                    <p>Serving size: {selectedFood.servingSize}gm</p>
                    <p>Calories: {selectedFood.calories}kcal</p>
                    <p>Carbs: {selectedFood.carbs}gm</p>
                    <p>Fat: {selectedFood.fat}gm</p>
                    <p>Protein: {selectedFood.protein}gm</p>
                    <p>Sodium: {selectedFood.sodium}gm</p>
                    <p>Sugar: {selectedFood.sodium}gm</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default SearchFood;
