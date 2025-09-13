import { useState, type ReactNode } from 'react'
import { Button } from '../ui/button'
import { LayoutDashboard, LogOut, Menu, MessageCircle, MessageSquare, UserCog, X } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Link, Navigate, useLocation } from 'react-router-dom'

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <UserCog />
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <MessageCircle />
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageSquare />
  },
]

type AdminLayoutProps = {
  children: ReactNode
}

let isAdmin = true;

const AdminLayout = ({ children }: AdminLayoutProps) => {

  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile(!isMobile);
  }

  if(!isAdmin) return <Navigate to={'/admin/login'}/>

  const Sidebar = () => {
    const location = useLocation();

    const logoutHandler = ()=>{
        console.log("Logout!");
    }
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Talk
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sphere
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 ml-1 font-medium mt-1">
            &lt;by Ankit Singh Rajput&gt;
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {adminTabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link key={tab.name} to={tab.path}>
                  <div className={`
                    flex flex-row items-center gap-3 px-3 my-1 py-2.5 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-sm' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}>
                    <div className={`
                      ${isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                      }
                    `}>
                      {tab.icon}
                    </div>
                    <h2 className="font-medium text-sm">{tab.name}</h2>
                  </div>
                </Link>
              )
            })}
             <div onClick={logoutHandler}>
                  <div className={`
                    flex flex-row items-center gap-3 px-3 my-1 py-2.5 rounded-lg dark:hover:bg-gray-800 transition-all duration-200 group
                    
                  `}>
                    <div className={`
                     
                    `}>
                      <LogOut className='cursor-pointer dark:text-gray-400'/>
                    </div>
                    <h2 className="font-medium cursor-pointer dark:text-gray-300 text-sm">Logout</h2>
                  </div>
                </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Admin Panel v1.0
          </div>
        </div>
      </div>
    )
  }

  const SheetMobile = () => {
    return (
      <Sheet open={isMobile} onOpenChange={setIsMobile}>
        <SheetContent className='h-[100vh] bg-white dark:bg-gray-900 md:hidden w-[85%] p-0'>
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              Admin panel navigation
            </SheetDescription>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-950 relative min-h-screen'>
      <Button
        size={'icon'}
        variant={'ghost'}
        className='absolute md:hidden top-4 right-4 z-50 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        onClick={handleMobile}>
        {
          isMobile ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />
        }
      </Button>
      
      <SheetMobile />
      
      <div className='grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]'>
        <div className='hidden md:block'>
          <Sidebar />
        </div>
        <div className='bg-white dark:bg-gray-900 min-h-screen'>
          <main className="h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout