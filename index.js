/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/components/App.js';
//import {SafeAreaView} from 'react-navigation';
// import App from './App.js';
import {name as appName} from './app.json';
// SafeAreaView.setStatusBarHeight(0);
AppRegistry.registerComponent(appName, () => App);
