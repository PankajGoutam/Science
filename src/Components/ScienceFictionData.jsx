import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function ScienceFictionData() {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://child.onrender.com/api/sciencefiction"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (id) => {
    try {
      const response = await axios.get(
        `https://child.onrender.com/api/sciencefiction/${id}`
      );
      setSelectedItem(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <AppBar position="static" sx={{ borderRadius: 15 }}>
        <Toolbar sx={{ flexGrow: 1, justifyContent: "center" }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Genre</Button>
          <Button color="inherit">Leader Board</Button>
          <Button color="inherit">Daily Quiz</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <AppBar
        position="static"
        sx={{
          borderRadius: 15,
          border: "2px solid blue",
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ flexGrow: 1, justifyContent: "center" }}>
          <Button color="primary">Fantasy</Button>
          <Button color="primary">Adventure</Button>
          <Button color="primary">Mystery</Button>
          <Button color="primary">Science</Button>
          <Button color="primary">History</Button>
          <Button color="primary">Sports</Button>
        </Toolbar>
      </AppBar>

      <div
        style={{
          padding: "0 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography variant="h3">Science Fiction Data</Typography>
        <div>
          <Button
            color="success"
            style={{ backgroundColor: "orange", margin: "5px" }}
          >
            Clear All
          </Button>
          <Button
            color="success"
            style={{ backgroundColor: "orange", margin: "5px" }}
          >
            Completed
          </Button>
          <Button
            color="success"
            style={{ backgroundColor: "orange", margin: "5px" }}
          >
            In Progress
          </Button>
          <Button
            color="success"
            style={{ backgroundColor: "orange", margin: "5px" }}
          >
            New
          </Button>
        </div>
      </div>

      {selectedItem && (
        <Grid container spacing={3} sx={{ margin: "20px auto", maxWidth: "calc(100% - 40px)" }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`https://ik.imagekit.io/dev24/${selectedItem?.Image}`}
                title={selectedItem.Title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {selectedItem.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* ... (existing code) ... */}
                </Typography>
                <CardActions>
                  <Button
                    size="small"
                    style={{
                      backgroundColor:
                        selectedItem.Status === "In Progress" ? "yellow" : "green",
                      color: "white",
                    }}
                    onClick={() => handleButtonClick(selectedItem._id)}
                  >
                    {selectedItem.Status}
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {data && !selectedItem && (
        <Grid container spacing={3} sx={{ margin: "20px auto", maxWidth: "calc(100% - 40px)" }}>
          {data.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`https://ik.imagekit.io/dev24/${item?.Image}`}
                  title={item.Title}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {item.Title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* ... (existing code) ... */}
                  </Typography>
                  <CardActions>
                    <Button
                      size="small"
                      style={{
                        backgroundColor:
                          item.Status === "In Progress" ? "yellow" : "green",
                        color: "white",
                      }}
                      onClick={() => handleButtonClick(item._id)}
                    >
                      {item.Status}
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default ScienceFictionData;
