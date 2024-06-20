import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Vista1 from "./pages/Vista1";
import Vista2 from "./pages/Vista2";
import Header from "./components/Header";

function App() {
  const [searchCountry, setSearchCountry] = useState("");

  return (
    <>
      <Header
        searchCountry={searchCountry}
        setSearchCountry={setSearchCountry}
        sx={{ backgroundColor: "gray" }}
      />
      <Routes>
        <Route path="/" element={"/"} />
        <Route path="/vista1" />
        <Route path="/vista2" />
      </Routes>
    </>
  );
}

export default App;
