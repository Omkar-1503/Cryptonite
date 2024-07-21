<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptonite</title>
</head>
<body>
    <h1>Cryptonite</h1>
    <p>Cryptonite is a comprehensive web application that provides users with detailed information on various cryptocurrencies. It allows users to explore different coins, view detailed price charts, and maintain a personalized watchlist for quick access to their favorite coins. Built with Next.js and Tailwind CSS, Cryptonite is designed to be fast, responsive, and user-friendly.</p>

    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#technologies-used">Technologies Used</a></li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>

    <h2 id="features">Features</h2>
    <ul>
        <li><strong>Explore Cryptocurrencies:</strong> Browse through a wide range of cryptocurrencies with detailed information.</li>
        <li><strong>Price Charts:</strong> View historical price charts for each cryptocurrency.</li>
        <li><strong>Watchlist:</strong> Maintain a personalized watchlist for easy access to your favorite coins.</li>
        <li><strong>Dark Mode:</strong> Switch between light and dark themes for better user experience.</li>
        <li><strong>Search Functionality:</strong> Quickly find the cryptocurrency you are looking for.</li>
    </ul>

    <h2 id="technologies-used">Technologies Used</h2>
    <ul>
        <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS</li>
        <li><strong>State Management:</strong> Redux Toolkit</li>
        <li><strong>Data Fetching:</strong> CoinGecko API</li>
        <li><strong>Charting:</strong> Chart.js</li>
        <li><strong>Hosting:</strong> Netlify</li>
    </ul>

    <h2 id="getting-started">Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js (v14 or later)</li>
        <li>npm or yarn</li>
    </ul>

    <h3>Installation</h3>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/your-username/cryptonite.git
cd cryptonite</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>npm install
# or
yarn install</code></pre>
        </li>
        <li>Create a <code>.env.local</code> file in the root directory and add your CoinGecko API key:
            <pre><code>NEXT_PUBLIC_COINGECKO_API_KEY=your-coingecko-api-key</code></pre>
        </li>
        <li>Run the development server:
            <pre><code>npm run dev
# or
yarn dev</code></pre>
        </li>
        <li>Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.</li>
    </ol>

    <h2 id="usage">Usage</h2>
    <h3>Exploring Cryptocurrencies</h3>
    <ol>
        <li>Navigate to the <strong>Explore</strong> page from the navbar.</li>
        <li>Browse through the list of available cryptocurrencies.</li>
        <li>Click on a coin card to view detailed information, including a description, current price, and a price chart.</li>
    </ol>

    <h3>Adding Coins to Watchlist</h3>
    <ol>
        <li>On the <strong>Explore</strong> page, click the star button on any coin card to add it to your watchlist.</li>
        <li>Navigate to the <strong>Watchlist</strong> page from the navbar to view your selected coins.</li>
        <li>Remove coins from your watchlist by clicking the "Remove" button on the coin card.</li>
    </ol>

    <h3>Dark Mode</h3>
    <ol>
        <li>Toggle the theme switcher in the navbar to switch between light and dark modes.</li>
        <li>The selected theme is applied across all pages for a consistent user experience.</li>
    </ol>

    <h3>Search Functionality</h3>
    <ol>
        <li>Use the search bar in the navbar to find specific cryptocurrencies.</li>
        <li>Suggestions will appear as you type, allowing for quick and efficient searches.</li>
    </ol>

    <h2 id="screenshots">Screenshots</h2>
    <h3>Home Page</h3>
    <img src="screenshots/home.png" alt="Home Page">

    <h3>Explore Page</h3>
    <img src="screenshots/explore.png" alt="Explore Page">

    <h3>Watchlist Page</h3>
    <img src="screenshots/watchlist.png" alt="Watchlist Page">

    <h2 id="contributing">Contributing</h2>
    <p>Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are <strong>greatly appreciated</strong>.</p>
    <ol>
        <li>Fork the project.</li>
        <li>Create your feature branch: <code>git checkout -b feature/your-feature</code>.</li>
        <li>Commit your changes: <code>git commit -m 'Add some feature'</code>.</li>
        <li>Push to the branch: <code>git push origin feature/your-feature</code>.</li>
        <li>Open a pull request.</li>
    </ol>

    <h2 id="license">License</h2>
    <p>Distributed under the MIT License. See <code>LICENSE</code> for more information.</p>

    <hr>
    <p>Thank you for checking out Cryptonite! If you have any questions or feedback, please feel free to reach out.</p>
</body>
</html>
