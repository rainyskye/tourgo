import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <p>A map is loading</p>,
  ssr: false
});

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Map />
    </div>
  );
}