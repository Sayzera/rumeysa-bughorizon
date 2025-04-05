/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ title, path, icon, colors, action }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        "&:hover": {
          backgroundColor: colors.primary[500],
        },
      }}
    >
      <Link
        to={path}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          color: colors.gray[100],
          flex: 1,
        }}
      >
        {icon}
        <Typography variant="body1">{title}</Typography>
      </Link>
      {action}
    </Box>
  );
};

export default Item;
