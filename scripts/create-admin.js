/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// You'll need to update this connection string to match your MongoDB setup
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/solara";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(12);

        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@solara.com" });

        if (existingAdmin) {
            console.log("Admin user already exists");
            return;
        }

        // Create admin user
        const adminUser = new User({
            email: "admin@solara.com",
            password: "admin123",
            name: "Admin User",
            role: "admin"
        });

        await adminUser.save();
        console.log("Admin user created successfully:");
        console.log("Email: admin@solara.com");
        console.log("Password: admin123");
        console.log("Role: admin");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

createAdmin();
