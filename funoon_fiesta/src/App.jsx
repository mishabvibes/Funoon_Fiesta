import Home from "./Pages/Home"
import CursorAnimation from "./Components/Cursor/CursorAnimation";
import NavBar from "./Components/Header/NavBar";
import { ProtectedRoute } from "./Components/AdminLogin/AdminLogin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Pages/Result'
import Login from "./Pages/Login";
import PosterPage from "./Components/Result/PosterPage";
import AddResult from "./Pages/AddResult";
import CartPage from "./Pages/CartPage";
import ScoreTable from "./Pages/ScoreTable";

function App() {

  return (
    <>
          <BrowserRouter>
            <CursorAnimation />
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path='/result' element={<Result />} />
              <Route path="/poster/:programName" element={<PosterPage />} />
              <Route path='/scoretable' element={<ScoreTable />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/addresult' element={<AddResult />} />
                <Route path='/cart' element={<CartPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
