// Import mongoose for creating model
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({

    //defining firstName, lastName, userName, email, password of the user with type String and making them required
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //created_at field value with type Date, defaults to current date when not provided.
    created_at: {
        type: Date,
        default: Date.now
    },
    //profile value is of type object, and references the id of the userProfile collection
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'userProfile',
    }
}
);

//modelling the User object and mapping with the collection 'user'
const UserModel = mongoose.model('user', User);

export default UserModel;//exporting the model