import mongoose, { Schema } from "mongoose";
import { Password } from '../services/password';

// an interface that describes the properties that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// an interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const user = User.build({
    email: "test@test.com",
    password: "password",
});

export { User };