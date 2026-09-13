import mongoose from 'mongoose'

const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  malId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  score: {
    type: Number,
  },
  episodes: {
    type: Number,
  },
  synopsis: {
    type: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  }
})

WatchlistSchema.index({ userId: 1, malId: 1 }, { unique: true })

export default mongoose.models.Watchlist || new mongoose.model('Watchlist', WatchlistSchema)