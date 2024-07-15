'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const tasks = [

    {
      id: 1,
      name: 'Design Meeting',
      description: 'Discuss the new project design',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 2,
      name: 'Code Review',
      description: 'Review the latest code changes',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 3,
      name: 'Write Documentation',
      description: 'Document the new API endpoints',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 4,
      name: 'Team Standup',
      description: 'Daily team standup meeting',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 5,
      name: 'Client Call',
      description: 'Call with the client to discuss requirements',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 6,
      name: 'Bug Fixing',
      description: 'Fix bugs reported by the QA team',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 7,
      name: 'Feature Implementation',
      description: 'Implement the new feature for the project',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 8,
      name: 'Deployment',
      description: 'Deploy the latest build to production',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 9,
      name: 'Code Refactoring',
      description: 'Refactor the existing codebase for better performance',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
    {
      id: 10,
      name: 'Performance Testing',
      description: 'Test the application for performance issues',
      icon: 'https://super.so/icon/dark/activity.svg',
    },
  ];
  
export default function SelectMenu() {
  const [selected, setSelected] = useState(tasks[3])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label> */}
      <div className="relative mt-2 w-[66%]">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <img alt="" src={selected.icon} className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {tasks.map((task) => (
            <ListboxOption
              key={task.id}
              value={task}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <img alt="" src={task.icon} className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {task.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
