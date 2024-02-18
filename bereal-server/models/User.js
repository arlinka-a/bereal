const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['commander', 'user'],
      default: 'user'
    }
  });
  
  const User = mongoose.model('User', UserSchema);