import { Route, Routes } from 'react-router-dom';
import HomeLayout from './components/layout/HomeLayout';
import Home from './components/layout/Home';
import Register from './components/layout/Register';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='login/:register' element={<Register />} />

    
      </Route>
    </Routes>
  );
}

export default App;
