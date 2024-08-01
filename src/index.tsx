import React from "react";
import ReactDOM from "react-dom/client";
import { WeekView } from "./WeekView";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WeekView />
  </React.StrictMode>
);
