import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderList from '@/components/OrderList'


function App() {


  return (
    <div className='flex flex-col w-full h-full items-center gap-5'>
      <header className='bg-red-300 w-full h-20'>
      </header>
      <div className='flex flex-nowrap w-full px-28'>
        <div className='w-72 bg-yellow-100'>
          
        </div>
        <div className='flex w-full justify-center'>
          <Tabs defaultValue="all" className="w-full pt-4 pb-8 px-16">
            <TabsList className="flex flex-row w-full h-20 justify-between bg-white">
              <TabsTrigger className="tab-trigger" value="all">All</TabsTrigger>
              <TabsTrigger className="tab-trigger" value="processing">Processing</TabsTrigger>
              <TabsTrigger className="tab-trigger" value="delivering">Delivering</TabsTrigger>
              <TabsTrigger className="tab-trigger" value="completed">Completed</TabsTrigger>
              <TabsTrigger className="tab-trigger" value="canceled">Canceled</TabsTrigger>
            </TabsList>
            <TabsContent value="all"><OrderList /></TabsContent>
            <TabsContent value="processing"><OrderList /></TabsContent>
            <TabsContent value="delivering"><OrderList /></TabsContent>
            <TabsContent value="completed"><OrderList /></TabsContent>
            <TabsContent value="canceled"><OrderList /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default App
