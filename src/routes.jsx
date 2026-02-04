import App from "./App";
import DefaultHomeElement from './DefaultHomeElement';
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <DefaultHomeElement />
      },
    ],
  },
];

export default routes;