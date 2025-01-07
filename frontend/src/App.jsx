import { Route, Routes } from "react-router-dom";

function Home() {
  return <div className="h-screen">Hey Bro</div>;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
export default App;
