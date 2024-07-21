const mongoose = require("mongoose");
const { string } = require("zod");

mongoose.connect("mongodb+srv://ssamarth224:GGeJIb5AQeVTlo4G@cluster0.gvveypg.mongodb.net/movie-explorer-app")
.then(() => console.log("connected to mongoose"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
});

const moviesSchema = new mongoose.Schema({
    MovieId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

const User = mongoose.model('User', userSchema);
const Movies = mongoose.model('Movies', moviesSchema);

module.exports = {
    User,
    Movies
}