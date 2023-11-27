import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    image: { type:String, required:false },
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
    likes: [{type: String}]
})

const User = mongoose.model("users", UserSchema)

export default User