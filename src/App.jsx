import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Blog,
  BlogAndGuideBook,
  BookingConfirmation,
  BookingPayment,
  Contact,
  Home,
  Listings,
  SharedLayout,
  SingleBlogGuide,
  SingleListing,
  Success
} from "./pages";
import BookingListing from "./pages/BookingListing";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Routing
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
        element: <Blog />,
      },
      {
        path: "listings",
        element: <Listings />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog/guidebook",
        element: <BlogAndGuideBook />,
      },
      {
        path: "/blog/guidebook/:id",
        element: <SingleBlogGuide />,
      },
      {
        path: "/listings/:id",
        element: <SingleListing />,
      },
      {
        path: "/listing/:id/booking",
        element: <BookingPayment />,
        children: [
          {
            path: "",
            element: <BookingListing />,
          },
          {
            path: "payment",
            element: <BookingConfirmation />,
          },
          {
            path: "success",
            element: <Success />
          },
        ]

      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>
      },
      // add routes under / routing
    ],
  },
  // add more routes for different routing
]);

function App() {
  return (
    <main className="remove-scrollbar scroll-smooth">
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </main>
  );
}

export default App;
