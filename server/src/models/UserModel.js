const mongoose = require("mongoose");

// Define my schema, or basically what my user object should look like
const userSchema = mongoose.Schema({
  username: String,
  password: String
});
// Export model to be used by the user router
module.exports = mongoose.model('users', userSchema);