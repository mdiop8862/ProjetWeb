import logo from './logo.svg';
import './App.css';
import Test from './Component/Test.js'
import { getApps } from 'firebase/app';
import { app } from './firebase';
if (getApps.length < 1){
  app()
}
function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
