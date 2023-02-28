import { Listbox, Transition } from '@headlessui/react';
import { ClockIcon, GlobeAmericasIcon } from '@heroicons/react/24/solid';
import { Dispatch, Fragment, useEffect, useState } from 'react';

import type { AppointmentState } from './AppointmentColumns';

const durationOptions = [
  { value: 10, label: '10 minutes' },
  { value: 30, label: '30 minutes' },
];

const locationOptions = ['Asia/Kuala Lumpur'];

type AppointmentFormProps = {
  form: AppointmentState;
  updateForm: Dispatch<Partial<AppointmentState>>;
};

export function AppointmentForm({ form, updateForm }: AppointmentFormProps) {
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);

  useEffect(() => {
    if (!form.location) {
      updateForm({ location: locationOptions[0] });
    }
  }, [form.location, updateForm]);

  return (
    <div className="flex flex-col">
      <label htmlFor="organizerName">
        <input
          id="organizerName"
          className="text-gray-600 focus:outline-none"
          placeholder="Jonh Doe"
          value={form.organizerName}
          onChange={(event) =>
            updateForm({ organizerName: event.target.value })
          }
        />
      </label>

      <label htmlFor="eventTitle">
        <input
          id="eventTitle"
          className="text-3xl font-bold focus:outline-none"
          placeholder="Quick Chat"
          value={form.eventTitle}
          onChange={(event) => updateForm({ eventTitle: event.target.value })}
        />
      </label>

      <div className="mt-4 flex items-center">
        <ClockIcon className="h-5 w-5 text-gray-600" />

        <Listbox
          value={selectedDuration}
          onChange={(option) => {
            setSelectedDuration(option);
            updateForm({ duration: option.value });
          }}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white px-1 pl-2 pr-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              {
                durationOptions.find((option) => option.value === form.duration)
                  ?.label
              }
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {durationOptions.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-2 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={selected ? 'font-medium' : 'font-normal'}
                      >
                        {option.label}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="flex items-center">
        <GlobeAmericasIcon className="h-5 w-5 text-gray-600" />

        <Listbox
          value={form.location}
          onChange={(option) => {
            updateForm({ location: option });
          }}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-2 pr-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              {locationOptions.find((option) => option === form.location)}
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {locationOptions.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-2 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={selected ? 'font-medium' : 'font-normal'}
                      >
                        {option}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
