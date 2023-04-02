import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Drawer,
} from "@mui/material";

import {
  DarkMode,
  LightMode,
  Menu,
  Logout,
  Login,
  Dashboard,
  PostAdd,
  Home,
  MenuBook,
  Biotech,
  RssFeed,
} from "@mui/icons-material";

import Axios from "axios";

import { setTheme } from "../../redux/actions/theme";
import { logoutUser } from "../../redux/actions/session";
import { unsetUID } from "../../redux/actions/uid";
import { deleteUser } from "../../redux/actions/user";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);
  const session = useSelector((state) => state.session);
  const env = useSelector((state) => state.env);
  const backendAPI = env.REACT_APP_BACKEND_API;

  const author = useSelector((state) => state.user);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [content, setContent] = useState("");

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [snackType, setSnackType] = useState("");
  const createSnack = (title, type) => {
    setSnackTitle(title);
    setSnackType(type);

    setSnackOpen(true);
  };

  const navItems = [
    {
      name: "TFASoft",
      href: "https://tfasoft.amirhossein.info",
      icon: <Home />,
    },
    {
      name: "Dashboard",
      href: "https://dashboard.amirhossein.info",
      icon: <Dashboard />,
    },
    {
      name: "Docs",
      href: "https://docs.amirhossein.info",
      icon: <MenuBook />,
    },
    {
      name: "Demo",
      href: "https://demo.amirhossein.info",
      icon: <Biotech />,
    },
  ];

  const addBlog = () => {
    const data = {
      title,
      content,
      short,
      author: author.name,
      views: 0,
    };

    Axios.post(`${backendAPI}/blogs/add`, data)
      .then((result) => {
        setTitle("");
        setShort("");
        setContent("");

        createSnack("Posted successfully", "success");
      })
      .catch((error) => {
        createSnack("Sorry, an error", "error");
      });
  };

  const drawer = (
    <Box
      onClick={() => setDrawerOpen(!drawerOpen)}
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        onClick={() => history.push("/")}
        sx={{
          cursor: "pointer",
          my: 2,
        }}
      >
        TFASoft Blog
      </Typography>
      <Divider />
      <List>
        {session && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => setDialogOpen(true)}>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <PostAdd />
              </ListItemIcon>
              <ListItemText primary="Add a new blog" />
            </ListItemButton>
          </ListItem>
        )}
        {session && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => history.push("/panel")}>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Panel" />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={() => history.push("/blogs")}>
            <ListItemIcon sx={{ color: "primary.main" }}>
              <RssFeed />
            </ListItemIcon>
            <ListItemText primary="Blogs" />
          </ListItemButton>
        </ListItem>
        {session ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(logoutUser());
                dispatch(unsetUID());
                dispatch(deleteUser());
              }}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => history.push("/auth")}>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {navItems.map((item) => {
          return (
            <ListItem disablePadding>
              <ListItemButton component="a" href={item.href}>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar elevation={0}>
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{
                mr: 2,
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              onClick={() => history.push("/")}
              sx={{
                cursor: "pointer",
                flexGrow: 1,
              }}
            >
              TFASoft Blog
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              {session && (
                <Button
                  variant="text"
                  onClick={() => setDialogOpen(true)}
                  sx={{
                    color: "white",
                  }}
                >
                  Add a new blog
                </Button>
              )}
              {session && (
                <Button
                  variant="text"
                  onClick={() => history.push("/panel")}
                  sx={{
                    color: "white",
                  }}
                >
                  Panel
                </Button>
              )}
              <Button
                variant="text"
                onClick={() => history.push("/blogs")}
                sx={{
                  color: "white",
                }}
              >
                Blogs
              </Button>
              {session ? (
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(logoutUser());
                    dispatch(unsetUID());
                    dispatch(deleteUser());
                  }}
                  sx={{
                    color: "white",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="text"
                  onClick={() => history.push("/auth")}
                  sx={{
                    color: "white",
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
            <IconButton
              color="inherit"
              onClick={() =>
                dispatch(setTheme(theme === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            },
          }}
        >
          <Box>{drawer}</Box>
        </Drawer>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle color="primary.main">Add a new blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can add a new blog and talk about what happan and what is
            going on!
          </DialogContentText>
          <br />
          <TextField
            variant="outlined"
            color="primary"
            size="small"
            placeholder="Pick a fantastic title!"
            label="Blog title"
            sx={{ mb: "1rem" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            variant="outlined"
            color="primary"
            size="small"
            placeholder="Describe this blog in a single sentence"
            label="Blog short description"
            sx={{ mb: "1rem" }}
            value={short}
            onChange={(e) => setShort(e.target.value)}
            fullWidth
          />
          <TextField
            variant="outlined"
            color="primary"
            size="small"
            placeholder="Enter your post here."
            label="Blog content"
            sx={{ mb: "1rem" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => addBlog()} disableElevation>
            Add it
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
          {snackTitle}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Navbar;
