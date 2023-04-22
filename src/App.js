import CarDetails from "./component/CarDetails";
import DisplayData from "./component/DisplayData";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayData />} />
      </Routes>
    </Router>
  );
}

export default App;
