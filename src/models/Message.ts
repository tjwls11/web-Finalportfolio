import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  name: String,
  realName: String,
  message: String,
  time: String,
  isAnonymous: Boolean,
})

export const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema)
