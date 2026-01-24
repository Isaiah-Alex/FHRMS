import Hero from "@/components/Hero";

export default function PharmacyPage() {
  return (
    <div className="px-5 my-10 space-y-10">
      <Hero
        Title="Pharmacy"
        Subtitle="Manage medications and prescriptions"
        className=""
      />
      <div className="bg-white rounded-lg p-8 shadow-md">
        <p className="text-neutral-500">Pharmacy page content coming soon...</p>
      </div>
    </div>
  );
}
