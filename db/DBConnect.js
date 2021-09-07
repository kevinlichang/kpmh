const mongoose = require('mongoose');
require('dotenv').config();

async function DBConnect() {
  mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  ).then(() => {
    console.log("Successfully connected to authDB on MongoDB Atlas");
  }).catch((error) => {
    console.log("Unable to connect to authDB");
    console.error(error);
  });
}

module.exports = DBConnect;


// const passportLocalMongoose = require('passport-local-mongoose');

// // ------------- connect to database--------------------------
// mongoose.connect('mongodb://localhost/users',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// // Create Model
// const Schema = mongoose.Schema;
// const UserDetail = new Schema({
//   username: String,
//   password: String
// });

// UserDetail.plugin(passportLocalMongoose);

// module.exports = mongoose.model('userData', UserDetail, 'userData');