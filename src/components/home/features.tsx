import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  
  export function Features() {
    return (
        <div className="flex gap-4 max-w-[600px]">
        <Card>
        <CardHeader>
          <CardTitle>Anonymous</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Onyx offers a safe space for open discussions without real-world identies</p>
        </CardContent>
      </Card>


<Card>
        <CardHeader>
          <CardTitle>Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Join a dynamic community of college students sharing ideas and connecting</p>
        </CardContent>
      </Card>




<Card>
        <CardHeader>
          <CardTitle>Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Onyx offers a safe space for open discussions without real-world identies</p>
        </CardContent>
      </Card>
        </div>
        



    )
  }

  


 
