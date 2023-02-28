'use client';

import 'react-day-picker/dist/style.css';

import type { Appointment, Prisma } from '@prisma/client';
import { format, isWeekend, setHours, setMinutes } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useReducer, useState, useTransition } from 'react';
import { DayPicker } from 'react-day-picker';

import { AppointmentForm } from './AppointmentForm';
import type { getAppointment } from './page';

export type AppointmentState = {
  organizerName: string;
  eventTitle: string;
  duration: number;
  location: string;
  selectedDate: Date;
};

function reducer(
  state: AppointmentState,
  nextState: Partial<AppointmentState>
) {
  return { ...state, ...nextState };
}

type AppointmentColumnsProps = {
  appointmentId: string;
  appointment: Prisma.PromiseReturnType<typeof getAppointment> | null;
};

export function AppointmentColumns({
  appointmentId,
  appointment,
}: AppointmentColumnsProps) {
  const [form, updateForm] = useReducer(reducer, {
    organizerName: appointment?.username ?? 'Jonh Doe',
    eventTitle: appointment?.title ?? 'Quick Chat',
    duration: appointment?.duration ?? 10,
    location: appointment?.location ?? '',
    selectedDate: appointment?.datetime
      ? new Date(appointment.datetime)
      : new Date(),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  async function onSubmitAppointment(selectedTime: string) {
    setIsFetching(true);

    const { selectedDate, ...formData } = form;
    const selectedDateString = selectedDate.toJSON();
    const datetime =
      selectedDateString.substring(0, 10) + 'T' + selectedTime + ':00.000';

    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/appointment`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        link: appointmentId,
        datetime,
      }),
    });

    setIsFetching(false);

    startTransition(() => {
      router.push('/thank-you');
    });
  }

  return (
    <div className="grid grid-cols-3 divide-x">
      <div className="">
        <AppointmentForm form={form} updateForm={updateForm} />
      </div>

      <div className="flex justify-center">
        <DayPicker
          mode="single"
          fromDate={new Date()}
          modifiersClassNames={{
            selected:
              'bg-blue-400 text-white hover:border-blue-400 hover:text-black',
            today: 'font-bold',
          }}
          selected={form.selectedDate}
          onSelect={(selected) => updateForm({ selectedDate: selected })}
        />
      </div>

      <div className="flex flex-col pl-4">
        <p className="text-2xl">{format(form.selectedDate, 'PP')}</p>

        <div>
          {!isWeekend(form.selectedDate) && (
            <div className="mt-4 flex flex-col gap-4">
              <button
                disabled={isMutating}
                className="h-10 rounded-md border border-blue-400 font-bold text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => onSubmitAppointment('13:00')}
              >
                1:00 PM
              </button>
              <button
                disabled={isMutating}
                className="h-10 rounded-md border border-blue-400 font-bold text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => onSubmitAppointment('14:00')}
              >
                2:00 PM
              </button>
              <button
                disabled={isMutating}
                className="h-10 rounded-md border border-blue-400 font-bold text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => onSubmitAppointment('15:00')}
              >
                3:00 PM
              </button>
              <button
                disabled={isMutating}
                className="h-10 rounded-md border border-blue-400 font-bold text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => onSubmitAppointment('16:00')}
              >
                4:00 PM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
