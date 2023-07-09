This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Some considerations for future iterations

Performance

The list of images could potentially be infinite. As the list gets larger, the amount of dom nodes present will be an issue.

A tool such as [react-window](https://github.com/bvaughn/react-window) could be leveraged to ensure that only the components that are present in the view are on display.

Testing

At present, there are no tests. React-testing-library is the best candidate for testing components such as the InfiniteLoader.

Storybook / Ladle

My first iteration included storybook - as a means to show the possibilities of using the component (i.e. using multiple apis, different renderContent calls etc.)
