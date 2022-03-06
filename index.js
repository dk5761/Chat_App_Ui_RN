/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createTable} from './src/database/db';

createTable();

AppRegistry.registerComponent(appName, () => App);
