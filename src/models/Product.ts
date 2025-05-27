import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export interface IProduct extends mongoose.Document {
  title: string
  description: string
  price: number
  imageUrl: string
  category: string
  brand: string
  createdAt: Date
  updatedAt: Date
}

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema)

export default Product 