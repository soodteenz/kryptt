import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ApiKeysState {
  alpacaApiKey: string
  alpacaSecretKey: string
  hasKeys: boolean
  setKeys: (alpacaApiKey: string, alpacaSecretKey: string) => void
  clearKeys: () => void
}

export const useApiKeysStore = create<ApiKeysState>()(
  persist(
    (set) => ({
      alpacaApiKey: '',
      alpacaSecretKey: '',
      hasKeys: false,
      setKeys: (alpacaApiKey: string, alpacaSecretKey: string) => 
        set({ alpacaApiKey, alpacaSecretKey, hasKeys: true }),
      clearKeys: () => 
        set({ alpacaApiKey: '', alpacaSecretKey: '', hasKeys: false }),
    }),
    {
      name: 'api-keys-storage',
    }
  )
) 