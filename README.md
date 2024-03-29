This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project has been deployed to the following Github page: https://shiraze.github.io/react-tictactoe/

## React tutorial
After bootstapping, the tasks on https://reactjs.org/tutorial/tutorial.html were then followed.
I've also implemented code for the following items from the **Wrapping up** section:

1. Display the location for each move in the format (col, row) in the move history list.
1. Bold the currently selected item in the move list.
1. ~~Rewrite Board to use two loops to make the squares instead of hardcoding them.~~
1. Add a toggle button that lets you sort the moves in either ascending or descending order.
1. When someone wins, highlight the three squares that caused the win.
1. When no one wins, display a message about the result being a draw.

## Material design
Layout has also been updated to make use of Material-UI, https://material-ui.com/.
I don't like the 'fudge' that places a separator between AppBar and Page, and I would like to have a Tic-Tac-Toe board that is centralised and makes use of
available space, with a minimum size set to the size currently shown.

## Using Redux
React-Redux is used to share state between the ``Game`` and ``Header`` components, after the header section was removed from the game component hierarchy.
It's worth noting that the ``Header`` component referenced in the ``Game`` definition is NOT the ```React.Component``` but is the exported result of the ```connect()```
call at the end of the *Header.js* file

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
