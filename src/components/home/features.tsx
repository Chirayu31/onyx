import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Features() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-5 sm:mx-0  gap-6  max-w-[800px]'>
      <Card>
        <CardHeader>
          <CardTitle>Anonymous</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Safe, anonymous discussions on Onyx. No real-world identities.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Join vibrant student community. Share ideas, connect, grow together.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Actively participate in diverse exchanges. Embrace pseudonymity.
            Safe space.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
