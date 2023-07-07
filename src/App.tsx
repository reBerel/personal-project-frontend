import React from 'react';
import MainRouter from './router/MainRouter';
import NavigationBar from './navigation/NavigationBar'
import NavigatonBottomBar from './navigation/NavigatonBottomBar'
const App: React.FC = () =>{
  return (
    <div>
        <NavigationBar/>
        <MainRouter/>
        <NavigatonBottomBar/>
    </div>
  );
}

export default App;
