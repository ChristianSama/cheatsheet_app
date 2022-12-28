import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './pages/root';
import { CheatsheetList } from './pages/CheatsheetList';
import { Cheatsheet } from './pages/Cheatsheet';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <CheatsheetList />
      },
      {
        path: "cheatsheets/:id",
        element: <Cheatsheet />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
