interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-yellow-100 p-4">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tikal Roadmap TodoApp</h1>
      </header>
      <main className="max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}