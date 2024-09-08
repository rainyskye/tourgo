import React from 'react';
import ScrollablePage from '@/components/ScrollablePage';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react'; // Make sure to import this icon

const SettingsPage: React.FC = () => {
  return (
    <ScrollablePage title="Settings">
      {/* Warning Prompt */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong className="font-medium text-yellow-800">Note:</strong> These settings are currently non-functional and are a work in progress. In the final version of the app, you would be able to customize your experience using these options.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600 mb-4">Manage your account settings and preferences.</p>
            {/* Placeholder for account settings */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="your@email.com" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Privacy</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600 mb-4">Manage your privacy settings and data usage preferences.</p>
            {/* Placeholder for privacy settings */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input id="location-sharing" name="location-sharing" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="location-sharing" className="ml-2 block text-sm text-gray-900">Share my location data</label>
              </div>
              <div className="flex items-center">
                <input id="data-collection" name="data-collection" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="data-collection" className="ml-2 block text-sm text-gray-900">Allow data collection for app improvement</label>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600 mb-4">Using your location, TourGo can display nearby locations, whether this be a nice place to get some coffee, a nearby park to take a stroll, or any attractions in the area.</p>
          </div>
        </section>
      </div>
    </ScrollablePage>
  );
};

export default SettingsPage;