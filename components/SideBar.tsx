'use client'

import {
  LineChart,
  NotebookPen,
  Plus,
  Timer,
  Weight,
  Workflow,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function SideBar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Weight className="h-6 w-6" />
            <span className="block lg:hidden">Training A.</span>
            <span className="hidden lg:block">Training Assistant</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === '/' ? 'bg-muted text-primary' : ''
              )}
            >
              <NotebookPen className="h-4 w-4" />
              Diary
            </Link>
            <Link
              href="/timer"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === '/timer' ? 'bg-muted text-primary' : ''
              )}
            >
              <Timer className="h-4 w-4" />
              Timer
            </Link>
            <Link
              href="/program"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === '/program' ? 'bg-muted text-primary' : ''
              )}
            >
              <Workflow className="h-4 w-4" />
              Program
            </Link>
            <Link
              href="/analytics"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === '/analytics' ? 'bg-muted text-primary' : ''
              )}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Add New Training</CardTitle>
              <CardDescription>
                Start a new session of training.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
