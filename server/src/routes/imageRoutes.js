const express = require("express");
const ImageModel = require("../models/ImageModel");
const ArtistModel = require("../models/ArtistModel");
const CategoryModel = require("../models/CategoryModel");

// Create a new router to handle images routes
const router = express.Router();

// Add a health check for image routes
router.get("/_health", (request, response) => {
  console.log("session:", request.session);
  response.send("Images health routes work OK")
}
);

router.get('/all', (request, response) => {
  ImageModel.find()
  .populate('categoryId') // what about artist id? Or should there be separate image ID???????????
  .then((images) => {
    response.send(images);
  }).catch(() => {
    response.status(500).send('Unable to query images');
  });
});

// Add new image data if logged in
//401 unauthorised error response if not logged in
router.post("/new", (request, response) => {
  // Extract your request body
  const requestBody = request.body;
  // Call your database and add that image object to your collection
  ImageModel.create(requestBody).then((data) => {
    console.log(data);
    response.send("This image was added successfully!");
  });
});

// update route

// new -> if this is true, return back TO THE API the modified object; or else return older object
// upsert -> if true, add a new entry if id doesn't exist, if false -> throw an error

router.patch("/update-image/:id", (request, response) => {
  ImageModel.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    upsert: true,
  })
    .then((data) => {
      console.log("Update successful!");
      response.send(data);
    })
    .catch(() => {
      console.log("Something went wrong!!");
      response.status(404).send("The image was not found.");
    });
});

// delete route
router.delete("/delete-image/:id", (request, response) => {
  ImageModel.findByIdAndDelete(request.params.id)
    .then((data) => {
      console.log("Delete successful!");
      response.send(data);
    })
    .catch(() => {
      console.log("Something went wrong!!");
      response.status(404).send("The image was not found.");
    });
});

// Category routes

// Create a category by doing a post request in postman
router.post("/category", (request, response) => {
  const requestBody = request.body;

  CategoryModel.create(requestBody)
    .then((data) => {
      response.send(data);
    })
    .catch(() => {
      response.status(500).send("Cannot create art category.");
    });
});

// Get all categories so we can use that information in the dropdown in the ui
router.get("/category/all", (request, response) => {
  CategoryModel.find()
  .then((categories) => {
      response.send(categories);
    })
    .catch((error) => {
      console.log("error:", error);
      response.status(500).send("Cannot load art categories.");
    });

});

// Artist routes
// Create artist by doing a post request in postman
router.post('/artist', (request, response) => {
  const requestBody = request.body;

  ArtistModel.create(requestBody)
  .then((data) => {
    response.send(data);
  }).catch((error) => {
    console.log("error:", error);
    response.status(500).send('Cannot create artist name');
  });
});

// Get all artists so we can use that information in the dropdown in the ui
router.get("/artist/all", (request, response) => {
  ArtistModel.find()
  .then((artists) => {
      response.send(artists);
    })
    .catch((error) => {
      console.log("error:", error);
      response.status(500).send("Cannot load artist names.");
    });
});

module.exports = router;