const mongoose = require("mongoose");

// Define my schema, or basically what my image object should look like
const imageSchema = mongoose.Schema({
  // imageId: String,
  title: String,
  imageUrl: String,
  year: Number,
  artistNameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artist",
  },
  artCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  }
});
// Export model to be used by the image router
module.exports = mongoose.model("ArtvsArt_Image", imageSchema);