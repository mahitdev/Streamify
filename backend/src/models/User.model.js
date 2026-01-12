import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    bio: { type: String, default: "" },

    // Match your Frontend (profilePic)
    profilePic: { type: String, default: "" }, 
    
    // Ensure these match your Controller (camelCase, String)
    nativeLanguage: { type: String, default: "" },
    learningLanguage: { type: String, default: "" }, 
    
    location: { type: String, default: "" },
    isOnboarded: { type: Boolean, default: false },
    
    // List of friends referencing the User model
    friends: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],

},{ timestamps: true });

// Performance: Faster recommendation lookups
userSchema.index({ isOnboarded: 1, createdAt: -1 });

// Password Hashing Middleware
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error){
        next(error);
    }
});

// Password Comparison Method
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;