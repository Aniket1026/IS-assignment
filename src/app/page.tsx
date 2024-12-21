import { Search } from 'lucide-react'
import { StudentDashboard } from "@/components/student-dashboard"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="flex h-screen">
      <MainNav />
      <div className="flex-1">
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search your course" className="pl-8 w-[400px]" />
            </div>
          </div>
          <UserNav />
        </header>
        <main className="p-6">
          <StudentDashboard />
        </main>
      </div>
    </div>
  )
}
