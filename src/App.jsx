import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home'
import Vedio from './pages/Vedio/Vedio'
import { useState } from 'react';
function App() {

  const [sidebar, setsidebar] = useState(true);

  return (
      <>
      <Router>
      <Navbar setsidebar={setsidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar = {sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Vedio />} />
      </Routes>
    </Router>
      </>
  )
}

export default App
