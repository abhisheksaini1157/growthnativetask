import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Table from "../components/Table";

const Form = () => {
  const [refresh, setRefresh] = useState(false);
  const [TableData, setTableData] = useState([]);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
  };
  const success = () => {
    alert("Record Saved Successfully");
    resetForm();
  };

  useEffect(() => {
    try {
      const url = "https://reqres.in/api/users";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTableData(data.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name,
      last_name,
      email,
    };
    const result = await fetch("https://reqres.in/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setRefresh(!refresh);

    
    if (result.status === 400) {
      const message = await result.text();
      alert(message);
    } else {
      success();
    }
  };

  const columns = [
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      <Container maxWidth="lg">
        <Paper>
          <Box p={2} component="form" onSubmit={onSubmit}>
            <Typography variant="h4" align="center">
              Form
            </Typography>
            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  name="first_name"
                  required
                  fullWidth
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  name="last_name"
                  fullWidth
                  value={last_name}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  fullWidth
                  required
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={4} sm={4} align="center">
                <Button
                  variant="contained"
                  bgcolor="primary"
                  color="secondary"
                  type="submit"
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} align="center">
                <Button
                  variant="contained"
                  bgcolor="primary"
                  color="secondary"
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
            <br />
            <br />
          </Box>
        </Paper>
      </Container>
      <br />
      <br />

      <Table columns={columns} data={TableData} />
    </>
  );
};

export default Form;
