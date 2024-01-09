const { Schema, model } = require("mongoose");


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
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    }, 
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    adress: {
      name: {
        type: String,
      },
      surname: {
        type: String,
      },
      street: {
        type: String,
        trim: true,
      }, 
      city: {
        type: String,
      },
      region: {
        type: String, 
        enum: ["Andalucía", "Aragón", "Canarias", "Cantabria", "Castilla y León", "Castilla-La Mancha", "Cataluña", "Ceuta", "Comunidad Valenciana", "Comunidad de Madrid", "Extremadura", "Galicia", "Islas Baleares", "La Rioja", "Melilla", "Navarra", "País Vasco", "Principado de Asturias", "Región de Murcia"]
      },
      zipCode: {
        type: Number,
      },
      country: {
        type: String,
        default: "España",
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
