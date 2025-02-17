import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      orderAlerts: true,
      stockAlerts: true,
      customerMessages: true
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true
    },
    display: {
      darkMode: true,
      compactView: false
    }
  });

  const handleSettingChange = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Admin Settings</h2>

      {/* Notifications Settings */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-[rgba(255,255,255,0.74)]">
                  Receive notifications for {key.toLowerCase()}
                </p>
              </div>
              <Switch
                checked={value}
                onChange={() => handleSettingChange('notifications', key)}
                className={`${
                  value ? 'bg-[#FFD700]' : 'bg-[#232323]'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    value ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Security</h3>
        <div className="space-y-4">
          {Object.entries(settings.security).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-[rgba(255,255,255,0.74)]">
                  Enable additional security features
                </p>
              </div>
              <Switch
                checked={value}
                onChange={() => handleSettingChange('security', key)}
                className={`${
                  value ? 'bg-[#FFD700]' : 'bg-[#232323]'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    value ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          ))}
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Display</h3>
        <div className="space-y-4">
          {Object.entries(settings.display).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-[rgba(255,255,255,0.74)]">
                  Customize your admin panel experience
                </p>
              </div>
              <Switch
                checked={value}
                onChange={() => handleSettingChange('display', key)}
                className={`${
                  value ? 'bg-[#FFD700]' : 'bg-[#232323]'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    value ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings; 