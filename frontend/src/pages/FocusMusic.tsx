import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipNext,
  Loop,
  DarkMode,
  LightMode,
  FormatQuote,
} from "@mui/icons-material";

interface Song {
  id: string;
  title: string;
  artist: string;
  img: string;
  audio: string;
}

const API_KEY = "Your_API"; // Replace with your actual API key

const quotes = [
  "Believe in yourself and all that you are! 🚀",
  "Success is not final, failure is not fatal. 🌟",
  "Your only limit is your mind. 🔥",
  "Every moment is a fresh beginning. ✨",
  "Stay focused and never give up. 💪",
];

export default function FocusMusic() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>(quotes[0]);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Fetch random lofi or instrumental songs
  const fetchRandomSong = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${API_KEY}&format=json&limit=1&tags=lofi,instrumental`
      );
      const data = await res.json();
      const track = data.results[0];
      setSong({
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        img: track.image,
        audio: track.audio,
      });
    } catch (error) {
      console.error("Error fetching song:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRandomSong();
  }, [fetchRandomSong]);

  const togglePlay = () => {
    if (playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPlaying(!playing);
  };

  const changeQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(newQuote);
  };

  return (
    <Box
      sx={{
        background: darkMode
          ? "linear-gradient(135deg, #121212 40%, #1a1a1a 100%)"
          : "linear-gradient(135deg, #f5f7fa 40%, #c3cfe2 100%)",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#333",
        transition: "all 0.5s ease-in-out",
        pb: 10,
      }}
    >
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          bgcolor: darkMode ? "#181818" : "primary.main",
          transition: "background-color 0.5s",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎶 Focus Music
          </Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Welcome Message */}
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: darkMode ? "#ffeb3b" : "#3f51b5" }}
        >
          ✨ Welcome to Focus Music 🎵
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            mb: 3,
            color: darkMode ? "#ccc" : "#555",
          }}
        >
          "Boost your productivity with relaxing beats and inspiration!"
        </Typography>
      </Container>

      {/* Motivational Quotes */}
      <Container maxWidth="sm" sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: darkMode ? "#ffd54f" : "#ff5722",
          }}
        >
          <FormatQuote sx={{ fontSize: 30 }} /> {quote} <FormatQuote sx={{ fontSize: 30 }} />
        </Typography>
        <Button
          variant="contained"
          onClick={changeQuote}
          sx={{
            mt: 1,
            backgroundColor: darkMode ? "#ff9800" : "#3f51b5",
            color: "#fff",
            "&:hover": { backgroundColor: darkMode ? "#e68a00" : "#303f9f" },
          }}
        >
          Next Quote ✨
        </Button>
      </Container>

      {/* Music Player */}
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {loading ? (
          <CircularProgress
            sx={{
              color: darkMode ? "#ffeb3b" : "#3f51b5",
            }}
          />
        ) : song ? (
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: darkMode ? "#222" : "white",
              boxShadow: darkMode
                ? "0px 0px 15px #ff9800"
                : "0px 0px 10px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease-in-out",
              color: darkMode ? "#eee" : "#333",
            }}
          >
            <CardMedia component="img" height="300" image={song.img} alt={song.title} />
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                🎼 {song.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: darkMode ? "#ddd" : "#555" }}
              >
                🎤 {song.artist}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <IconButton onClick={togglePlay} sx={{ color: darkMode ? "#ffeb3b" : "#3f51b5" }}>
                  {playing ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <IconButton onClick={fetchRandomSong} sx={{ color: darkMode ? "#ffa726" : "#f50057" }}>
                  <SkipNext fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={() => setLoop(!loop)}
                  sx={{ color: loop ? "#4caf50" : darkMode ? "#fff" : "#555" }}
                >
                  <Loop fontSize="large" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Typography sx={{ color: darkMode ? "#fff" : "#333" }}>
            No song available
          </Typography>
        )}
      </Container>

      {song && (
        <audio
          ref={audioRef}
          src={song.audio}
          autoPlay
          loop={loop}
          onEnded={() => !loop && fetchRandomSong()}
        />
      )}
    </Box>
  );
}
