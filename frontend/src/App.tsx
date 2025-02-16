import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Main from './screens/Main/Main';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Main />} path='/main' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
