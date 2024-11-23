import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
            <header className="page-header">
                <p>
                THE CROSSEDWORD
                </p>
            </header>

            <main className="page-main">
                <div className="subtitle">
                <p>
                    Missing a word!
                    Missing a word!
                    Missing a word!
                </p>
                </div>
                <div classname="front-body">
                <p>
                    Display any missing words from your crossword for your low IQ family members to guess.
                </p>
                <button>
                    <Link to="/details">
                    GET STARTED
                    </Link>
                </button>
                </div>
            </main>
        </div>
    );
}

export default Home;