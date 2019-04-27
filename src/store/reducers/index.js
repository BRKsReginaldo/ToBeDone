import { camelCase } from 'lodash';

const req = require.context('./', true, /^\.\/.*\.js$/);

const reducers = req.keys().reduce((result, file) => {
    if (file !== './index.js') {
        // here we are requiring the content of the reducer
        const reducer = req(file).default;
        // here we split the file name on each path /
        const fileParts = file.split('/');
        // here we get the reducer name without extension
        const reducerName = fileParts[fileParts.length - 1].replace('.js', '');

        // here we are adding the reducer to the reducers array
        result[camelCase(reducerName)] = reducer;
    }

    return result;
}, {});

export default reducers;
