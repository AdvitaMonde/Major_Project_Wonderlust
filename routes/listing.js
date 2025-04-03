const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");  //{word} -> use to indicate that it is function name.
const {isLoggedIn , isOwner} = require("../middleware.js");
const User = require("../models/users.js");
const listingControllers = require("../Controllers/listing.js");
const multer  = require('multer');
const {storage} = require('../cloudeConfig.js');
const upload = multer({ storage });

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

// router.route("common_path") -> it commbine the res having same request path
//Index Route or Create Route
router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, 
    upload.single('listing[image]'), 
    validateListing , 
    wrapAsync(listingControllers.createRoute)
);


//New Route 
router.get("/new",isLoggedIn,listingControllers.newListing);


//Show Route or Update Route or Delete Route
router
.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing , wrapAsync(listingControllers.updateRoute))
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyRoute));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner ,wrapAsync(listingControllers.editRoute));


module.exports = router;
