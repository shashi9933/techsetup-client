import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Switch } from '@headlessui/react';

const Settings = () => {
  const { settings, updateSettings } = useSettings();

  const handleNotificationChange = (key, value) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {/* Theme Settings */}
        <div className="bg-[#181818] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Theme</h2>
          <div className="flex items-center space-x-4">
            {['dark', 'light'].map((theme) => (
              <button
                key={theme}
                onClick={() => updateSettings({ theme })}
                className={`px-4 py-2 rounded-lg capitalize ${
                  settings.theme === theme
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-[#232323] text-white'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#181818] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <Switch
                  checked={value}
                  onChange={(checked) => handleNotificationChange(key, checked)}
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

        {/* Currency Settings */}
        <div className="bg-[#181818] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Currency</h2>
          <select
            value={settings.currency}
            onChange={(e) => updateSettings({ currency: e.target.value })}
            className="w-full bg-[#232323] text-white rounded-lg p-3 border border-[rgba(255,255,255,0.1)]"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
          </select>
        </div>

        {/* Language Settings */}
        <div className="bg-[#181818] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Language</h2>
          <select
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="w-full bg-[#232323] text-white rounded-lg p-3 border border-[rgba(255,255,255,0.1)]"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings; 