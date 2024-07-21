import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const lastPathname = pathnames[pathnames.length - 1];

  return (
    <Box
      role="presentation"
      onClick={handleClick}
      sx={{ marginTop: 12, marginLeft: 9 }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ display: "flex", alignContent: "center" }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="subtitle2"
            color="black"
            sx={{
              display: "inline",
            }}
          >
            Home
          </Typography>
        </Link>
        {pathnames.length > 1 &&
          pathnames.slice(0, -1).map((name, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <Link to={to} key={name}>
                <Typography
                  variant="subtitle2"
                  color={"primary.main"}
                  sx={{
                    display: "inline",
                  }}
                >
                  {name[0].toUpperCase() + name.slice(1)}
                </Typography>
              </Link>
            );
          })}

        {lastPathname && pathnames[0] !== "RoomDetails" && (
          <Typography
            variant="subtitle2"
            color={"primary.main"}
            sx={{
              display: "inline",
            }}
          >
            {lastPathname[0].toUpperCase() + lastPathname.slice(1)}
          </Typography>
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
