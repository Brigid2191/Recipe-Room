// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';


const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      
    </Route>
  </Routes>
);

export default App;

