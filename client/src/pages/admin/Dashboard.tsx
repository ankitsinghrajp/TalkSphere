
import AdminLayout from '../../components/layout/AdminLayout'
import { Bell, MessageCircle, MessageSquare, Settings, User, Users } from 'lucide-react'
import moment from 'moment'
import { Button } from '../../components/ui/button'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'

const Dashboard = () => {
  const Appbar = (
    <div className='py-4 md:h-[12%] h-[8%] px-4 md:py-4 md:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm'>
      <div className='flex justify-between items-center gap-3'>
        {/* Left Section - Settings and Search */}
        <div className='flex items-center gap-2 md:gap-4 flex-1 min-w-0'>
          <div className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer'>
            <Settings className='h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300 flex-shrink-0' />
          </div>
          
          <div className='flex mt-1 items-center gap-2 flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-none'>
            <div className='relative flex-1 min-w-0'>
              <input
                className='w-full pr-2 pl-3 md:pl-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-0 shadow-sm'
                type="text"
                placeholder='Search...'
              />
            </div>
            <Button className='rounded-xl font-medium text-sm flex-shrink-0 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm'>
              Search
            </Button>
          </div>
        </div>
        
        {/* Right Section - Date and Notifications */}
        <div className='flex items-center gap-2 md:gap-4 flex-shrink-0'>
          {/* Date - Hidden on small screens, visible on large screens */}
          <span className='hidden lg:block text-xs xl:text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap font-medium'>
            {moment().format('MMM Do, YYYY')}
          </span>
          
          {/* Date - Abbreviated for medium screens */}
          <span className='hidden md:block lg:hidden text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap font-medium'>
            {moment().format('MMM Do, YYYY')}
          </span>
          
          {/* Notification Bell */}
          <div className='relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer'>
            <Bell className='h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors' />
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900'></div>
          </div>
        </div>
      </div>
    </div>
  )

  const Widgets = (
    <div className='flex md:flex-row flex-col gap-4 md:gap-6 mx-4 md:mx-8 mb-6'>
      <Widget title={'Users'} value={34} Icon={<User/>}/>
      <Widget title={'Chats'} value={3} Icon={<MessageCircle/>}/>
      <Widget title={'Messages'} value={453} Icon={<MessageSquare/>}/>
    </div>
  )

  return (
    <AdminLayout>
      <div className='w-full h-[100vh] mx-auto bg-gray-50 dark:bg-gray-900'>
        {Appbar}
        <div className='md:h-[88%] h-[92%] pb-20 pt-6 w-full overflow-y-auto'>
          <div className='flex flex-col md:px-8 px-4 md:py-4 py-2 mx-auto max-w-7xl'>
            
            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
              
              {/* Line Chart */}
              <div className='lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Last Messages</h2>
                  <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span>Last 7 days</span>
                  </div>
                </div>
                <div className='h-[320px]'>
                  <LineChart value={[100,50,40,30,20,10,90,80,0]}/>
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Chat Types</h2>
                  <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full'>
                    <Users className='h-4 w-4 text-gray-600 dark:text-gray-300'/> 
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>vs</span> 
                    <User className='h-4 w-4 text-gray-600 dark:text-gray-300'/>
                  </div>
                </div>
                <div className='h-[320px] flex justify-center items-center'>
                  <DoughnutChart labels={["Single Chats","Group Chats"]} value={[23,66]}/>
                </div>
              </div>
            </div>

            {/* Widgets Section */}
            {Widgets}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

const Widget = ({title, value, Icon}) => {
  return (
    <div className='flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
              <div className='text-blue-600 dark:text-blue-400'>
                {Icon}
              </div>
            </div>
            <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide'>
              {title}
            </h3>
          </div>
          <div className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            {value}
          </div>
        </div>
        
        <div className='flex flex-col items-end'>
          <div className='text-xs text-green-600 dark:text-green-400 font-medium mb-1'>
            +12.5%
          </div>
          <div className='text-xs text-gray-500 dark:text-gray-400'>
            vs last month
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className='mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1'>
        <div className='bg-blue-600 dark:bg-blue-500 h-1 rounded-full' style={{width: '68%'}}></div>
      </div>
    </div>
  )
}

export default Dashboard