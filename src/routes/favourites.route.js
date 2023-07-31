const {Router} = require("express");

const router = Router();
const {createFavourite, getFavourites, removeFavourite} = require("../controllers/favourites.controller")

const isAuth = require("../middlewares/is-auth.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");


router.post("/favourite", isAuth, createFavourite);
router.get("/favourites", getFavourites);
router.delete("/remove/:id", isAuth, isAdmin, removeFavourite);


module.exports = router;