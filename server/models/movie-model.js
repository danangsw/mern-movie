const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        title: { type: String, required: true },
        synopsis: { type: String, required: true },
        director: { type: String, required: true },
        writers: { type: [String], required: true },
        stars: { type: [String], required: true },
        rating: { type: Number, required: true, min: 0, max: 10 },
        showtimes: { type: [String], required: true }
    },
        /**
        inCinemas: [{
            showtimes: [{ 
                studio: { type: String, required: true },
                time: { type: Date, required: true }
             }],
            theater: { type: String, required: true }
        }],
        thriller: { type: Buffer, required: false}
        },**/
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)

// SchemaType reference: https://mongoosejs.com/docs/schematypes.html