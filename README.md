  Cryptonite

Cryptonite
==========

Cryptonite is a comprehensive web application that provides users with detailed information on various cryptocurrencies. It allows users to explore different coins, view detailed price charts, and maintain a personalized watchlist for quick access to their favorite coins. Built with Next.js and Tailwind CSS, Cryptonite is designed to be fast, responsive, and user-friendly.

Table of Contents
-----------------

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
*   [Usage](#usage)
*   [Screenshots](#screenshots)
*   [Contributing](#contributing)
*   [License](#license)

Features
--------

*   **Explore Cryptocurrencies:** Browse through a wide range of cryptocurrencies with detailed information.
*   **Price Charts:** View historical price charts for each cryptocurrency.
*   **Watchlist:** Maintain a personalized watchlist for easy access to your favorite coins.
*   **Dark Mode:** Switch between light and dark themes for better user experience.
*   **Search Functionality:** Quickly find the cryptocurrency you are looking for.

Technologies Used
-----------------

*   **Frontend:** Next.js, React, Tailwind CSS
*   **State Management:** Redux Toolkit
*   **Data Fetching:** CoinGecko API
*   **Charting:** Chart.js
*   **Hosting:** Netlify

Getting Started
---------------

### Prerequisites

*   Node.js (v14 or later)
*   npm or yarn

### Installation

1.  Clone the repository:
    
        git clone https://github.com/your-username/cryptonite.git
        cd cryptonite
    
2.  Install dependencies:
    
        npm install
        # or
        yarn install
    
3.  Create a `.env.local` file in the root directory and add your CoinGecko API key:
    
        NEXT_PUBLIC_COINGECKO_API_KEY=your-coingecko-api-key
    
4.  Run the development server:
    
        npm run dev
        # or
        yarn dev
    
5.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Usage
-----

### Exploring Cryptocurrencies

1.  Navigate to the **Explore** page from the navbar.
2.  Browse through the list of available cryptocurrencies.
3.  Click on a coin card to view detailed information, including a description, current price, and a price chart.

### Adding Coins to Watchlist

1.  On the **Explore** page, click the star button on any coin card to add it to your watchlist.
2.  Navigate to the **Watchlist** page from the navbar to view your selected coins.
3.  Remove coins from your watchlist by clicking the "Remove" button on the coin card.

### Dark Mode

1.  Toggle the theme switcher in the navbar to switch between light and dark modes.
2.  The selected theme is applied across all pages for a consistent user experience.

### Search Functionality

1.  Use the search bar in the navbar to find specific cryptocurrencies.
2.  Suggestions will appear as you type, allowing for quick and efficient searches.


Contributing
------------

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the project.
2.  Create your feature branch: `git checkout -b feature/your-feature`.
3.  Commit your changes: `git commit -m 'Add some feature'`.
4.  Push to the branch: `git push origin feature/your-feature`.
5.  Open a pull request.

