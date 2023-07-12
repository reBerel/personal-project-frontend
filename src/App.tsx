import React, { useEffect } from 'react';
import MainRouter from './router/MainRouter';
import NavigationBar from './navigation/NavigationBar'
import NavigatonBottomBar from './navigation/NavigatonBottomBar'
import { firestore } from "./firebase";
const App: React.FC = () =>{
  useEffect(() => {
    console.log(firestore)
  })
  return (
    
    <div>
    <div style={{position: 'relative', minHeight: 100}}>
        <NavigationBar/>
        <MainRouter/>
  
    </div>
    <div>
    <NavigatonBottomBar/>
    </div>;
    </div>
  );
}

export default App;
