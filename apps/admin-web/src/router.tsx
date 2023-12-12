import { createBrowserRouter } from "react-router-dom";
import AuthenticatedApp from "./auth/AuthenticatedApp";
import Calendar from "./calendar/Calendar";
import Test from "./test/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedApp>
        <Test />
      </AuthenticatedApp>
    ),
    errorElement: <p>Oops, that shouldn't have happened.</p>,
  },
  {
    path: "/calendar",
    element: (
      <AuthenticatedApp>
        <Calendar />
      </AuthenticatedApp>
    ),
  },
]);
