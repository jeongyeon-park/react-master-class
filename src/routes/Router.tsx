import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

interface IRouterProps{
  toggleDark: () => void;
  isDark: boolean;
}

function Router(){  
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/:coinId/*" element={<Coin/>} />
      <Route path="/" element={<Coins />} />
    </Routes>
  </BrowserRouter>
  );
  
}

export default Router;