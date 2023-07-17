import {Schema, model , models} from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    prompt : {
        type : String,
        required: [true, 'Prompt is Required!!'],
    },
    tag: {
        type : String,
        required: true,
    }
})

const Prompt = models.prompt || model('Prompt', promptSchema);

export default Prompt;