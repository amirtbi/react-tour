import { BrowserRouter, Route } from "react-router";
import { Content } from "./Content";
import { Posts } from "./Posts";
import { Routes } from "react-router";
import App from "./App";
import { Home } from "./Home";

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/content" element={<Content />} />
            <Route path="/post" element={<Posts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
