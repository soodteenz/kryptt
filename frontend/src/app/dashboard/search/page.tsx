'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Loader2, Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface Token {
  id: string
  symbol: string
  name: string
  exchange: string
  min_order_size: number
  price_increment: number
}

export default function SearchPage() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState('1')
  const itemsPerPage = 10

  // Fetch tokens from the API
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/v1/assets/crypto`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Failed to fetch tokens')
        }
        const data = await response.json()
        setTokens(data)
        setFilteredTokens(data)
        setError(null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching tokens')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
  }, [])

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    setPageInput('1')
    const filtered = tokens.filter((token) =>
      token.symbol.toLowerCase().includes(query.toLowerCase()) ||
      token.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredTokens(filtered)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
    setPageInput('1')
    setFilteredTokens(tokens)
  }

  // Pagination
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTokens = filteredTokens.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setPageInput(page.toString())
    }
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPageInput(value)
  }

  const handlePageInputBlur = () => {
    const page = parseInt(pageInput)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    } else {
      setPageInput(currentPage.toString())
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-white">Crypto Assets</h1>
      <p className="text-gray-600 mb-8">
        Explore all available cryptocurrency assets on the Alpaca trading platform. 
        Search by token name or symbol to find specific assets.
      </p>

      <div className="mb-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 pr-10 max-w-md"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[200px] text-red-500">
          <p>{error}</p>
        </div>
      ) : filteredTokens.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px] text-gray-500">
          <p>No tokens found matching your search.</p>
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            layout
          >
            <AnimatePresence mode="wait">
              {currentTokens.map((token) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 border rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                >
                  <h3 className="text-lg font-semibold text-white">{token.symbol}</h3>
                  <p className="text-white">{token.name}</p>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>Exchange: {token.exchange}</p>
                    <p>Min Order: {token.min_order_size}</p>
                    <p>Price Increment: {token.price_increment}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onBlur={handlePageInputBlur}
                  className="w-16 text-center"
                  min={1}
                  max={totalPages}
                />
                <span className="text-gray-400">of {totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
