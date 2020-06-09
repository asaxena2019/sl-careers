import logo from './ScottySticker.png';
import './App.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    },
    },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
    inputRoot: {
    color: 'inherit',
    },
    inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    width: '20ch',
    },
    },
}));


var rows = [];

function App() {

  const [state, setState] = React.useState({
    dateAdded: '1',
    name: 'hai',
    link: 'www.abc.com',
    description: 'abc',
    deadline: '2'
 });

  const classes = useStyles();
  var scottyUrl = "";

  function getInternshipsData() {
    scottyUrl = "http://192.168.1.86:4000/Internships";
    getScottyData();
  }

  function getJobsData() {
    scottyUrl = "http://192.168.1.86:4000/Jobs";
    getScottyData();
  }

  function getScholarshipData() {
    scottyUrl = "http://192.168.1.86:4000/Scholarships";
    getScottyData();
  }

  function getResearchData() {
    scottyUrl = "http://192.168.1.86:4000/Research";
    getScottyData();
  }

  function getEventsData() {
    scottyUrl = "http://192.168.1.86:4000/Events";
    getScottyData();
  }
  
  function getScottyData() {
    console.log("Get Scotty Data")
    fetch(scottyUrl,
    {
      method: "GET"
    })
    .then(results => {
      console.log('Request succeeded with POST response', results);
      if(results.status === 200)
      {
        console.log('Request succeeded with POST response 200');
        console.log(results);
      } else {
        console.log('Request FAILED with POST response ');
      }
      return results.json()
    })
    .then(result => {
      //rows=(result);
      var rowsString = JSON.stringify(result);
      rowsString = rowsString.replace(/\\/g,"")
      console.log("Rows: " + rowsString);
      rows = JSON.parse(rowsString);
    setState({
        ...state,

      });
    })
  }

  return (
    <div>

    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" width={100} height={100}/>
        <h1>ScottyLabs Career Page</h1>
        <p>*insert description*</p>
      </header>
    </div>
    
    <div className="App">
      <body className="App-body">
      <div className={classes.search}>
            <div className={classes.searchIcon}>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
      </body>
    </div>
    
    <div className="App">
      <body className="App-body">
        <button className="App-button button1" onClick={getJobsData}>Jobs</button>
        <button className="App-button button2" onClick={getInternshipsData}>Internships</button>
        <button className="App-button button3" onClick={getResearchData}>Research</button>
        <button className="App-button button4" onClick={getScholarshipData}>Scholarships</button>
        <button className="App-button button5" onClick={getEventsData}>Events</button>
        <button className="App-button button6" onClick={getScottyData}>All</button>
      </body>
    </div>
    
    <div className="App">
      <body className="App-body">
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {rows.map(card => (
            <Grid item key={rows.indexOf(card)} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
              <Typography variant="subtitle1">
                {`${card.type}`}
                </Typography>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title={rows.name}
                />
                  <Typography variant="h6">
                  {`${card.name}`}
                  </Typography>
                <Typography variant="body1">
                {`${card.link}`}
                </Typography>
                <Typography variant="body1">
                {`${card.description}`}
                </Typography>
                <Typography variant="body1">
                {`Deadline: ${card.deadline}`}
                </Typography>
                <Typography variant="body1">
                  Tags
                </Typography>
                <Typography variant="body2">
                {`Date Added: ${card.dateAdded}`}
                </Typography>
              </Card>
            </Grid>
            ))}
          </Grid>
        </Container>
      </body>
    </div>
    
    <div className="App">
      <body className="App-body">
        <p>footer</p>
      </body>
    </div>
    
    </div>
  );
}

export default App;
