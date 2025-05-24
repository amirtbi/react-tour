import { useEffect, useRef } from "react";
import { useTourGuide } from "../lib/useTourGuide";

export const Content = () => {
  const paraRef = useRef<HTMLDivElement | null>(null);
  const { registerSteps } = useTourGuide("CONTENT");

  useEffect(() => {
    if (paraRef.current) {
      registerSteps([{ stepId: "step-1", element: paraRef.current }]);
    }
  }, [registerSteps]);
  return (
    <>
      <div style={{ display: "flex", padding: "2rem" }}>
        <div style={{ border: "2px dashed black" }} ref={paraRef}>
          <h1>Content</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            aspernatur accusantium architecto impedit numquam animi
            exercitationem, optio explicabo ab earum nihil in at harum iure
            consequuntur deserunt dolorum temporibus voluptas?
          </p>
        </div>
      </div>
    </>
  );
};
