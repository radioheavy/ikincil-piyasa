export interface Campaign {
  id: string
  name: string
  company: string
  description: string
  targetAmount: number
  collectedAmount: number
  sharePrice: number
  totalShares: number
  remainingShares: number
  startDate: Date
  endDate: Date
  status: 'active' | 'completed' | 'failed'
  category: string
  documents: Document[]
}

export interface Share {
  id: string
  campaignId: string
  campaignName: string
  companyName: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: Date
  owner: string
}

export interface Trade {
  id: string
  shareId: string
  campaignId: string
  seller: string
  buyer: string
  quantity: number
  price: number
  timestamp: Date
  status: 'pending' | 'completed' | 'cancelled'
}

export interface Document {
  id: string
  title: string
  type: 'financial' | 'legal' | 'other'
  url: string
  uploadDate: Date
}

export interface User {
  id: string
  email: string
  name: string
  wallet: {
    balance: number
    shares: Share[]
  }
  kycStatus: 'pending' | 'approved' | 'rejected'
  documents: Document[]
} 