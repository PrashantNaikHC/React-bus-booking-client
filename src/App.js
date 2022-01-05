import { Provider } from "react-redux";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProviderContainer from "./components/ProviderContainer/ProviderContainer";
import ProviderServices from "./components/ProviderServices/ProviderServices";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<ProviderContainer />}></Route>
            </Routes>
          </main>
          <main>
            <Routes>
              <Route path="/services" element={<ProviderServices />}></Route>
            </Routes>
          </main>
        </div>
      </Provider>
    </div>
  );
}

export default App;
