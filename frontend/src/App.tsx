import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Appbar from './Components/Appbar'

function App() {
  return (
    <> 
      <Appbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
