import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Unlock from "./pages/Unlock";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/unlock" element={<Unlock />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;