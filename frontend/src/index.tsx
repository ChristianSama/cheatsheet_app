import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './routes/root';
import { CheatsheetList } from './routes/CheatsheetList';
import { Cheatsheet } from './routes/Cheatsheet';

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
