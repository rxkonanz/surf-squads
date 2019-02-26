// To insert in "bin/seeds.js"
const mongoose = require('mongoose');
const Trip = require('../models/trip');

const dbName = 'surf-squads';
mongoose.connect(`mongodb://localhost/${dbName}`);

const trips = [
  {
    title: "Puerto Rico Surf Trip",
    location: "Rincon, PR",
    description: "Me and 5 buddies are going to Rincon for the week. Looking for an extra to split the rent.",
    picture: "http://dailyurbanista.com/wp-content/uploads/2014/12/rincon-puerto-rico-660x400.jpg", 
    creator: "robkonanz@gmail.com",
    members: ["robkonanz@gmail.com", "kslater@wsl.com", "florence@wsl.com"],
    difficulty: "Advanced"
  },
  {
    title:"Peniche Surf Camp",
    location:"Peniche, Portugal",
    description: "Trip to Portugal in March, so sick! Don't miss it.",
    picture:"https://www.balealsurfcamp.com/content-files/uploads/2018/11/baleal-surf-camp-beginer-level-1.jpg",
    creator:"kslater@wsl.com",
    members:["kslater@wsl.com", "mfanno@wsl.com"],
    difficulty:"Beginner"
  },
  {
    title:"Pipeline Surf Trip",
    location:"North Shore, HI",
    description: "The craziest wave in the planet. Want to prove yourself in the biggest stage? What are you waiting for?",
    picture:"https://cdn.adventuresportsnetwork.com/uploads/2014/08/Pipeline.jpg",
    creator:"robkonanz@gmail.com",
    members:["robkonanz@gmail.com", "gmedina@wsl.com","jflorence@wsl.com"],
    difficulty:"Expert"
  },
  {
    title: "Nicaragua Rico Surf Trip",
    location: "Managua, Nicaragua",
    description: "Renting a Bongaloo for 5 days and need two extra people.",
    picture: "http://www.los-clavos.com/photos/blog/galeries/zooms/P1020278_35.JPG",
    creator: "gmedina@wsl.com",
    members: ["robkonanz@gmail.com", "gmedina@wsl.com", "jwilson@wsl.com"],
    difficulty: "Intermmediate"
  },
  {
    title:"Puerto Escondido Surf Trip",
    location:"Puerto Escondido, Mexico",
    description: "Tubos & Tacos wey! Dope house beachfront with the Mexican Pipeline as your backyard.",
    picture:"https://image.redbull.com/rbcom/052/2018-08-07/4b8573da-4c4e-4b45-8922-ae661ac4262f/0012/0/0/0/1667/2500/1500/1/marcial-monreal-puerto-escondido-playa-zicatela-july-2018.jpg",
    creator:"owright@wsl.com",
    members:["owright@wsl.com","gmedina@wsl.com"],
    difficulty:"Expert"
  },
  {
    title:"Bali Surf",
    location:"Bali, Indonesia",
    description: "We found a house in Bali that fits 5 people. Right now its just me and a friend. Looking for three other people to split the bills. 10-day trip.",
    picture:"http://www.surf-forecast.com/system/images/126/large/impossibles.jpg?1280347522",
    creator:"mfanno@wsl.com",
    members:["mfanno@wsl.com", "jwilson@wsl.com","mfanno@wsl.com"],
    difficulty:"Advanced"
  },
  {
    title:"Galapagos Surf",
    location:"Galapagos Islands, Ecuador",
    description: "We flying to the Galapagos on May 5th. We have rented a house that has enough space for 6 people. Would love to split with others.",
    picture:"https://surfsimply.com/wp-content/uploads/2017/09/Surf_Simply_Galapagos_Surf_Guide_Canon-by-Angel-Ortiz-Rider-Toto-Idrovo-1_fullwidth.jpg",
    creator:"gmedina@wsl.com",
    members:["gmedina@wsl.com","jwilson@wsl.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Rio de Janeiro 3BR House",
    location:"Rio de Janeiro, Brazil",
    description: "We going to Rio for 10 days next month. Have an extra room.",
    picture:"https://t-ec.bstatic.com/images/hotel/max1024x768/134/134601675.jpg",
    creator:"robkonanz@gmail.com",
    members:["robkonanz@gmail.com", "mfanno@wsl.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Lobitos/North Peru",
    location:"Lobitos, Peru",
    description: "Found a crazy deal with a beach house mansion going for $400/night. Looking for 3 more people to have a total of 5.",
    picture:"https://www.theinertia.com/wp-content/gallery/gary-parker-double-barrel/5.jpg",
    creator:"kslater@wsl.com",
    members:["kslater@wsl.com","jflorence@wsl.com"],
    difficulty:"Advanced"
  },
  {
    title:"Hossegor",
    location:"Hossegor, France",
    description: "Me and my friend are headed to Hossegor from Barcelona. We rented a 3BR, so if anyone is interested lmk.",
    picture:"https://cdn.surfer.com/uploads/2016/07/Hossegor_Testemale_post.jpg",
    creator:"robkonanz@gmail.com",
    members:["robkonanz@gmail.com", "gmedina@wsl.com","jflorence@wsl.com"],
    difficulty:"Expert"
  },
  {
    title:"Bondi Beach",
    location:"Sydney, Australia",
    description: "Me and my mates are learning how to surf this weeekend. Rented a 4BR and are looking for an extra person to join the trip.",
    picture:"https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-10/153311-Let_s_Go_Surfing_Bondi_Beach_DNSW.jpg?itok=Zy2G6T8P",
    creator:"robkonanz@gmail.com",
    members:["robkonanz@gmail.com", "mfanno@wsl.com","jwilson@wsl.com"],
    difficulty:"Beginner"
  },
  {
    title:"Costa Rica Dreaming",
    location:"San Jose, Costa Rica",
    description: "Headed to Costa Rica July 14. Join for more info.",
    picture:"http://brightspotincentivesevents.com/wp-content/uploads/2016/02/Costa-Rica.jpg",
    creator:"mfanno@wsl.com",
    members:["jwilson@wsl.com", "mfanno@wsl.com"],
    difficulty:"Advanced"
  },
  {
    title:"JBay Surf Trip",
    location:"Johannesburg, South Africa",
    description:"Found a combo safari/surf trip by local tourist company. Looking for 5 more people to fill the 10 people deal.",
    picture:"https://cdn.surfer.com/uploads/2013/06/jbaygrambeau.png",
    creator:"jwilson@wsl.com",
    members:["jwilson@wsl.com", "mfanno@wsl.com","jflorence@wsl.com"],
    difficulty:"Expert"
  },
  {
    title:"Playa Gringo Surf",
    location:"Arica, Chile",
    description: "Going to the Cold Water Classic. Renting a house for 5 people but two canceled. Rooms available if interested.",
    picture:"https://s3.amazonaws.com/bkt-lt-antiguas/wp-content/uploads/sites/7/2016/12/21/elgringo.jpg",
    creator:"robkonanz@gmail.com",
    members:["robkonanz@gmail.com", "gmedina@wsl.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Tel Aviv Surf",
    location:"Tel Aviv, Israel",
    description: "5BR House in Israel. 3 available rooms for interested surfers.",
    picture:"http://hg2.com/wp-content/uploads/2015/07/telaviv-thingstodo-surfpoint.jpg",
    creator:"gmedina@wsl.com",
    members:["gmedina@wsl.com", "kslater@wsl.com"],
    difficulty:"Intermmediate"
  },
  {
    title:"Japane Surf Trip",
    location:"Tokyo, Japan",
    description: "6BR House beachfront. Have 2 extra bedrooms. Join group for more info.",
    picture:"https://cdn.surfer.com/uploads/2015/09/th_DSC_8120-1000x665.jpg",
    creator:"jflorence@wsl.com",
    members:["jflorence@wsl.com", "gmedina@wsl.com","ljames@wsl.com"],
    difficulty:"Advanced"
  }
];

Trip.create(trips, (err) => {
  if (err) { throw(err) }
  console.log('Created ${trips.length} trips');
  mongoose.connection.close();
});