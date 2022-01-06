import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProviderContainer from "./components/ProviderContainer/ProviderContainer";
import ProviderServices from "./components/ProviderServices/ProviderServices";
import store from "./store";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BookingStatus from "./components/BookingStatus/BookingStatus";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: red[200],
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
            <main>
              <Routes>
                <Route path="/bookings" element={<BookingStatus />}></Route>
              </Routes>
            </main>
          </div>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
