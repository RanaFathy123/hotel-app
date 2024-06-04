import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import { Avatar, useMediaQuery } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import profileImage from "../../../../assets/images/avatar.png";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminLayout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = React.useState(isLargeScreen);
  const [isShowDrawer, setIsShowDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleShowDrawer = () => {
    setIsShowDrawer(!isShowDrawer);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={isLargeScreen ? open : false}
        sx={{ background: "#F8F9FB" }}
      >
        <Toolbar>
          {isLargeScreen && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isLargeScreen && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleShowDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Profile Image */}
          <Avatar alt="Profile" src={profileImage} sx={{ ml: "auto", mr: 1 }} />
          {/* Notifications Icon */}
          <IconButton color="primary" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isLargeScreen && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#002366", // Custom background color
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {[
              { text: "Home", path: "/dashboard", icon: <HomeIcon /> },
              { text: "Users", path: "/settings", icon: <PeopleIcon /> },
              {
                text: "Rooms",
                path: "/dashboard/rooms-list",
                icon: <MeetingRoomIcon />,
              },
              {
                text: "Ads",
                path: "/dashboard/ads",
                icon: <CampaignIcon />,
              },
              {
                text: "Facilites",
                path: "/dashboard/facilites",
                icon: <CampaignIcon />,
              },
              // Add more items as needed
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block", color: "white" }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white", // Icon color
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <ListItem
            key="Logout"
            disablePadding
            sx={{ display: "block", color: "white" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "white", // Icon color
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Drawer>
      )}
      {!isLargeScreen && isShowDrawer && (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#002366", // Custom background color
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {[
              { text: "Home", path: "/dashboard", icon: <HomeIcon /> },
              { text: "Users", path: "/settings", icon: <PeopleIcon /> },
              {
                text: "Rooms",
                path: "/dashboard/rooms-list",
                icon: <MeetingRoomIcon />,
              },
              {
                text: "Ads",
                path: "/dashboard/ads",
                icon: <CampaignIcon />,
              },
              {
                text: "Facilites",
                path: "/dashboard/facilites",
                icon: <CampaignIcon />,
              },
              // Add more items as needed
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block", color: "white" }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white", // Icon color
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <ListItem
            key="Logout"
            disablePadding
            sx={{ display: "block", color: "white" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "white", // Icon color
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
