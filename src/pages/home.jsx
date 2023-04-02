import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import DocumentMeta from "react-document-meta";

import {
  Container,
  Box,
  Typography,
  Toolbar,
  Grid,
  Button,
} from "@mui/material";

const HomePage = () => {
  const history = useHistory();

  const theme = useSelector((state) => state.theme);

  const meta = {
    title: "TFAsoft blog",
    description:
      "Like every company or service provider, TFAsoft has a blog too! Here we write about our changes, updates, news and many other things.",
    canonical: "https://blog.amirhossein.info",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "tfasoft,tfasoft blog,blog,tfa",
      },
    },
    link: {
      rel: { icon: "../assets/icons/favicon.ico" },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <Box>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            background: `linear-gradient(to bottom right, ${
              theme === "light" ? "#071e4e" : "#222"
            } 50%, ${theme === "light" ? "#aaa" : "#333"} 50%)`,
          }}
        >
          <Toolbar />
          <Container>
            <Grid spacing={2} container>
              <Grid md={4} sm={12} xs={12} item>
                <Box>
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                  >
                    TFASoft blog
                  </Typography>
                  <Typography color="white" paragraph gutterBottom>
                    If you are following TFASoft service or you are on of out
                    costumers, you don't like to miss any news, change log, new
                    version and things like this!
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                      color: theme === "light" ? "primary.main" : "black",
                    }}
                    onClick={() => history.push("/blogs")}
                    disableElevation
                  >
                    Read blogs
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </DocumentMeta>
  );
};

export default HomePage;
