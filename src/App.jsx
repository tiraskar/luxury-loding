import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Blog, Contact, Home, Listing } from "./pages";
import SharedLayout from "./pages/SharedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "listing", element: <Listing /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> }
      // add routes under / routing
    ]
  },
  // add more routes for different routing
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App;