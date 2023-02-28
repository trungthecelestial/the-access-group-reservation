import { prisma } from '~/db/prisma';
import type { HomePageParams } from '~/types/params';

import { AppointmentColumns } from './AppointmentColumns';

async function getAppointment(appointmentId: string) {
  const appointment = await prisma.appointment.findFirst({
    select: {
      username: true,
      title: true,
      location: true,
      duration: true,
      datetime: true,
    },
    where: {
      link: appointmentId,
    },
  });
  return appointment;
}

type AppointmentPageProps = {
  params: HomePageParams;
};

export default async function AppointmentPage({
  params,
}: AppointmentPageProps) {
  const appointmentId = params.id;
  const appointment = await getAppointment(appointmentId);

  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-gray-300">
      <div className="container mx-auto rounded-md bg-white p-4 shadow-sm">
        <AppointmentColumns
          appointmentId={appointmentId}
          appointment={appointment}
        />
      </div>
    </main>
  );
}
