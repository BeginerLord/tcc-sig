export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Autenticación desactivada para desarrollo rápido
  return <>{children}</>;
}
