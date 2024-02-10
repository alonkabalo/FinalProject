import Page from "../../layouts/Page";
import './about.css'

export default function AboutPage() {

    return <div>

    <header>
        <h1>About Spotify Clone</h1>
    </header>

    <section>
        <h2>Welcome to our Spotify Clone!</h2>
        <p>
            Immerse yourself in the world of music with our user-friendly Spotify Clone. Discover new tracks, create playlists, and enjoy a personalized musical journey.
        </p>
    </section>

    <section>
        <h2>Features</h2>
        <p>
            Our platform offers seamless integration with the Spotify API, providing features like user authentication, track liking/unliking, playlist creation, song search, and category filtering.
        </p>
    </section>

    <section>
        <h2>Explore and Enjoy</h2>
        <p>
            Dive into a rich musical experience. Explore different genres, create playlists for every mood, and make your music journey truly yours.
        </p>
    </section>

    <footer>
        <p>
            Explore the full Spotify experience on the official <a
             className="link-spotify"
            href="https://www.spotify.com" target="_blank">Spotify website</a>.
        </p>
    </footer>
    </div>
}