var env = process.env.NODE_ENV || 'development';
console.log(process.env.TEST_DB);
if (env === 'development') {
  process.env.PORT = 3001; // sets localhost
  process.env.MONGODB_URI = 'mongodb://localhost:27017/contacts'; // set local db
} else if ( env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = process.env.TEST_DB;
} else if (env === 'localtest') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/contacts_test'; // set local db
}

// CONFIG REFACTOR : if its test/dev
// if( env === 'development' || env === 'test'){
//   const config = require('./config.json'); // import the strings
//   const envConfig = config[env]; // 
// // turns JSON key values into an array [PORT, MONGODB_URI]
//   Object.keys(envConfig).forEach( key => {
//     process.env[key] = envConfig[key]; 
// // ex : process.env.PORT = 3000;
//   }); // will set the env value = to the keys
// }