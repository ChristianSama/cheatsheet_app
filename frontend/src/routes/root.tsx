import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div>
      <div>Navbar</div>
      <Outlet />
    </div>
  );
};
