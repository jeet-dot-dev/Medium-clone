import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
