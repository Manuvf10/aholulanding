# todoslosoficios (MVP Marketplace Local)

Frontend en Next.js App Router con datos mock para conectar clientes y profesionales por ubicación, con UI moderna en paleta marrón.

## Stack
- Next.js + TypeScript
- TailwindCSS
- API mock en `app/api/mock`

## Ejecutar local
1. `npm install`
2. `cp .env.example .env.local`
3. `npm run dev`
4. Abrir `http://localhost:3000`

## Credenciales demo
- Cliente: `cliente@demo.com / 123456`
- Profesional: `pro@demo.com / 123456`

## Deploy en Vercel
1. Subir repo a GitHub.
2. Crear proyecto en Vercel (framework Next.js detectado).
3. Configurar variables de entorno:
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
4. Deploy.

## Notas
- Persistencia en memoria (reinicia al reiniciar servidor).
- OAuth Google queda como placeholder de variables para futura integración.
