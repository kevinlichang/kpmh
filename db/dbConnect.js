const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
  mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  ).then(() => {
    console.log("Successfully connected to MongoDB");
  }).catch((error) => {
    console.log("Unable to connect to database");
    console.error(error);
  });
}

module.exports = dbConnect;


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