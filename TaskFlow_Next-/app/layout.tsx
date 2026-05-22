import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/app/components/LogoutButton";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="fr">
      {" "}
      <body className={inter.className}>
        <header style={{ background: '#1B8C3E', color: 'white', padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>TaskFlow</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {user && <span>{user.name}</span>}
        {user && <LogoutButton />}
        {!user && <a href="/login" style={{ color: 'white' }}>Login</a>}
        </div>
        </header>
        <main>{children}</main>
      </body>{" "}
    </html>
  );
}
