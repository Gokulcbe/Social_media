import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import Signup from './Login/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileDetails from './Login/ProfileDetails';
import Feed from './Home/Feed';
import { Provider } from "react-redux";
import store from "./Redux/reduxStore.js";
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
    <div className="App" >
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/profiledetails" element={<ProfileDetails/>}></Route>
        <Route path="/feed" element={<Home/>}></Route>
        <Route path="message" element={<Home/>}></Route>
        <Route path="/addpost" element={<Home/>}></Route>
        <Route path="/profile" element={<Home/>}></Route>
        <Route path="/search" element={<Home/>}></Route>
        <Route path="/feedback" element={<Home/>}></Route>
      </Routes>
    </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
