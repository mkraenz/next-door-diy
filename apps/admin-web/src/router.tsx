import { createBrowserRouter } from "react-router-dom";
import Test from "./test/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    errorElement: <p>Oops, that shouldn't have happened.</p>,
  },
  {
    path: "/calendar",
    element: <p>Example</p>,
  },
]);
