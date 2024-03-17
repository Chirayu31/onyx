import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const topicsData = [
  {
    topic: 'Clubs',
    items: [
      'GDSC',
      'Singing',
      'Dancing',
      'Photography',
      'Cultural',
      'IPS Tech',
    ],
  },
  {
    topic: 'Events',
    items: [
      'Swaranjali',
      'Exhibition',
      'Foundation Day',
      'Workshops',
      'Promotional',
    ],
  },
  {
    topic: 'Placements',
    items: [
      'Off-campus opportunities',
      'Preparation Resources',
      'Previous Companies',
    ],
  },
  {
    topic: 'Festivals',
    items: [
      'Diwali',
      'Holi',
      'Navratri',
      'Eid',
      'Christmas',
      'Republic Day',
      'Independence Day',
      'Gandhi Jayanti',
    ],
  },
  {
    topic: 'Sports',
    items: [
      'Cricket',
      'Basketball',
      'Football',
      'Table Tennis',
      'Volleyball',
      'Chess',
      'Carrom',
      'Kabbadi',
    ],
  },
  {
    topic: 'CSE Prep',
    items: [
      'DSA',
      'Android Development',
      'Web development',
      'Blockchain',
      'AI/ML',
      'Aptitude',
      'Core Subjects',
    ],
  },
  { topic: 'Confessions', items: [] },
]

async function seed() {
  for (const topicData of topicsData) {
    const topic = await prisma.topics.create({
      data: {
        title: topicData.topic,
        subtopics: {
          createMany: {
            data: topicData.items.map((item) => ({ title: item })),
          },
        },
      },
    })

    console.log(`Created topic: ${topic.title}`)
  }
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
