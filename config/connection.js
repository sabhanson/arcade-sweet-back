const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/arcade-sweet',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection
  .on("open", () => console.log("The goose is open"))
  .on("close", () => console.log("The goose is closed"))
  .on("error", (error) => {
    console.log(error);
    process.exit();
  })
module.exports = mongoose;
