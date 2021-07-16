# Marina API test App

![GitHub Pages](https://github.com/vulpemventures/marina-api-test-app/actions/workflows/gh-pages.yml/badge.svg)

Visit: https://vulpemventures.github.io/marina-api-test-app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Add a Marina test

you need to add a `Test` object to the `src/api-tests.ts` file.

```typescript
export interface Test {
  name: string; // test name
  function: TestFunction; // () => Promise<void> your test function
}
```

`TestFunction` needs to throw an error if the test fail and return if the test success.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
