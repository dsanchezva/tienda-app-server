const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    articleName: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,

    },
    cuantity: {
        type: Number,
        default: 1,
        required: true,
    },
    description: {
        tyoe: String,
        trim: true,
    }, 
    articlePic: {
        type:[String],
        default: ["https://res.cloudinary.com/dqdhb1efh/image/upload/v1704718316/no-fotos_mihqdq.png"],
        
    },
    category: {
        type: [String],
        default: "No category",
    }

}, {
    createdAt: true,
    timestamps: true,
}
)

const Article = model("Article", articleSchema);
module.exports = Article;