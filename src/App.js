import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProviderContainer from "./components/ProviderContainer/ProviderContainer";
import ServiceProviderTile from "./components/ServiceProviderTile/ServiceProviderTile";

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <ProviderContainer />
      </div>
    </div>
  );
}

export default App;
