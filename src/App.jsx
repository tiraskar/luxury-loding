import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Blog, BlogAndGuideBook, BookingConfirmation, Contact, Home, Listings, SharedLayout, SingleBlogGuide, SingleListing } from "./pages";
import BookingListing from "./pages/BookingListing";

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
        path: "blogs",
        element: <Blog />
      },
      {
        path: "listings",
        element: <Listings />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "blog/guidebook",
        element: <BlogAndGuideBook />
      },
      {
        path: "/blog/guidebook/:id",
        element: <SingleBlogGuide />
      },
      {
        path: "/listing/:id",
        element: <SingleListing />
      },
      {
        path: "listing/:id/booking",
        element: <BookingListing />
      },
      {
        path: "listing/:id/booking-confirm",
        element: <BookingConfirmation />
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
    <main className="remove-scrollbar  scroll-smooth">
      <RouterProvider router={router} />
    </main>
  );
}


export default App;