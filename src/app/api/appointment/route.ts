export async function POST(request: Request) {
  const body = await request.json();

  const content = {
    title: body.eventTitle,
    username: body.organizerName,
    duration: body.duration,
    location: body.location,
    datetime: body.datetime,
    link: body.link,
  };
  const appointment = await prisma.appointment.upsert({
    where: {
      link: body.link,
    },
    create: {
      ...content,
    },
    update: {
      ...content,
    },
  });

  return new Response(JSON.stringify(appointment), {
    status: 200,
  });
}
