import mongoose from 'mongoose';
import registerSockets from './thing.socket'

const ThingSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['note', 'thing', 'ping'],
        required: false
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: new Date()
    }
});

//Register events for sockets
registerSockets(ThingSchema);
export default mongoose.model('thing', ThingSchema);