const mongoose = require("mongoose"), 
    Schema = mongoose.Schema,
    bcrypt = require(bcrypt),
    SALT_WORK_FACTOR = 10;


const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  currentLine: String,
  motivationalLine: String,
  keepInMind: String,
  registeredDate: { type: Date, default: Date.now },
  favoriteSpots: { type: Array }, // Stored as longitude and latitude.
  trackedSpot: { type: Array } // Stored as longitude and latitude.
});

userSchema.pre('save', function(next) { 
    let user = this;

    //only hash the password if it has been modefied (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrupt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}


const User = mongoose.model("User", userSchema);

module.exports = User;

// use sessions to check if user is logged in order to display the correct information/ page.
// 