import './landing.css';

export const metadata = {
  title: 'Aholú',
  description: 'Asesoría energética',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
