"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as Plot from "@observablehq/plot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useApiKeysStore } from "@/lib/store/api-keys-store";
import { ApiKeysModal } from "@/components/ui/api-keys-modal";

// Types for our account data
interface AccountData {
  equity: string;
  cash: string;
  buying_power: string;
  long_market_value: string;
  short_market_value: string;
  daytrade_count: number;
  pattern_day_trader: boolean;
}

export default function DashboardPage() {
  const { hasKeys } = useApiKeysStore();
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/info`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch account data');
      }

      const data = await response.json();
      setAccountData(data);
    } catch (error) {
      console.error('Error fetching account data:', error);
      setError('Failed to fetch account data. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    await fetchAccountData();
  };

  // Create ratio chart using Plot
  useEffect(() => {
    if (!accountData || !chartRef.current) return;

    const longValue = parseFloat(accountData.long_market_value);
    const shortValue = Math.abs(parseFloat(accountData.short_market_value));
    const total = longValue + shortValue;
    
    // Create data points for visualization
    const data = Array.from({ length: 50 }, (_, i) => ({
      x: i < (longValue / total) * 50 ? 'Long' : 'Short',
      y: Math.random(),
      value: i < (longValue / total) * 50 ? longValue : shortValue
    }));

    const plot = Plot.plot({
      height: 200,
      width: 400,
      padding: 20,
      grid: true,
      color: {
        domain: ['Long', 'Short'],
        range: ['#22c55e', '#ef4444']
      },
      marks: [
        Plot.dot(data, {
          x: "x",
          y: "y",
          fill: "x",
          title: d => `${d.x}: $${d.value.toLocaleString()}`
        })
      ]
    });

    chartRef.current.innerHTML = '';
    chartRef.current.append(plot);
    return () => plot.remove();
  }, [accountData]);

  // Initial data fetch
  useEffect(() => {
    fetchAccountData();
  }, [hasKeys, fetchAccountData]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (!hasKeys) {
    return <ApiKeysModal />;
  }

  // If there's an error, show it at the top
  if (error) {
    return (
      <div className="space-y-8">
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button 
          onClick={handleRetry} 
          variant="outline"
          size="sm"
          disabled={isRetrying}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Retrying...' : 'Try Again'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Today</h2>
        <Button 
          onClick={fetchAccountData} 
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Main metrics grid */}
      <motion.div 
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Total Equity */}
        <motion.div variants={cardVariants} className="col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Equity</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-20 w-56 mx-auto" />
              ) : (
                <div className="text-5xl font-bold text-center py-4">
                  ${accountData ? parseFloat(accountData.equity).toLocaleString() : '0'}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Cash */}
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Cash</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-10 w-40" />
              ) : (
                <div className="text-3xl font-bold">
                  ${accountData ? parseFloat(accountData.cash).toLocaleString() : '0'}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Buying Power */}
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Buying Power</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-10 w-40" />
              ) : (
                <div className="text-3xl font-bold">
                  ${accountData ? parseFloat(accountData.buying_power).toLocaleString() : '0'}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Long/Short Ratio Chart */}
        <motion.div variants={cardVariants} className="col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Long/Short Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <div ref={chartRef} className="flex justify-center" />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Daytrade Counter */}
        <motion.div variants={cardVariants} className="col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Daytrade Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-40" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-2xl">
                    {accountData ? `${accountData.daytrade_count}/4 daytrades used` : '0/4 daytrades used'}
                  </span>
                  {accountData?.pattern_day_trader && (
                    <span className="text-red-500 text-xl font-medium">Pattern Day Trader</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Note about auto-refresh */}
      <p className="text-sm text-muted-foreground">
        Note: Auto-refresh functionality coming soon. Currently using manual refresh.
      </p>
    </div>
  );
} 