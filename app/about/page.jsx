import NavBar from "@/components/NavBar";

export default function AboutPage() {
    return (
        <div>
            <NavBar />
            <div className="max-w-4xl mx-auto p-8">
              <div className="flex flex-col justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">What is lightRYM?</h1>
              </div>
        
              <p>
                lightRYM is a minimalist website designed to allow users to post simple reviews about their favourite music albums (light-rate-your-music). The "Home" page displays all the reviews currently posted, as well as the usernames of the people who posted them.
              </p>
              <br></br>
              <p>
                To use the website, click on "Register" in the navigation bar to create a new account, or "Login" to log into an existing account. Once you are logged in, you can visit the "My Reviews" page to begin adding your personal reviews.
              </p>
              <br></br>
              <p>
                Thank you for visiting, and I hope you enjoy using lightRYM. If you have any feedback or suggestions, please send them to me via the "Contact" page.
              </p>
            </div>
        </div>
    );
}