import logo from './ScottySticker.png';
import external from './external-link.png';
import './App.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
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
  button: {
    margin: theme.spacing(1),
    borderRadius: 60,
  },
  input: {
    display: "none"
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
  typography:{
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.75),
    '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 1.00),
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
var rowsAll = [];

var getAll = false;
var catCount = 0;
var search = false;
var scottyURL = process.env.REACT_APP_scottyURL

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function App() {

  const [state, setState] = React.useState({
    dateAdded: 'dateAdded',
    title: 'title',
    company: 'company',
    link: 'link',
    description: 'description',
    deadline: 'deadline',
    image: 'imageLink',
    tags: 'tags'
 });

  const [searchstring,searchString] = React.useState('');
  const classes = useStyles();
  var scottyUrl = "";

  function getInternshipsData() {
    scottyUrl = scottyURL+"Internships";
    getScottyData();
  }

  function getJobsData() {
    scottyUrl = scottyURL+"Jobs";
    getScottyData();
  }

  function getScholarshipData() {
    scottyUrl = scottyURL+"Scholarships";
    getScottyData();
  }

  function getResearchData() {
    scottyUrl = scottyURL+"Research";
    getScottyData();
  }

  function getEventsData() {
    scottyUrl = scottyURL+"Events";
    getScottyData();
    
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getSearch();
    }
  }

  function getSearch () {
    console.log("Get Search:  " + searchstring);
    search = true;
    fetchData();
  }

  const handleSearchString = event => {
    searchString(event.target.value);
  };

  function getAllData(){
    search = false;
    fetchData();
  }

  async function fetchData(){
    getAll = true;
    getInternshipsData();
    await sleep(50);
    getJobsData();
    await sleep(50);
    getScholarshipData();
    await sleep(50);
    getResearchData();
    await sleep(50);
    getEventsData();
    await sleep(50);
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
      var rowsString = JSON.stringify(result);
      rowsString = rowsString.replace(/\\/g,"")
      
      rows = JSON.parse(rowsString);
      console.log("Rows: :length: " + rows.length + "  " + JSON.stringify(rowsString));
      if(getAll)
      {
        
        catCount++;
        
        console.log("catCount: " + catCount);
        for(var i = 0; i < rows.length; i++){
          var rowsLower = JSON.stringify(rows[i]).toLowerCase();
          var searchLower = searchstring.toLowerCase();
          var match = rowsLower.search(searchLower);
          if(search){
            if(match > 0){
              console.log("*********  MATCH ********** " + searchstring)
              rowsAll.push(rows[i]);
              match =0;
            }
          }
          else {
            rowsAll.push(rows[i]);
          }
        }

        console.log("rowsAll: :length: " + rowsAll.length + "  " + rows[0].type);

        if(catCount >= 5)
        {
          rows = [];
          rows = rowsAll;
          rowsAll = [];
          getAll = false;
          catCount = 0;
        } 
      }
      setState({
          ...state,
        });
    })
  }

window.onload = function (){
  console.log("Done with Load");
  getAllData();
}

  return (
    <div className="App">
      
      <div>
        <header className="App-header">
          <img src={logo} alt="logo" width={100} height={100}/>
          <h1>ScottyLabs Career Page</h1>
          <form action='https://lists.andrew.cmu.edu/mailman/listinfo/sl-career'>
            <button className="App-button buttonexternal">
              <u>Sign up for weekly newsletter</u><img src={external} alt="external" width={10} height={10}/>
            </button>
          </form>
          <form action='https://docs.google.com/forms/d/11qgZGcnggidbq4MSu5Lv1qwawSFZ1bOaOr5CYXxubnE/edit?ts=5ef13b58'>
            <button className="App-button buttonexternal" type="submit">
              <u>Submit opportunities here</u><img src={external} alt="external" width={10} height={10}/>
            </button>
          </form>
        </header>
      </div>
      
      <div className="App-body">
          <button className="App-button button1" onClick={getJobsData}>Jobs</button>
          <button className="App-button button2" onClick={getInternshipsData}>Internships</button>
          <button className="App-button button3" onClick={getResearchData}>Research</button>
          <button className="App-button button4" onClick={getScholarshipData}>Scholarships</button>
          <button className="App-button button5" onClick={getEventsData}>Events</button>
          <button className="App-button button6" onClick={getAllData}>All</button>
      </div>

      <div className="App-body">
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon onClick={getSearch}/>
            </div>
            <InputBase
              id="searchString"
              name="searchString"
              autoComplete="searchString"
              value={searchstring}
              onChange={handleSearchString}
              onKeyDown={handleKeyDown}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>
      </div>
      
      <div className="App-body">
        <Container className={classes.cardGrid} maxWidth="md" pt={10}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {rows.map(card => (
              <Grid item key={rows.indexOf(card)} xs={12} sm={6} md={4}>
                <Card className={classes.card} mx="auto">
                  <Typography variant="body1">
                    <b>{`${card.type}`}</b>
                  </Typography>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${card.imageLink}`}
                    title={rows.name}
                  />
                  <Typography variant="h6">
                    <b>{`${card.title}`}</b><br></br>
                    <i>{`${card.company}`}</i>
                  </Typography>
                  <Typography variant="body1">
                    <form action={`${card.link}`}>
                        <button className="App-button buttonexternal" type="submit"> 
                        <u>Apply here</u>
                        <img src={external} alt="external" width={10} height={10}/>
                        </button>
                    </form>
                  </Typography>
                  <Typography variant="body1" align="left" className={classes.typography}>
                  {`${card.description}`}<br></br>
                  <b>Deadline: </b>{`${card.deadline}`}
                  <div className="tagContainer">
                    {card.tags.map(topic =>(
                      <body1 className="tagShape">{`${topic}`}</body1>
                    ))}
                  </div>
                  <b>Date Added: </b>{`${card.dateAdded}`}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

    </div>
  );
}

export default App;