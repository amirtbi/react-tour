import { useEffect, useRef } from "react";
import { useTourGuide } from "../lib/useTourGuide";

export const Posts = () => {
  const paraRef2 = useRef<HTMLDivElement | null>(null);
  const paraRef3 = useRef<HTMLDivElement | null>(null);

  const { registerSteps } = useTourGuide("POSTS");

  useEffect(() => {
    if (paraRef2.current && paraRef3.current) {
      registerSteps([
        { stepId: "step-2", element: paraRef2.current },
        { stepId: "step-3", element: paraRef3.current },
      ]);
    }
  }, [registerSteps]);

  return (
    <>
      <div style={{ display: "flex", padding: "2rem" }}>
        <div style={{ border: "2px dashed black" }} ref={paraRef2}>
          <h1>POSTS</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis id
            error expedita, quis, non cum voluptate autem sunt architecto
            reprehenderit deserunt nostrum maiores mollitia nisi, nemo sint?
            Laborum, in dolor.
          </p>
        </div>
        <div
          style={{ border: "2px dashed black", marginTop: "10px" }}
          ref={paraRef3}
        >
          <h1>POSTS2</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis id
            error expedita, quis, non cum voluptate autem sunt architecto
            reprehenderit deserunt nostrum maiores mollitia nisi, nemo sint?
            Laborum, in dolor.
          </p>
        </div>
      </div>
    </>
  );
};
