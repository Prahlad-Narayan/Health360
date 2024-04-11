// Importing styles for the component
import "./Landing.scss"

// Review component to display customer reviews
const Review = () => {
    return ( 
        <div>
            {/* Section for overall rating statistics */}
            <div className="rating">
                {/* Star rating image */}
                <img className= "starrating" src={process.env.PUBLIC_URL + "/starrating.png"}></img>
                {/* Text displaying the number of 5-star reviews */}
                <p className="rating-stat">2 Million 5-Star Reviews</p>
            </div>

            {/* List to display individual reviews */}
            <ul className="reviews">
                {/* Individual review item */}
                <li>
                    {/* User image and name */}
                    <div className="image">
                        <img src={process.env.PUBLIC_URL + "/John.png"} alt="user" className="user"/>
                        <p>Omar Siphron</p>
                    </div>
                    {/* Review text */}
                    <p>Not only are the tools super helpful, the customer service is insanely awesome!</p>
                </li>

                {/* Another individual review item */}
                <li>
                    <div className="image">
                        <img src={process.env.PUBLIC_URL + "/Kaiya.png"} alt="user" className="user"/>
                        <p>Kaiya Lubin</p>
                    </div>
                    <p>Love this app. It keeps me on track with my nutritional goals.</p>
                </li>

                {/* Another individual review item */}
                <li>
                    <div className="image">
                        <img src={process.env.PUBLIC_URL + "/Erin.png"} alt="user" className="user"/>
                        <p>Erin Septimus</p>
                    </div>
                    <p>Friendly, easy-to-use app that keeps me accountable.</p>
                </li>

                {/* Another individual review item */}
                <li>
                    <div className="image">
                        <img src={process.env.PUBLIC_URL + "/Cristofer.png"} alt="user" className="user"/>
                        <p>Omar Siphron</p>
                    </div>
                    <p>Helped me get moving on my goals and tracking my weight loss and bodybuilding.</p>
                </li>
            </ul>
        </div>
    )
}

// Exporting the Review component
export default Review;
