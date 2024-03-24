import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsDemo() {
  return (
    <main className='flex mt-10 h-fit justify-center'>
      <Tabs defaultValue='signup' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='signup'>Signup</TabsTrigger>
          <TabsTrigger value='signin'>Sign-in</TabsTrigger>
        </TabsList>
        <TabsContent value='signin'>
          <Signin />
        </TabsContent>
        <TabsContent value='signup'>
          <Signup />
        </TabsContent>
      </Tabs>
    </main>
  )
}
