import './App.css';
import LandingPage from './components/Landingpage.component';
import {Routes, Route} from 'react-router';
import Redirect from './components/Redirect';
import Navbar from './components/Navbar/Navbar';
import Contact from './components/Contact';
function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/redirect' element={<Redirect/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
    </Routes>
    </>
  );
}

export default App;
