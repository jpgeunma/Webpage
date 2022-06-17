export class MessageModel {

    constructor(roomId, sender, receiver, message) {
        this.roomId = roomId;
        this.receiver = receiver;
        this.message = message;
    }
}