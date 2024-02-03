import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    image: { type:String, required:false,
      default:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" },
    name: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        validate: {
        validator: function(v: string) {
          return /^\S+@\S+$/.test(v);
        },
        message:(props:any) => `${props.value} is not a valid email`
      }
    },
    password: { 
        type: String,
        required: true, 
        minLength: [6, "Password must be atleast 6 characters long"] 
    },
    userType: {
        type: String,
        enum: ['admin', 'artist', 'user'],
        default: "user"
    },
   // prefrences_genres: []
    favorites:[{type:String}],
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "playlists"}]
})

const User = mongoose.model("users", UserSchema)

export default User