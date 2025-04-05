/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const Item = ({ title, path, icon, action }) => {
  const location = useLocation();
  return (
    <MenuItem
      className="!w-[300px] "
      to={path}
      icon={icon}
      rootStyles={{
        color: path === location.pathname && "#6870fa",
      }}
    >
      <div className="flex space-x-2 items-center justify-between">
        <Link to={path}>
          <span>{title}</span>
        </Link>

        <div>{action && action}</div>
      </div>
    </MenuItem>
  );
};

export default Item;
