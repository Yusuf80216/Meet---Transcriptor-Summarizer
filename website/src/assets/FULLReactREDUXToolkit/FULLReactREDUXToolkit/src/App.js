import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import store from "./store/store";

function App() {
  return (
    <div className="App bg-[#EAEDED]">
        {/* STEP3 of REDUX TOOLKIT */}
        <Provider store={store}>
          <BrowserRouter>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/cart" element={<Cart/>}/>
              </Routes>
          </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
