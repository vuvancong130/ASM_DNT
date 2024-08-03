/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/screens/HomeStack';
import {name as appName} from './app.json';
import {playbackService} from './src/screens/ListTrack';
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);
