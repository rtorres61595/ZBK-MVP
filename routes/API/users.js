const router = require("express").Router();
const spotsController = require("../../controllers/spotsController");
const usersController = require("../../controllers/usersController");

// { ALL ROUTES ARE CURRENTLY ONLY TEMPLATE/PSEUDOCODE} !

// Matches with users not logged in "/api/home"
router
  .route("/")
  .post(userInfo.create) // use route for creating user account
  .get(spotList.findAll) // use route for retreiving CERNT provided skate spots 

// Matches with users logged in "/api/registered/search"
router 
  .route("/registered/search")
  .get(userInfo.findById) // get route to display user info including spots.
  .put(spotList.update) // put for user to update lastSpot and spotList
//   .delete(booksController.remove);

// Matches with users logged in "api/registered/:id/home"
  // Used to display home page tailored to that user.
router
  .route("registered/:id/home")
  .get(userInfo.findById)

// Matches with users logged in "api/registered/:id/spots"
  // Used to display users spotList.
router 
  .route("registered/:id/spots")
  .get(userInfo)


// Matches with users logged in "api/registered/:id/detailed"
  // Used to display detailed view of users selected spot 
router
  .route("registered/:id/spots/:detailed")
  .get(userInfo.findById.favoriteSpots.findById) // get route to display user info.
  .update(userInfo.findById.favoriteSpots.update)
  .delete(userInfo.findById.trackedSpot.delete)

module.exports = router;
