import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';

import type { HomePageParams } from '~/types/params';

type HomePageProps = {
  params: HomePageParams;
};

export default async function Home({ params }: HomePageProps) {
  if (!params.id) {
    const appointmentId = randomUUID();
    redirect(`/${appointmentId}`);
  }
}
