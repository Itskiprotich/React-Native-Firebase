import React from 'react';
import {StatusBar} from 'react-native';
import UploadScreen from './src/screens/upload';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <UploadScreen />
    </>
  );
};
export default App;
