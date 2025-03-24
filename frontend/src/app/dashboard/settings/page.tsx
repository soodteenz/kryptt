"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApiKeysStore } from "@/lib/store/api-keys-store";
import { User } from '@supabase/supabase-js';

const validateAlpacaKey = (key: string) => {
  return /^[A-Z0-9]{20}$/.test(key);
};

const validateAlpacaSecret = (key: string) => {
  return /^[A-Za-z0-9]{40}$/.test(key);
};

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { setKeys: setStoreKeys, clearKeys: clearStoreKeys } = useApiKeysStore();
  const [keys, setKeys] = useState({
    groq: "",
    alpacaApiKey: "",
    alpacaSecretKey: "",
    alpacaEndpoint: "https://paper-api.alpaca.markets/v2",
  });

  const [errors, setErrors] = useState({
    groq: "",
    alpacaApiKey: "",
    alpacaSecretKey: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      setIsLoading(false);
      fetchStoredKeys();
    };

    getUser();
  }, [router, supabase.auth]);

  const fetchStoredKeys = async () => {
    try {
      // Try to get from localStorage first
      const localKeys = {
        groq: localStorage.getItem('groq_key') || "",
        alpaca_api_key: localStorage.getItem('alpaca_api_key') || "",
        alpaca_secret_key: localStorage.getItem('alpaca_secret_key') || "",
        alpaca_endpoint: localStorage.getItem('alpaca_endpoint') || "https://paper-api.alpaca.markets/v2",
      };

      // If we have local keys, use them
      if (Object.values(localKeys).some(key => key !== "")) {
        setKeys({
          groq: localKeys.groq,
          alpacaApiKey: localKeys.alpaca_api_key,
          alpacaSecretKey: localKeys.alpaca_secret_key,
          alpacaEndpoint: localKeys.alpaca_endpoint,
        });
        return;
      }

      // Otherwise fetch from backend
      const response = await fetch("http://localhost:8000/api/v1/settings/keys");
      const data = await response.json();
      
      if (!data.message) {
        const newKeys = {
          groq: data.groq || "",
          alpacaApiKey: data.alpaca_api_key || "",
          alpacaSecretKey: data.alpaca_secret_key || "",
          alpacaEndpoint: data.alpaca_endpoint || "https://paper-api.alpaca.markets/v2",
        };
        setKeys(newKeys);
        
        // Store in localStorage
        localStorage.setItem('groq_key', newKeys.groq);
        localStorage.setItem('alpaca_api_key', newKeys.alpacaApiKey);
        localStorage.setItem('alpaca_secret_key', newKeys.alpacaSecretKey);
        localStorage.setItem('alpaca_endpoint', newKeys.alpacaEndpoint);
      }
    } catch (err) {
      setStatus({ 
        type: "error", 
        message: "Failed to fetch stored keys" 
      });
      console.error("Failed to fetch keys:", err);
    }
  };

  const handleKeyChange = (keyType: string, value: string) => {
    setKeys((prev) => ({ ...prev, [keyType]: value }));
    
    // Validate on change
    switch (keyType) {
      case "groq":
        setErrors(prev => ({
          ...prev,
          groq: ""
        }));
        break;
      case "alpacaApiKey":
        setErrors(prev => ({
          ...prev,
          alpacaApiKey: validateAlpacaKey(value) ? "" : "Invalid Alpaca API key format. Should be 20 characters long"
        }));
        break;
      case "alpacaSecretKey":
        setErrors(prev => ({
          ...prev,
          alpacaSecretKey: validateAlpacaSecret(value) ? "" : "Invalid Alpaca secret key format. Should be 40 characters long"
        }));
        break;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/settings/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groq: keys.groq,
          alpaca_api_key: keys.alpacaApiKey,
          alpaca_secret_key: keys.alpacaSecretKey,
          alpaca_endpoint: keys.alpacaEndpoint,
        }),
      });

      if (response.ok) {
        // Update Zustand store
        setStoreKeys(keys.alpacaApiKey, keys.alpacaSecretKey);
        
        // Store in localStorage
        localStorage.setItem('groq_key', keys.groq);
        localStorage.setItem('alpaca_api_key', keys.alpacaApiKey);
        localStorage.setItem('alpaca_secret_key', keys.alpacaSecretKey);
        localStorage.setItem('alpaca_endpoint', keys.alpacaEndpoint);
        
        toast.success("API keys saved successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to save API keys");
      }
    } catch (error) {
      console.error("Server connection error:", error);
      toast.error("Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearKeys = () => {
    // Clear Zustand store
    clearStoreKeys();
    
    // Clear localStorage
    localStorage.removeItem('groq_key');
    localStorage.removeItem('alpaca_api_key');
    localStorage.removeItem('alpaca_secret_key');
    localStorage.removeItem('alpaca_endpoint');

    // Clear form state
    setKeys({
      groq: "",
      alpacaApiKey: "",
      alpacaSecretKey: "",
      alpacaEndpoint: "https://paper-api.alpaca.markets/v2",
    });

    toast.success("API keys cleared successfully");
    setShowClearDialog(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">API Settings</h1>

      {status.message && (
        <div className={`p-4 rounded-lg mb-4 ${
          status.type === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
        }`}>
          {status.message}
        </div>
      )}

      {/* LLM Section */}
      <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">LLM Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Groq API Key
            </label>
            <Input
              type="password"
              placeholder="gsk_..."
              value={keys.groq}
              onChange={(e) => handleKeyChange("groq", e.target.value)}
              className={`bg-black/30 border-yellow-500/30 text-white ${errors.groq ? "border-red-500" : ""}`}
              disabled={isLoading}
            />
            {errors.groq && (
              <p className="mt-1 text-sm text-red-500">{errors.groq}</p>
            )}
          </div>
        </div>
      </div>

      {/* Trading Section */}
      <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">Trading Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Alpaca API Key
            </label>
            <Input
              type="password"
              placeholder="Enter your Alpaca API key"
              value={keys.alpacaApiKey}
              onChange={(e) => handleKeyChange("alpacaApiKey", e.target.value)}
              className={`bg-black/30 border-yellow-500/30 text-white ${errors.alpacaApiKey ? "border-red-500" : ""}`}
              disabled={isLoading}
            />
            {errors.alpacaApiKey && (
              <p className="mt-1 text-sm text-red-500">{errors.alpacaApiKey}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Alpaca Secret Key
            </label>
            <Input
              type="password"
              placeholder="Enter your Alpaca secret key"
              value={keys.alpacaSecretKey}
              onChange={(e) => handleKeyChange("alpacaSecretKey", e.target.value)}
              className={`bg-black/30 border-yellow-500/30 text-white ${errors.alpacaSecretKey ? "border-red-500" : ""}`}
              disabled={isLoading}
            />
            {errors.alpacaSecretKey && (
              <p className="mt-1 text-sm text-red-500">{errors.alpacaSecretKey}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="destructive"
          onClick={() => setShowClearDialog(true)}
          disabled={isLoading}
        >
          Clear All Keys
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading || Object.values(errors).some(error => error !== "")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will clear all your stored API keys. You will need to re-enter them to use the platform&apos;s features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearKeys}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 