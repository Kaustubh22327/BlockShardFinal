import './App.css';
import LandingPage from './components/Landingpage.component';
import {Routes, Route} from 'react-router';
import Redirect from './components/Redirect';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/redirect' element={<Redirect/>}></Route>
    </Routes>
    </>
  );
}

export default App;
