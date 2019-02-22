// To insert in "bin/seeds.js"
const mongoose = require('mongoose');
const Trip = require('../models/trip');

const dbName = 'surf-squads';
mongoose.connect(`mongodb://localhost/${dbName}`);

const trips = [
  {
    title: "Puerto Rico Surf Trip",
    location: "Rincon, PR",
    picture: "http://dailyurbanista.com/wp-content/uploads/2014/12/rincon-puerto-rico-660x400.jpg", 
    creator: "robkonanz@gmail.com",
    members: ["ljames@nba.com", "scurry@nba.com"],
    difficulty: "Advanced"
  },
  {
    title:"Peniche Surf Camp",
    location:"Peniche, Portugal",
    picture:"https://www.balealsurfcamp.com/content-files/uploads/2018/11/baleal-surf-camp-beginer-level-1.jpg",
    creator:"robkonanz@gmail.com",
    members:["ljames@nba.com","scurry@nba.com"],
    difficulty:"Beginner"
  },
  {
    title:"Pipeline Surf Trip",
    location:"North Shore, HI",
    picture:"https://cdn.adventuresportsnetwork.com/uploads/2014/08/Pipeline.jpg",
    creator:"robkonanz@gmail.com",
    members:["ljames@nba.com","scurry@nba.com"],
    difficulty:"Expert"
  },
  {
    title: "Nicaragua Rico Surf Trip",
    location: "Managua, Nicaragua",
    picture: "http://www.los-clavos.com/photos/blog/galeries/zooms/P1020278_35.JPG",
    creator: "robkonanz@gmail.com",
    members: ["ljames@nba.com", "scurry@nba.com"],
    difficulty: "Intermmediate"
  },
  {
    title:"Puerto Escondido Surf Trip",
    location:"Puerto Escondido, Mexico",
    picture:"https://image.redbull.com/rbcom/052/2018-08-07/4b8573da-4c4e-4b45-8922-ae661ac4262f/0012/0/0/0/1667/2500/1500/1/marcial-monreal-puerto-escondido-playa-zicatela-july-2018.jpg",
    creator:"robkonanz@gmail.com",
    members:["scurry@nba.com","ljames@nba.com"],
    difficulty:"Expert"
  },
  {
    title:"Bali Surf",
    location:"Bali, Indonesia",
    picture:"http://www.surf-forecast.com/system/images/126/large/impossibles.jpg?1280347522",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Advanced"
  },
  {
    title:"Galapagos Surf",
    location:"Galapagos Islands, Ecuador",
    picture:"https://surfsimply.com/wp-content/uploads/2017/09/Surf_Simply_Galapagos_Surf_Guide_Canon-by-Angel-Ortiz-Rider-Toto-Idrovo-1_fullwidth.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Rio de Janeiro 3BR House",
    location:"Rio de Janeiro, Brazil",
    picture:"https://t-ec.bstatic.com/images/hotel/max1024x768/134/134601675.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Lobitos/North Peru",
    location:"Lobitos, Peru",
    picture:"https://www.theinertia.com/wp-content/gallery/gary-parker-double-barrel/5.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Advanced"
  },
  {
    title:"Hossegor",
    location:"Hossegor, France",
    picture:"https://cdn.surfer.com/uploads/2016/07/Hossegor_Testemale_post.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Expert"
  },
  {
    title:"Bondi Beach",
    location:"Sydney, Australia",
    picture:"https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-10/153311-Let_s_Go_Surfing_Bondi_Beach_DNSW.jpg?itok=Zy2G6T8P",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Beginner"
  },
  {
    title:"Costa Rica Dreaming",
    location:"San Jose, Costa Rica",
    picture:"http://brightspotincentivesevents.com/wp-content/uploads/2016/02/Costa-Rica.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Advanced"
  },
  {
    title:"JBay Surf Trip",
    location:"Johannesburg, South Africa",
    picture:"https://cdn.surfer.com/uploads/2013/06/jbaygrambeau.png",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Expert"
  },
  {
    title:"Playa Gringo Surf",
    location:"Arica, Chile",
    picture:"https://s3.amazonaws.com/bkt-lt-antiguas/wp-content/uploads/sites/7/2016/12/21/elgringo.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Tel Aviv Surf",
    location:"Tel Aviv, Israel",
    picture:"http://hg2.com/wp-content/uploads/2015/07/telaviv-thingstodo-surfpoint.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Japane Surf Trip",
    location:"Tokyo, Japan",
    picture:"https://cdn.surfer.com/uploads/2015/09/th_DSC_8120-1000x665.jpg",
    creator:"robkonanz@gmail.com",
    members:["stephcurry@nba.com","ljames@nba.com"],
    difficulty:"Advanced"
  }
];

Trip.create(trips, (err) => {
  if (err) { throw(err) }
  console.log('Created ${trips.length} trips');
  mongoose.connection.close();
});

