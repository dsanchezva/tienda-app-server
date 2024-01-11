const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    articles: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    totalPrice: Number,
    paymentId: String,
    clientSecret: String,
    statusPayment: {
      type: String,
      enum: ["incomplete", "succeeded"],
      default: "incomplete",
    },
    statusShipment: {
        type: String,
        enum: ["processing", "sended", "received"],
        default: "processing",
    }
  },
  {
    timestamps: true,
  }
)

const Order = model("Order", orderSchema)
module.exports = Order;