import './landing.css';

export const metadata = {
  title: 'Aholú',
  description: 'Asesoría energética para ahorrar en tu factura de luz. Sube tu factura y nosotros bajamos el precio.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FFD700', // Color de la barra en móviles (Chrome)
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Aholú',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Meta viewport obligatorio para diseño responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Evita que Safari/iOS cambie los colores (modo oscuro) */}
        <meta name="color-scheme" content="light" />
        
        {/* Prevenir Smart Invert en Safari */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (prefers-color-scheme: dark) {
                html {
                  filter: none !important;
                  background: none !important;
                }
                body, .aholu-landing, .hero, .section, .modal, .footer {
                  filter: none !important;
                  background: #ffffff !important;
                  color: #121212 !important;
                }
                img, svg, button, input, textarea {
                  filter: none !important;
                }
              }
              html {
                color-scheme: light;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}