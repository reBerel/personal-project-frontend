import React from 'react';
import MainRouter from './router/MainRouter';
import NavigationBar from './navigation/NavigationBar'

const App: React.FC = () =>{
  return (
    <div>
        <NavigationBar/>
        <MainRouter/>
    </div>
  );
}

export default App;
