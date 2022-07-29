import {
    Container,
    Grid,
    CircularProgress, Box,
} from "@mui/material";

import Axios from "axios";

import {useState, useEffect} from "react";
import BlogItem from "../components/blogitem";

const BlogsPage = () => {
    const [blogs, setBlogs] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:8000/blogs/all')
            .then((result) => {
                setBlogs(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [blogs]);

    return (
        <Container
            sx={{
                pt: "1rem",
            }}
        >
            {
                blogs
                ?
                    <Box>
                        <Grid
                            spacing={3}
                            container
                        >
                            {
                                blogs.map((blog) => {
                                    return (
                                        <Grid
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            item
                                        >
                                            <BlogItem blog={blog} />
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Box>
                :
                    <Box
                        sx={{ textAlign: "center" }}
                    >
                        <CircularProgress />
                    </Box>
            }
        </Container>
    );
}

export default BlogsPage;