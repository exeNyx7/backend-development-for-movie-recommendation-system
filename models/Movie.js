const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    director: { type: String, required: true },
    cast: [{ type: String }],
    releaseDate: { type: Date },
    runtime: { type: Number }, // in minutes
    synopsis: { type: String },
    
    // Ensure average rating is between 1 and 5
    averageRating: {
        type: mongoose.SchemaTypes.Decimal128,
        min: 1.0,
        max: 5.0,
        default: 1.0,
        validate: {
            validator: function(v) {
                return v.toString().match(/^\d+(\.\d{1})?$/); // Ensures one digit after the decimal
            },
            message: props => `${props.value} is not a valid rating number!`
        }
    },

    
    movieCover: { type: String },
    trivia: [String],
    goofs: [String],
    soundtrackInfo: [String],
    
    ageRating: { type: String },
    parentalGuidance: { type: String },

    countryOfOrigin: { type: String }, 
    language: { type: String }, 
    keywords: [{ type: String }], 

    popularity: { type: Number, default: 0 }, // Incremented based on user interactions
    viewCount: { type: Number, default: 0 }, // Tracks how often the movie is viewed

    aired: { type: Boolean, default: false, required: true },
    associatedNews: [{ type: Schema.Types.ObjectId, ref: 'News' }],

    directors: [{ type: Schema.Types.ObjectId, ref: 'Director' }],
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
    boxOffice: { type: Schema.Types.ObjectId, ref: 'BoxOffice' },
    awards: [{ type: Schema.Types.ObjectId, ref: 'Award' }],

    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
movieSchema.index({ title: 'text', director: 'text', cast: 'text', genre: 1, averageRating: 1, popularity: 1, releaseDate: 1, countryOfOrigin: 1, language: 1, keywords: 1 });

module.exports = mongoose.model('Movie', movieSchema);
