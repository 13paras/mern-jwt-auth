import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function Home() {
  return <div className="h-screen">Hey Bro</div>;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
