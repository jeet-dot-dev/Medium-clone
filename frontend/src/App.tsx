import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
