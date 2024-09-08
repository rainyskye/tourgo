import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <p>A map is loading</p>,
  ssr: false
});

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <main className="flex-grow relative">
        <Map />
      </main>
      <nav className="bg-blue-600 text-white p-4">
        <ul className="flex justify-around">
          <li>Map</li>
          <li>Nearby</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
}