## [2026-11-19] - Nexo Talento - Codex
**Qué se hizo:** Auditoría de preparación para publicidad, analítica del admin y autenticación.
**Resultado:** El build pasa, GTM y GA4 están declarados en `index.html` y existe instrumentación de eventos; sin embargo, el admin no usa Firebase, los endpoints administrativos no exigen sesión válida y la pestaña de analítica solo muestra datos estáticos/contadores locales. Se identificó además una credencial sensible almacenada en `data/admin-users.json`; no se reproduce aquí ni se modifica automáticamente.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Migrar autenticación, usuarios, leads y contenido a Firebase con reglas y verificación server-side; conectar GA4 Data API o una fuente equivalente al dashboard; retirar secretos del repositorio; validar producción, consentimiento, eventos y entrega real de leads antes de activar campañas.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-19] - Nexo Talento - Codex
**Qué se hizo:** Auditoría paralela de ciberseguridad, arquitectura y preservación visual; inicio de migración de autenticación y candidaturas a Firebase.
**Resultado:** Se retiró del servidor el login local y el token Base64, se protegieron las rutas administrativas con verificación de Firebase Admin, se sustituyó el login frontend por Firebase Auth, se añadieron reglas iniciales de Firestore/Storage y se retiraron del JSON versionado los datos de autenticación expuestos. El flujo de CV dejó de simular importaciones y ahora valida consentimiento, cuenta y carga privada; queda pendiente validar dependencias y entorno Firebase real.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance, find-security-vulnerabilities-in-code, application-security-testing.
**Próximos pasos:** Instalar/validar `firebase-admin` y actualizar lockfile; configurar variables server-side y claims admin en Firebase; probar reglas con Emulator; validar subida de CV, sesión expirada y roles; migrar leads/CMS a Firestore; revisar historial Git y rotar la credencial comprometida; ejecutar pruebas visuales desktop/móvil y auditoría final antes de publicidad.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/server.ts; C:/dev/proyectos/nexotalentos/package.json; C:/dev/proyectos/nexotalentos/src/server/firebase-admin.ts; C:/dev/proyectos/nexotalentos/src/lib/firebase.ts; C:/dev/proyectos/nexotalentos/src/auth/adminAuth.ts; C:/dev/proyectos/nexotalentos/src/pages/AdminPage.tsx; C:/dev/proyectos/nexotalentos/src/components/admin/AdminLoginPage.tsx; C:/dev/proyectos/nexotalentos/src/components/JobApplicationModal.tsx; C:/dev/proyectos/nexotalentos/src/features/candidates/application.ts; C:/dev/proyectos/nexotalentos/firestore.rules; C:/dev/proyectos/nexotalentos/storage.rules; C:/dev/proyectos/nexotalentos/data/admin-users.json

## [2026-11-23] - Nexo Talento - Antigravity (Hermes Web A+)
**Qué se hizo:** Creación e integración completa de la landing `/jobhunting` para el programa ProProfile, generación de activos visuales de alta resolución responsive para desktop y móvil con la paleta oficial (#0E243A Navy y #00A896 Cyan), teaser en la Home, banners contextuales en Vacantes y Footer, actualización de SEO/GEO (`sitemap.xml`, `robots.txt`, `llms.txt`, pre-render SSG de 11 rutas) y verificación de métricas del panel Admin.
**Resultado:** La ruta `/jobhunting` quedó completamente operativa con las 5 fases (0 a 4), las dos modalidades oficiales (Modelo a Éxito 300€ + 25% e Inversión Cerrada 450€), formulario de postulación conectado con respaldo local, Google Sheets y confirmación por correo, acordeón de preguntas frecuentes del cliente y garantía de reactivación. La compilación `npm run build` completó con éxito (código de salida 0) pre-renderizando las 11 rutas estáticas para indexación instantánea de Google y bots de IA.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Validar despliegue en servidor tras confirmación de Pablo (git push retenido según regla de oro).
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/types.ts; C:/dev/proyectos/nexotalentos/src/App.tsx; C:/dev/proyectos/nexotalentos/src/pages/JobhuntingPage.tsx; C:/dev/proyectos/nexotalentos/src/components/JobhuntingTeaserSection.tsx; C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/components/Footer.tsx; C:/dev/proyectos/nexotalentos/src/pages/HomePage.tsx; C:/dev/proyectos/nexotalentos/src/pages/VacantesPage.tsx; C:/dev/proyectos/nexotalentos/public/sitemap.xml; C:/dev/proyectos/nexotalentos/public/llms.txt; C:/dev/proyectos/nexotalentos/scripts/prerender.ts; C:/dev/proyectos/nexotalentos/server.ts; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se creó la primera pantalla de Nexo Talento Studio en `/crear-perfil`, con dos caminos: llenar datos manualmente o cargar un CV en PDF, Word o imagen. Se añadió carga independiente de fotografía profesional, vista previa y acceso desde los menús de escritorio y móvil.
**Resultado:** La nueva ruta compila y está preparada para conectar el extractor de documentos, el guardado en Firebase, la generación final del PDF y la publicación por slug. El flujo manual ya puede enviar la información al analizador de CV existente y mostrar un borrador revisable. No se hizo push ni se tocó la configuración de dominios.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Conectar extracción real de PDF/Word/imagen, persistencia del perfil y generación del PDF; después resolver el subdominio dinámico `*.nexotalento.com` en Vercel.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/App.tsx; C:/dev/proyectos/nexotalentos/src/types.ts; C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/scripts/prerender.ts; C:/dev/proyectos/nexotalentos/public/sitemap.xml; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se integró en la vista previa de `/crear-perfil` el contrato del generador genérico de PDF y un botón claro para generar y descargar el documento.
**Resultado:** El objeto enviado al generador se construye con los datos actuales del formulario y la foto cargada. Como todavía no existe un motor PDF cliente en el repositorio, el botón queda deshabilitado con un mensaje explícito hasta implementar esa utilidad; no se copiaron datos personales de Pablo ni se hizo push.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Implementar el motor PDF genérico detrás de `ProfilePdfGenerator` y habilitar el botón cuando exista esa utilidad.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/utils/profilePdfGenerator.ts; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se convirtió el cascarón visual del PDF del portafolio en un generador genérico para perfiles de Nexotalento, sin copiar datos personales ni microtexto oculto. Se añadió `jsPDF`, se normalizaron los datos del formulario y se corrigió el botón para descargar el PDF generado.
**Resultado:** El generador admite nombre, titular, resumen, contacto, foto, especialidades, formación, experiencia, referencias y enlaces. La compilación pasa y el botón de `/crear-perfil` ejecuta una descarga real del PDF.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Conectar extracción real de PDF/Word/imagen, persistencia del perfil en Firebase y publicación automática por subdominio.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/utils/profilePdfGenerator.ts; C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/package.json; C:/dev/proyectos/nexotalentos/package-lock.json; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se añadió la base de publicación por subdominio: detección de `usuario.nexotalento.com`, consulta del documento `profiles/{slug}` en Firebase y página pública con foto, titular, resumen, experiencia, formación, enlaces y estados de perfil no publicado. Se agregaron reglas para permitir lectura únicamente cuando `published == true`.
**Resultado:** El código ya reconoce `pablo-garcia.nexotalento.com` y busca su perfil en Firebase; la compilación pasa. La URL aún no puede mostrar datos hasta que exista un documento publicado y se configure `*.nexotalento.com` en Vercel/DNS.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Guardar desde `/crear-perfil` el perfil, subir la foto a Storage, generar el slug y publicar el documento; después verificar el comodín DNS en Vercel.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/features/profiles/profileHost.ts; C:/dev/proyectos/nexotalentos/src/features/profiles/publicProfile.ts; C:/dev/proyectos/nexotalentos/src/pages/PublicProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/App.tsx; C:/dev/proyectos/nexotalentos/firestore.rules; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se añadió el primer paso obligatorio de `/crear-perfil`: creación de cuenta con Firebase Auth y registro del usuario candidato en Firestore antes de acceder a la carga del CV o al formulario manual. Se añadió verificación de correo y se asoció el espacio inicial con el nombre y correo del usuario.
**Resultado:** El flujo ya empieza por crear el usuario y luego permite continuar hacia carga de PDF/Word/imagen o llenado manual. La compilación pasa. El guardado completo del perfil público y la publicación del slug siguen como siguiente paso.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Añadir inicio de sesión para usuarios existentes, guardar el perfil, subir foto/CV a Storage, reservar el slug y marcar el perfil como publicado.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se completó la primera versión del flujo de publicación: autenticación persistente, foto de perfil independiente, carga privada del CV fuente, generación/descarga del PDF, creación automática del slug y publicación del documento `profiles/{slug}`.
**Resultado:** La interfaz ya permite pasar de cuenta a datos, foto, borrador, PDF y publicación desde `/crear-perfil`. También se añadieron reglas de Storage para fotos y documentos del perfil. La compilación de producción pasa.
**Pendientes reales:** El extractor automático de PDF/Word/imagen todavía debe conectarse a un servicio de IA/OCR; por ahora la carga se conserva y el perfil se completa con el formulario. Falta configurar y verificar el DNS comodín `*.nexotalento.com` y desplegar las reglas de Firebase.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/storage.rules; C:/dev/proyectos/nexotalentos/AVANCE.md

