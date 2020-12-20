import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { SubSink } from "subsink";
import "./App.css";
import NumberGrid from "./components/NumberGrid";
import { keyDown$, keyUp$ } from "./interactions";

function App() {
  const [keyPressed, setKeyPressed] = useState<string | null>();

  useEffect(() => {
    const subSink = new SubSink();

    subSink.sink = keyDown$.subscribe(({ key }) => {
      setKeyPressed(key);
    });

    subSink.sink = keyUp$.subscribe(() => {
      setKeyPressed(null);
    });

    return () => {
      subSink.unsubscribe();
    };
  }, []);
  return (
    <div>
      <Tag color={keyPressed === "o" ? "processing" : "default"}>
        Draw Obstacle
      </Tag>
      <Tag color={keyPressed === "s" ? "processing" : "default"}>
        Draw Start
      </Tag>
      <Tag color={keyPressed === "e" ? "processing" : "default"}>Draw End</Tag>
      <NumberGrid />
    </div>
  );
}

export default App;
