import "./App.css";
import { useTourGuideContainer } from "../lib/useTourGuide";
import { Link, Outlet } from "react-router";

function App() {
  const steps = [
    {
      id: "step-1",
      title: "step-1",
      description: "step-1 description",
      isVisited: false,
    },
    {
      id: "step-2",
      title: "step-2",
      description: "step-2 description",
      isVisited: false,
    },
    {
      id: "step-3",
      title: "step-3",
      description: "step-3 description",
      isVisited: false,
    },
  ];

  useTourGuideContainer({
    doneBtnTitle: "done",
    nextBtnTitle: "next",
    prevBtnTitle: "prev",
    steps: steps,
  });
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/content">Content</Link>
        <Link to="/post">Posts</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
