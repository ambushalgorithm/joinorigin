/**
 * React Native JS-side entry point.
 * Native iOS/Android projects are intentionally deferred to a later sprint;
 * this app is consumed by RN tooling (Metro, Jest) as JS-only.
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
