const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");

// // Enter your current week and day
// const whatWeekAndDayIsIt = "w09d02";

// Connect to mongodb
mongoose.connect("mongodb://localhost:27017/FullStackImageAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialise app object
const app = express();
app.use(
  // use middleware have imported/defined - creates ID for session AND the below object and initialises as blank object
  session({
    secret: "random secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Session can be accessed with request.session to check if user logged in etc.
// E.g. log-in route that user should use, only if hit and correct user name and pswrd used
// Logged in = true and then use that post route.

// This is the port your application will use
const port = 3000;

// Import all routers
const internalRouter = require("./routes/internalRoutes");
const imageRouter = require("./routes/imageRoutes");
const userRouter = require("./routes/userRoutes");


// Add middleware to be able to read and understand json files
app.use(express.json());
app.use(cors()); // Cross Origin Resource Sharing
app.use(
  session({
    secret: "random secret",
    // check resave and saveuniinitalised as I copied from below session in response to error at this line
    resave: false,
    saveUninitialized: false,
})
);
// Tell express that it needs to use the routers we have initialised
app.use("/internal", internalRouter);
app.use("/api/images", imageRouter);
app.use("/api/users", userRouter);

// listen to the port
app.listen(port,()=>
console.log(`FullStackImageAPI is listening at http://localhost:${port}`)
);