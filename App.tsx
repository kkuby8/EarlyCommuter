/**
 * EarlyCommuter
 * https://github.com/kkuby8/EarlyCommuter
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '~/presentation/screens/HomeScreen';

import {mockFetch} from '~/mock/mockFetch';

function App(): React.JSX.Element {
  if (process.env.NODE_ENV === 'development') {
    global.fetch = mockFetch as any;
  }

  return <HomeScreen />;
}

export default App;
