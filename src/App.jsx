import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RequireAuth from "./components/RequireAuth";
import AllNotes from "./pages/AllNotes";
import Layout from "./pages/Layout";
import MakeNote from "./pages/MakeNote";
import ErrorPage from "./pages/ErrorPage";
import EditNote from "./pages/EditNote";
import Note from "./pages/Note";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Provider } from "react-redux";

import { store } from "./redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/notes",
        element: (
          <RequireAuth>
            <AllNotes />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/create",
        element: (
          <RequireAuth>
            <MakeNote />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/edit/:id",
        element: (
          <RequireAuth>
            <EditNote />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/view/:id",
        element: (
          <RequireAuth>
            <Note />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
