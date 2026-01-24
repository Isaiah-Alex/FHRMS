import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[256px_1fr] h-screen">
      <header className="col-span-2">
        <Header />
      </header>
      <aside className="overflow-auto">
        <Sidebar />
      </aside>
      <main className="overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}