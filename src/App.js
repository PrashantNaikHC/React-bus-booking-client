import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProviderContainer from "./components/ProviderContainer/ProviderContainer";
import ProviderServices from "./components/ProviderServices/ProviderServices";

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<ProviderContainer />}></Route>
          </Routes>
        </main>
        <main>
          <Routes>
            <Route path='/services' element={<ProviderServices />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
