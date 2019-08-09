const events = ['save', 'update'];

function emitEvent(event) {
    return (doc) => {
        global.socketsController.broadcastMessage(`thing${event}`, doc);
    }
}

function registerEvents(ThingSchema) {
    for (let event of events) {
        ThingSchema.post(event, emitEvent(event));
    }
}

export default registerEvents;