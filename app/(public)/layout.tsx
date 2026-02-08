import { Navbar } from "../components/shared/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-theme="light">
      <Navbar />
      {children}
    </div>
  );
}
