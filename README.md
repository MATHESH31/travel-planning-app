# Travel Planning App

**Overview:**

The Travel Planning App is a React-based web application that helps users find travel destinations based on their mood. The app uses the Google Gemini API to generate travel recommendations and the Unsplash API to fetch images for the suggested destinations.

**File Structure:**

*   `Dockerfile`: Configuration for building a Docker image.
*   `README.md`: General project information (this file).
*   `eslint.config.js`: ESLint configuration file for code linting.
*   `firebase.json`: Configuration for Firebase deployment (if using Firebase).
*   `index.html`: Main HTML file for the React app.
*   `nginx.conf`: Nginx configuration (likely for deployment).
*   `package-lock.json`: Records exact versions of dependencies.
*   `package.json`: Project metadata, dependencies, and scripts.
*   `vite.config.js`: Vite build tool configuration.
*   `.idx/`: directory for internal configuration files.
    *   `dev.nix`: Environment configuration file.
    *   `icon.png`: icon for the app.
    *   `integrations.json`: Integrations configuration file.
*   `public/`: contains the `vite.svg` icon.
    *   `vite.svg`: Vite logo
*   `src/`: Source code directory.
    *   `App.css`: Styles for the main App component.
    *   `App.jsx`: Main App component, the root of the application.
    *   `index.css`: Global styles.
    *   `main.jsx`: Entry point for the React application.
    *   `assets/`: Directory for static assets.
        *   `airplane.png`: An airplane icon.
    *   `components/`: Reusable UI components.
        *   `ContentCard.jsx`: Displays information about a travel destination.
        *   `InputField.jsx`: Input field to capture the user's mood.

**Components:**

1.  **`App.jsx`**:
    *   **Purpose:** The main component that orchestrates the entire application. It manages state, fetches data, and renders other components.
    *   **State:**
        *   `places`: An array of travel destination objects.
        *   `isLoading`: A boolean indicating whether data is being fetched.
    *   **Functionality:**
        *   Renders the `InputField` and `ContentCard` components.
        *   Displays a loading indicator (`CircularProgress`) when data is being fetched.
        *   Maps through the `places` array and renders a `ContentCard` for each place.
    * **Styling:** uses Grid and Container component from material UI.

2.  **`InputField.jsx`**:
    *   **Purpose:** Allows the user to enter their mood and trigger the search for travel destinations.
    *   **State:**
        *   `mood`: The user's entered mood.
    *   **Functionality:**
        *   Has an input field where the user enters their mood.
        *   Has a button to initiate the search for places (`handleClick`).
        *   `getPlaces` function that communicates with Gemini API to generate an array of travel destinations based on the mood and then for each place fetches an image using the unsplash API.
        *   Updates the places array, and changes the loading state in the App component.

3.  **`ContentCard.jsx`**:
    *   **Purpose:** Displays information about a specific travel destination.
    *   **Props:**
        *   `place`: An object containing the travel destination details (place, bestTime, currentClimate, budget, imageUrl).
    *   **Functionality:**
        *   Renders a `Card` with the destination's image and details.
        *   Uses a `Table` to display the destination's properties.

**Data Flow:**

1.  The user enters their mood in `InputField` and clicks "Find places".
2.  The `InputField` component triggers the `getPlaces` function.
3.  `getPlaces` uses the Google Gemini API to generate a list of places.
4.  `getPlaces` uses the Unsplash API to fetch an image for each place.
5.  The `InputField` updates the `places` state in the `App` component with the new list of places.
6.  The `App` component re-renders and displays the new `ContentCard` components.