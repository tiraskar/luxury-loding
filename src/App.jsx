import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Blog, Contact, Home, BlogAndGuideBook } from "./pages";
import SharedLayout from "./pages/SharedLayout";
import SingleBlogGuide from "./pages/components/SingleBlogguide";
import SingleListingView from "./pages/components/SingleListingView";
import Listings from "./pages/Listings";
import BookingListing from "./components/BookingListing";

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
        element: <Listings />
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
      },
      {
        path: "/listing/single-listing",
        element: <SingleListingView />
      },
      {
        path: "booking-listing",
        element: <BookingListing />
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>
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