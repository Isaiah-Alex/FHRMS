import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20">
        <Header />
      </header>
      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="w-full lg:w-64 lg:shrink-0 lg:overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
