# Features

- Well-designed URL patterns for SEO (readable and shareable)
- Accessibility
- Bubble chart: bouncing balls with custom and adjustable physics
- Snappy interface
- Interactive, responsive and accessible modal for collection details
- Wave chart graph for collection details **(not yet)**
- Filters **(not yet)**
- Pagination **(not yet)**
- Responsive tables/lists for collections **(not yet)**
- Highlighted bubbles with different gravity **(not yet)**
- Watchlist **(not yet)**

# Pages

- Home (bubble chart)
  - Bubble chart
  - Filter **(not yet)**
  - Pagination **(not yet)**
  - Responsive lists for collections **(not yet)**
- Upcoming
  - Bubble chart
  - Responsive lists for collections **(not yet)**
- Contact
  - Text

# Future implementations

- Styling according to design
- More focus on SEO ranking (server-side rendered content?)

## API endpoints needed:

- `GET` for bubbles on the home page with params for pagination and filters (top 100, 1D, 1W, 1M, 1Y) **(not yet)**
- `GET` for bubbles on the upcoming page **(not yet)**
- `GET` for table on the home page with param for search **(not yet)**
- `GET` for table on the upcoming page with param for search **(not yet)**
- `GET` for popup graph with param for filters (1D, 1W, 1M, 1Y) **(not yet)**

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
