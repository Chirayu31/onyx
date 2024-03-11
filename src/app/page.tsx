
import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";
import { Features } from "@/components/home/features";
import HomeNav from "@/components/nav/homeNav";
export default function Home() {
  return (
    <main >
        <HomeNav/>

      <div className='flex py-10 px-96'>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" >
      PSEUDONYMOUS FORUM FOR IPS STUDENTS
    </h2>
      </div>
      <div className="text-center">
      <blockquote className=" text-centre px-48 border-l-2 pl-6 italic">
      UNVEIL YOUR THOUGHTS, CONNECT WITH PEERS, STAY UNSEEN
    </blockquote>
      </div>
      
      <div className="flex justify-center py-10">
      <Button className='text-xl font-semibold'>
      <SiGoogle className="mr-2 h-3 w-3 text-centre" /> Login with Google
    </Button>
      </div>
    <div className="flex w-full justify-center">
    <Features/>
    </div>
    


      
      
    </main>
  );
}
