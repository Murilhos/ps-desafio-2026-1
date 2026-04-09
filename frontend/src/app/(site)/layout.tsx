import Header from "./_components/Header";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="theme"> {/* O Header vai procurar por esta classe */}
        <Header />
        <main>
          {children}
        </main>
    </div>
  );
}
