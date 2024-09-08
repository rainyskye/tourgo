import React from 'react';

const AboutPage: React.FC = () => {
  const gitSha = process.env.NEXT_PUBLIC_GIT_SHA || 'unknown';
  const version = `0.1.0 (${gitSha})`;
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About TourGo</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          Using your location, TourGo can display nearby locations, whether this be a nice place to get some coffee, a nearby park to take a stroll, or any attractions in the area. your device&apos;s location (with your permission), TourGo shows you interesting locations near you. You can discover new places, get directions, and even see promotions or special offers from local businesses.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Privacy & Security</h2>
        <p className="text-gray-700">
          We value your privacy. Your location data is only used with Google Maps to provide you with relevant nearby locations and is never stored or shared with third parties. You can manage your location settings at any time through your device settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-700">
          We&apos;re always looking to improve TourGo. If you have any questions, suggestions, or feedback, please don&apos;t hesitate to reach out to us at support@tourgo.com.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-500">
        <p>© 2024 TourGo. All rights reserved.</p>
        <p className="mt-2">Version {version}</p>
      </footer>
    </div>
  );
};

export default AboutPage;
