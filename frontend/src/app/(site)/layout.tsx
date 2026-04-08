import Header from "./_components/Header";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
    <div>
        <Header />
        {children}
    </div>
  );
}