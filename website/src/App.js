import { Route, Routes } from "react-router";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import SharedMe from "./pages/SharedMe";
import SummaryPage from "./pages/SummaryPage";
import UploadPage from "./pages/UploadPage";
import Notebook from "./pages/Notebook";
import EditableTextField from "./pages/EditableTextField";
import { AppContext } from "./context";
import { useContext } from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MySummary from "./pages/MySummary";

function App() {
  return (
    // px-3 lg:px-2 lg:py-2 xl:max-w-[1300px] w-full mx-auto
    <>
    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path="/mysummary" element={<MySummary/>}/>
            <Route path='/account' element={<ProtectedRoutes><Account/></ProtectedRoutes>}/>
            <Route path='/summarypage' element={<SummaryPage/>}/>
            <Route path='/analytics' element={<Analytics/>}/>
            <Route path='/upload' element={<UploadPage/>}/>
            <Route path='/summary' element={<SummaryPage/>}/>
            <Route path='/notebook' element={<Notebook/>}/>
            <Route path='/sharedwithme' element={<SharedMe/>}/>
            <Route path='/edit' element={<EditableTextField/>}/>
        </Routes>
    </div>

    </>
  
  );
}

export default App;
