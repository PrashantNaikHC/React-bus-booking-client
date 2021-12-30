import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProviderContainer from "./components/ProviderContainer/ProviderContainer";

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
      </div>
    </div>
  );
}

export default App;
