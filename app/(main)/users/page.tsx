import Hero from "@/components/Hero";

export default function UsersPage() {
  return (
    <div className="px-5 my-10 space-y-10">
      <Hero
        Title="Users"
        Subtitle="Manage system users and permissions"
        className=""
      />
      <div className="bg-white rounded-lg p-8 shadow-md">
        <p className="text-neutral-500">Users page content coming soon...</p>
      </div>
    </div>
  );
}
