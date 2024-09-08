import Map from '@/components/Map'

export default function Home() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Map App</h1>
      <div className="h-[60vh] w-full">
        <Map />
      </div>
    </div>
  )
}