import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CogIcon, MoonIcon, SunIcon, BellIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/outline';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const settingsOptions = [
    {
      title: 'Account',
      icon: <UserIcon className="w-5 h-5" />,
      description: 'Manage your account settings and preferences',
      onClick: () => {}
    },
    {
      title: 'Theme',
      icon: darkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />,
      description: 'Switch between light and dark mode',
      toggle: true,
      value: darkMode,
      onChange: () => setDarkMode(!darkMode)
    },
    {
      title: 'Notifications',
      icon: <BellIcon className="w-5 h-5" />,
      description: 'Manage your notification preferences',
      toggle: true,
      value: notifications,
      onChange: () => setNotifications(!notifications)
    },
    {
      title: 'Privacy',
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      description: 'Control your privacy settings',
      onClick: () => {}
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-[#232323] transition-colors"
      >
        <CogIcon className="w-6 h-6 text-white" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-[#181818] p-6 w-full">
            <Dialog.Title className="text-2xl font-bold text-white mb-6">
              Settings
            </Dialog.Title>

            <div className="space-y-6">
              {settingsOptions.map((option) => (
                <div key={option.title} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-[#FFD700]">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{option.title}</h3>
                      <p className="text-sm text-[rgba(255,255,255,0.74)]">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  {option.toggle ? (
                    <button
                      onClick={option.onChange}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${option.value ? 'bg-[#FFD700]' : 'bg-[#333]'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${option.value ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={option.onClick}
                      className="text-[#FFD700] hover:text-[#FFE55C] text-sm font-medium"
                    >
                      Manage
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-black bg-[#FFD700] rounded-lg hover:bg-[#FFE55C] 
                  transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Settings; 