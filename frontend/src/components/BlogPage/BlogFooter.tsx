// Importing the styles for the BlogFooter component
import "../LandingPage/Landing.scss"

// BlogFooter component definition
function BlogFooter() {
    return (
        <div>
            {/* Footer section with copyright information and social icons */}
            <footer className="footer">
                <p className="certificate">©2023 Health360, Inc.</p>
                <div className="social">
                    <img className="icon" src={process.env.PUBLIC_URL + "/instagram.png"} alt="icon"></img>
                    <img className="icon" src={process.env.PUBLIC_URL + "/facebook.png"} alt="icon"></img>
                    <img className="icon" src={process.env.PUBLIC_URL + "/twitterx.png"} alt="icon"></img>
                    <img className="icon" src={process.env.PUBLIC_URL + "/reddit.png"} alt="icon"></img>
                </div>
            </footer>
        </div>
    );
}

// Exporting the BlogFooter component
export default BlogFooter;
