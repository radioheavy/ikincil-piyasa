import { create } from 'zustand'
import { User, Campaign, Trade } from './types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setIsLoading: (loading: boolean) => void
  logout: () => Promise<void>
}

interface MarketState {
  selectedCampaign: Campaign | null
  activeTrades: Trade[]
  setSelectedCampaign: (campaign: Campaign | null) => void
  setActiveTrades: (trades: Trade[]) => void
}

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

interface AppState extends AuthState, MarketState, ThemeState {}

export const useAppStore = create<AppState>((set) => ({
  // Auth state
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  logout: async () => {
    try {
      // API'ye çıkış isteği gönder
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Çıkış yapılırken bir hata oluştu")
      }

      // Store'u temizle
      set({ user: null, isAuthenticated: false })
    } catch (error) {
      console.error("Çıkış yapılırken bir hata oluştu:", error)
      throw error
    }
  },

  // Market state
  selectedCampaign: null,
  activeTrades: [],
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  setActiveTrades: (trades) => set({ activeTrades: trades }),

  // Theme state
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
})) 