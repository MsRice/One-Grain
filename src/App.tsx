import { Route, Routes } from 'react-router-dom';
import HomeLayout from './components/layout/HomeLayout';
import Home from './components/layout/Home';
import Register from './components/layout/Register';
import Metrics from './components/layout/Metrics';
import Completed from './components/layout/Completed';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='login/:register' element={<Register />} />
        <Route path='completed' element={<Completed />} />
        <Route path='metrics' element={<Metrics />} />

    
      </Route>
    </Routes>
  );
}

export default App;
