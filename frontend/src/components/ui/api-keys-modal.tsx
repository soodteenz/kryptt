import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function ApiKeysModal() {
  const router = useRouter()

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>API Keys Required</AlertDialogTitle>
          <AlertDialogDescription>
            To use Kryptt, you need to set up your Alpaca API keys. Please configure your keys in the settings page to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button 
            onClick={() => router.push('/dashboard/settings')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Go to Settings
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 