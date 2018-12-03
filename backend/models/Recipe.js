import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Recipe = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    code: {
        type: String
    }
});

export default mongoose.model('Recipe', Recipe);