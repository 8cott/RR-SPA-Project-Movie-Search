import React, { useReducer, useEffect } from "react";
import Header from "./components/Header.jsx";
import Movie from "./components/Movie.jsx";
import Search from "./components/Search.jsx";
import { initialState, reducer } from "./store/reducer";
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, Grid, Toolbar, Container } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import CircularProgress from '@mui/material/CircularProgress';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
        <Container>
        <CircularProgress />
        </Container>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <>
    {/* <ThemeProvider theme={darkTheme}> */}
    <CssBaseline />
    <Navbar />
    <main>
      <div>
        <Container align='center' maxWidth='sm'>
          <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
            Movies! 
          </Typography>
          <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Search for your Favorite Movies!
          </Typography>
          <Search search={search} /> 
      
        </Container>
        
      </div>
      <div>{retrievedMovies}</div>
    </main>
    {/* </ThemeProvider>   */}
    </>
  );
};

export default App;