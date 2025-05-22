import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import TermsAndCondition from "./pages/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import { PaymentSuccess } from "./components";
import NotFoundPage from "./pages/PageNotFound";

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
            index: true,
            element: <Navigate to="payment" replace />,
          },
          {
            path: "payment",
            element: <BookingConfirmation />,
          },
        ]
      },
      {
        path: "/listing/:id/success",
        element: <PaymentSuccess />
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "*",
        element: <NotFoundPage />
      },
      // add routes under / routing
    ],
  },
],
  {
    basename: '/',
  }
);

function App() {
  return (
    <main className="remove-scrollbar scroll-smooth">
      <ToastContainer />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </main>
  );
}

export default App;
