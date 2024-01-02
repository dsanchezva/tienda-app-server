const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    creditCard: {
      number: {
        type: String,
        trim: true,
        defaul: "1234-5678-9123-4567"
        },
      name: {
        type: String,
        trim: true,
      },
      cvCode: {
        type: Number,
        
      }
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
