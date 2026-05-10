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
                lightRYM is a minimalist website designed to allow users to post simple reviews about their favourite music albums (light-rate-your-music). It is built using React and NextJS, and implements a simple, yet complete RESTful API.
              </p>
              <br></br>
              <p>
                Behind the scenes, it utilizes MongoDB's cloud service to host and access the database, and SendGrid's cloud service to facilitate the transmission of feedback via email through the Contact page.
              </p>
            </div>
        </div>
    );
}