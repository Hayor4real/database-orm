const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here

  const createdContact = await prisma.contact.create({
    data: {
      phone: "+49124746564",
      email: "my@gmail.com",
      customer: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log("Contact created", createdContact);

  const createdMovie = await prisma.movie.createMany({
    data: [
      {
        title: "The Lion King",
        runtimeMins: 225,
      },
      {
        title: "The Passion",
        runtimeMins: 300,
      },
    ],
  });
  console.log("createdMovie", createdMovie);

  const screenings = await prisma.screening.create({
    data: {
      createdAt: { select: { now: true } },
      movie: {
        connect: {
          id: 1,
        },
      },
    },
  });
  console.log("screening", screenings);
  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
