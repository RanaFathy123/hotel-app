import MenuIcon from "@mui/icons-material/Menu";
import {
  Container,
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
];

const authNavItems = [{ label: "Favorites", path: "/favorites" }];

export default function NavBar(props: Props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { resetLoginData, loginData } = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    resetLoginData();
    navigate("/login");
  };

  const buttonStyle = {
    color: "#FFFFFF",
    backgroundColor: "#1E90FF",
    "&:hover": {
      backgroundColor: "#1C86EE",
    },
    marginLeft: "10px",
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Staycation.
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {loginData ? (
          authNavItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary="Login Now" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/register"
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {loginData && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={Logout}>
              <ListItemText primary="LogOut" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Container>
      <AppBar
        component="nav"
        sx={{
          background: "#FFFFFF",
          color: "#152C5B",
          paddingLeft: "4em",
          paddingRight: "4em",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Staycation.
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: "#152C5B" }}
              >
                {item.label}
              </Button>
            ))}
            {loginData ? (
              authNavItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{ color: "#152C5B" }}
                >
                  {item.label}
                </Button>
              ))
            ) : (
              <>
                <Button component={Link} to="/register" sx={buttonStyle}>
                  Register
                </Button>
                <Button component={Link} to="/login" sx={buttonStyle}>
                Login Now
                </Button>
              </>
            )}
            {loginData && (
              <Button sx={buttonStyle} onClick={Logout}>
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Container>
  );
}
