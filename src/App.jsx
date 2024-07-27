import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Blog, Contact, Home, Listing, BlogAndGuideBook } from "./pages";
import SharedLayout from "./pages/SharedLayout";
import SingleBlogGuide from "./pages/components/SingleBlogguide";

//routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "listing",
        element: <Listing />
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "home/blog-and-guidebook",
        element: <BlogAndGuideBook />
      },
      {
        path: "/single-blog-guide",
        element: <SingleBlogGuide />
      }
      // add routes under / routing
    ]
  },
  // add more routes for different routing
]);


function App() {
  return (
    <main className="remove-scrollbar">
      <RouterProvider router={router} />
    </main>
  );
}


export default App;