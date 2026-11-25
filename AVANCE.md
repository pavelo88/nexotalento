## [2026-11-19] - Nexo Talento - Codex
**Qué se hizo:** Auditoría de preparación para publicidad, analítica del admin y autenticación.
**Resultado:** El build pasa, GTM y GA4 están declarados en `index.html` y existe instrumentación de eventos; sin embargo, el admin no usa Firebase, los endpoints administrativos no exigen sesión válida y la pestaña de analítica solo muestra datos estáticos/contadores locales. Se identificó además una credencial sensible almacenada en `data/admin-users.json`; no se reproduce aquí ni se modifica automáticamente.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Migrar autenticación, usuarios, leads y contenido a Firebase con reglas y verificación server-side; conectar GA4 Data API o una fuente equivalente al dashboard; retirar secretos del repositorio; validar producción, consentimiento, eventos y entrega real de leads antes de activar campañas.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se sustituyeron las transiciones CSS que ocultaban secciones por animaciones reales con `motion/react`, replicando el patrón de entrada por viewport de Baterías: título primero y tarjetas escalonadas después.
**Resultado:** No se reserva espacio vacío mientras se hace scroll; la portada local mantiene todo su contenido, las tarjetas de servicios y vacantes aparecen de forma progresiva, y `npm run build` finalizó correctamente. Se comprobó la portada en `http://127.0.0.1:3001`.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Validar las transiciones en el despliegue de Vercel tras la publicación y completar la configuración privada de Firebase Admin para habilitar persistencia productiva.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/motion/Reveal.tsx; C:/dev/proyectos/nexotalentos/src/pages/HomePage.tsx; C:/dev/proyectos/nexotalentos/src/pages/ServiciosPage.tsx; C:/dev/proyectos/nexotalentos/src/components/services/CompactServicesGrid.tsx; C:/dev/proyectos/nexotalentos/src/components/JobsPortal.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPainPoints.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se restauró la estructura de navegación que no debía haberse simplificado: el desplegable de Servicios y la Calculadora ROI en escritorio y móvil.
**Resultado:** Se mantiene la cabecera navy opaca solicitada y el único ajuste de nomenclatura en navegación es `Tu próximo empleo` para la ruta de Jobhunting. `npm run build` y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Validar visualmente el navbar desplegado tras la publicación.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se añadió un sistema nativo de entradas al hacer scroll, escalonado de tarjetas y avance automático pausado por interacción en el carrusel restaurado de Áreas de Especialización.
**Resultado:** La portada, Vacantes y las secciones de Jobhunting dejan de sentirse estáticas sin introducir una librería pesada ni alterar la paleta clara. Se respetan las preferencias de reducción de movimiento del dispositivo. `npm run lint`, `npm run build` y `git diff --check` pasan; se revisó la instancia local en `http://127.0.0.1:3001`.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Revisar el movimiento en escritorio y móvil con el usuario antes de desplegar los cambios acumulados.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/hooks/useScrollReveal.ts; C:/dev/proyectos/nexotalentos/src/App.tsx; C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/pages/HomePage.tsx; C:/dev/proyectos/nexotalentos/src/components/AreasEspecializacionSection.tsx; C:/dev/proyectos/nexotalentos/src/components/JobsPortal.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPainPoints.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPhases.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingDifferentiators.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingForm.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingFaq.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se retiró el efecto de entrada que ocultaba secciones; se recuperaron navegación a Tu próximo empleo, barra móvil de firma oscura, filtros avanzados y fichas completas de Vacantes. Se añadió acceso/registro antes de postular, inicio de sesión para cuentas existentes y prevención de duplicados por vacante.
**Resultado:** La portada vuelve a renderizar sin el bloque vacío después de las marcas. Las cuatro vacantes recuperan el contenido de Quito y Guayaquil solicitado, con requisitos, ubicación y bandas salariales. `npm run build` pasó y la portada local fue revisada.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Probar el registro y la postulación real contra Firebase una vez confirmada la configuración publicada de Auth, Firestore y Storage.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/App.tsx; C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/components/navigation/MobileActionBar.tsx; C:/dev/proyectos/nexotalentos/src/components/services/CompactServicesGrid.tsx; C:/dev/proyectos/nexotalentos/src/components/JobsPortal.tsx; C:/dev/proyectos/nexotalentos/src/components/JobApplicationModal.tsx; C:/dev/proyectos/nexotalentos/src/components/profile/AccountSetupCard.tsx; C:/dev/proyectos/nexotalentos/src/features/candidates/application.ts; C:/dev/proyectos/nexotalentos/src/data/jobsData.ts; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se corrigió el modo claro global de tarjetas, se restauró el carrusel original con imágenes de Áreas de Especialización y se simplificó la navegación pública.
**Resultado:** El navy de `.glass-card` queda limitado al hero de portada; Jobhunting ya no aparece en desktop ni móvil, Servicios es un enlace simple sin menú de tarjetas y Vacantes conserva únicamente la búsqueda textual, sin filtros laterales. Se comprobó visualmente en localhost Contacto y Vacantes, además de compilar correctamente.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Mantener la revisión visual en modo claro antes de desplegar; no extender el tratamiento oscuro fuera de bloques visuales intencionales.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/components/AreasEspecializacionSection.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se reparó un intento fallido de división de componentes que había dejado `BlogPage.tsx` truncado. Se restauró el archivo completo desde HEAD y se conservó únicamente la división compilable de `AdminDashboard` en layout y paneles.
**Resultado:** `npm run lint` y `npm run build` pasan; el prerender vuelve a generar 12 rutas, incluyendo `/crear-perfil` y `/admin`. `AdminDashboard.tsx` quedó en 441 líneas y sus archivos extraídos están por debajo de 500; `BlogPage.tsx` quedó íntegro en 863 líneas para evitar otra ruptura.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** No dividir `BlogPage.tsx` hasta hacerlo en una rama o copia verificable; configurar en Vercel las variables `VITE_FIREBASE_*` del `.env` para que la creación de trabajadores funcione en producción.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/admin/AdminDashboard.tsx; C:/dev/proyectos/nexotalentos/src/components/admin/AdminDashboardLayout.tsx; C:/dev/proyectos/nexotalentos/src/components/admin/AdminDashboardPrimaryTabs.tsx; C:/dev/proyectos/nexotalentos/src/components/admin/AdminDashboardSecondaryTabs.tsx; C:/dev/proyectos/nexotalentos/src/pages/BlogPage.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

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

## [2026-11-23] - Nexo Talento - Codex
**Qué se hizo:** Se realizó una auditoría de código, compilación, endpoints locales, reglas Firebase, SEO, dependencias y configuración de despliegue, sin modificar la aplicación.
**Resultado:** El build y el prerender de 12 rutas pasan; el endpoint administrativo devuelve 401 sin token. Se identificaron riesgos prioritarios en lectura pública de archivos de perfil en Storage, persistencia local de leads, exposición de PII en logs/correos, dependencias vulnerables, CSP permisiva y archivos monolíticos.
**Skills usadas/modificadas:** reglas-seguridad, aplicación-seguridad, find-security-vulnerabilities-in-code, modularidad-archivos, registrar-avance.
**Próximos pasos:** Corregir primero la privacidad de Storage y persistencia de leads; después validar autenticación Firebase en staging, actualizar dependencias de forma controlada y realizar pruebas visuales/funcionales completas.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/AVANCE.md


## [2026-11-23] - Nexo Talento - Antigravity (Hermes Web A+)
**Qué se hizo:** Implementación de validación de correo real en tiempo real (sintaxis estricta RFC, lista negra de correos temporales/desechables y resolución DNS de registros MX activos en Node.js vía resolvers públicos 8.8.8.8 / 1.1.1.1), endpoint `/api/validate-email`, modularización del formulario de alta en `AccountSetupCard.tsx`, robustecimiento del esquema de usuario en Firestore (`users/{uid}`) con auditoría inmutable (`role: 'afiliate'`, `status: 'pending_verification'`, `emailVerified: false`, `termsAccepted: true`), y refactorización de `CreateProfilePage.tsx` de 499 a 346 líneas.
**Resultado:** Cero errores de TypeScript (`npx tsc --noEmit`), compilación de producción y pre-renderizado de 12 rutas estáticas exitoso (`npm run build` exit code 0). Se impide el registro de cuentas fraudulentas o correos inexistentes. Git push retenido según la regla de oro a la espera de aprobación de Pablo.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Obtener autorización de Pablo para `git push`, desplegar reglas de Firestore/Storage actualizadas y avanzar con el módulo de inscripciones y cursos de B1 Academy.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/server.ts; C:/dev/proyectos/nexotalentos/src/server/emailValidator.ts; C:/dev/proyectos/nexotalentos/src/lib/emailValidator.ts; C:/dev/proyectos/nexotalentos/src/components/profile/AccountSetupCard.tsx; C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/features/candidates/application.ts; C:/dev/proyectos/nexotalentos/firestore.rules; C:/dev/proyectos/nexotalentos/storage.rules; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se ajustó la experiencia móvil de Jobhunting para mostrar fases y bloqueos en dos columnas, con numeración integrada y copy más orientado a conversión. Se añadieron captura de atribución UTM/click IDs, manejo real de errores en formularios y eventos de generación de lead.
**Resultado:** Lint, build de Vite, prerender y bundle del servidor completan correctamente; se eliminó el aviso de optimización de SVG instalando `svgo`. La auditoría de publicidad detectó que Meta/TikTok aún tienen IDs de marcador y que la persistencia/variables de producción deben verificarse antes de invertir presupuesto.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Configurar IDs reales y variables en Vercel, probar un lead real en producción y corregir los riesgos pendientes de Storage, persistencia y dependencias antes de activar campañas.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPhases.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPainPoints.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingForm.tsx; C:/dev/proyectos/nexotalentos/src/components/ContactSection.tsx; C:/dev/proyectos/nexotalentos/src/pages/ContactoPage.tsx; C:/dev/proyectos/nexotalentos/src/components/TalentAssessmentWizard.tsx; C:/dev/proyectos/nexotalentos/src/lib/attribution.ts; C:/dev/proyectos/nexotalentos/server.ts; C:/dev/proyectos/nexotalentos/package.json; C:/dev/proyectos/nexotalentos/package-lock.json; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se corrigió la proporción de la imagen del hero móvil de Jobhunting: el recurso vertical `768x1376` dejó de estar limitado a una altura fija que recortaba la escena y ahora conserva una proporción vertical adecuada para mostrar la candidata y el contexto visual.
**Resultado:** La revisión visual local confirma un hero más alto, con el mismo ancho y sin el recorte superior que ocultaba la imagen. Lint, build, prerender de 12 rutas y bundle del servidor pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Revisar el comportamiento final en el dominio desplegado después del deploy automático.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingHero.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se corrigió el glassmorphism visible del inicio: se eliminaron fondos sólidos `bg-white` que anulaban el desenfoque y se creó una superficie glass compartida con transparencia, saturación, blur, borde luminoso y sombra interna para tarjetas del hero, métricas y logos.
**Resultado:** La página `/` ahora deja ver el fondo fotográfico a través de las tarjetas en modo claro; la comprobación visual local confirma el efecto sobre el hero y el strip de confianza. Lint y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Revisar las secciones internas que aún usan tarjetas intencionalmente sólidas, como tablas y formularios, sin convertir controles de entrada en superficies transparentes ilegibles.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/components/Hero.tsx; C:/dev/proyectos/nexotalentos/src/components/BragBar.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se completó la carga real de CV: arrastre y soltado, validación de formato/tamaño, lectura Base64 desde el formulario y extracción de texto PDF/DOCX en el backend. Se eliminó la película de “Garantía de Reactivación” superpuesta en el hero de Jobhunting y se reforzó el glassmorphism visible de las tarjetas de creación de perfil.
**Resultado:** Un PDF local real fue procesado por `/api/analyze-cv` con HTTP 200 y devolvió un borrador estructurado. Lint, build y `git diff --check` pasan; se verificó visualmente la tarjeta glassmorphism en `http://localhost:4174/crear-perfil`.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Probar en navegador con el CV definitivo y revisar en producción que Firebase Storage mantenga permisos de subida para el usuario autenticado.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/server.ts; C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingHero.tsx; C:/dev/proyectos/nexotalentos/package.json; C:/dev/proyectos/nexotalentos/package-lock.json; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se ajustó Jobhunting para usar la marca oscura al inicio del navbar transparente, aumentar el hero móvil un 10 %, cambiar la navegación móvil de fases a un único selector y renombrar el CTA a “Crear tu perfil”. También se añadió el proxy local `/api` hacia el backend en `3001`.
**Resultado:** El formulario de creación vuelve a alcanzar `/api/validate-email` desde `localhost:4174`; la prueba devolvió `400` controlado para una petición sin correo, confirmando que ya no cae en `404`. Lint, build y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Verificar visualmente en el navegador el alta con un correo real y el selector de fases en móvil.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingHero.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPhases.tsx; C:/dev/proyectos/nexotalentos/vite.config.ts; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se rehízo la interacción móvil de Jobhunting: el navbar inicia con la estética oscura de marca y cambia al modo claro al hacer scroll; las fases se convierten en un carrusel automático exclusivo para celular, sin botones de navegación; y se compactó la sección de diferenciadores alineando cada check con su texto.
**Resultado:** La revisión visual en `http://localhost:4174/jobhunting` confirma mejor jerarquía móvil, fases automáticas y una sección de beneficios menos alta. Lint, build, prerender de 12 rutas y bundle del servidor pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Continuar la auditoría visual ruta por ruta antes de activar publicidad; la fotografía actual funciona como apoyo visual ejecutivo, pero debe complementarse con prueba social real.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPhases.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingDifferentiators.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se aplicó una pasada de diseño móvil a Contacto, FAQ, Comunidad Nexo, Áreas de Especialización, Servicios y Testimonios: títulos con mejor control de salto de línea, frases clave agrupadas, tarjetas glassmorphism y controles de carrusel rediseñados como botones circulares translúcidos.
**Resultado:** Lint, build, prerender de 12 rutas y bundle del servidor pasan sin errores. Se redujo el riesgo de palabras huérfanas en móvil y se unificó la estética de tarjetas y carruseles.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Continuar la auditoría visual de las rutas restantes con el mismo sistema antes de activar campañas publicitarias.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/FAQSection.tsx; C:/dev/proyectos/nexotalentos/src/components/NexoCommunitySection.tsx; C:/dev/proyectos/nexotalentos/src/pages/ContactoPage.tsx; C:/dev/proyectos/nexotalentos/src/components/AreasEspecializacionSection.tsx; C:/dev/proyectos/nexotalentos/src/components/ServicesSection.tsx; C:/dev/proyectos/nexotalentos/src/components/SuccessStories.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se hizo visible el glassmorphism real en la página principal: tarjetas con transparencia, blur, saturación, bordes luminosos y sombras internas, junto con fondos degradados que permiten percibir el efecto.
**Resultado:** El ajuste queda aplicado a las tarjetas de sectores, áreas, comunidad, FAQ y servicios del inicio. Lint, build, prerender de 12 rutas y bundle del servidor pasan; `git diff --check` queda limpio.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Revisar visualmente el inicio completo en el navegador móvil y ajustar intensidades si alguna tarjeta compite demasiado con el contenido.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/AreasEspecializacionSection.tsx; C:/dev/proyectos/nexotalentos/src/components/FAQSection.tsx; C:/dev/proyectos/nexotalentos/src/components/NexoCommunitySection.tsx; C:/dev/proyectos/nexotalentos/src/components/ServicesSection.tsx; C:/dev/proyectos/nexotalentos/src/components/SpecializationSectorsSection.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se corrigió el navbar para que vuelva a ser transparente al inicio en todas las rutas y se extendió el tratamiento glassmorphism mediante `card-spring-hover` a tarjetas compartidas de sectores, testimonios, calculadoras, agentes, creación de perfil y otras secciones internas.
**Resultado:** La transparencia inicial del navbar ya no depende de la ruta; al hacer scroll conserva la transición configurada. Lint y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Verificar visualmente las rutas internas en móvil y ajustar solo las tarjetas que necesiten más o menos contraste.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/components/SpecializationSectorsSection.tsx; C:/dev/proyectos/nexotalentos/src/components/SuccessStories.tsx; C:/dev/proyectos/nexotalentos/src/components/CostCalculatorSection.tsx; C:/dev/proyectos/nexotalentos/src/components/CostCalculatorTeaser.tsx; C:/dev/proyectos/nexotalentos/src/components/AIAgentsTeaser.tsx; C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/pages/AgentesIAPage.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se corrigió el exceso de altura del hero móvil de Jobhunting y se devolvió la imagen a una altura contenida, dejando los CTA inmediatamente debajo de la imagen y la garantía al pie del recurso visual.
**Resultado:** El hero móvil deja de ocupar casi toda la pantalla; la candidata sigue visible y la revisión en localhost con Vite/HMR confirma la composición solicitada. Lint pasa sin errores.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Mantener la imagen actual como recurso provisional; para publicidad conviene sustituirla más adelante por fotografía real, testimonio o evidencia de resultados del servicio.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingHero.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se extendió el sistema glassmorphism con prioridad sobre fondos sólidos a las tarjetas compartidas del inicio, vacantes, metodología y Jobhunting. Se retiraron los cuadros de la banda de marcas, se ampliaron los logos, se rediseñó el selector Empresa/Candidato y se controló el título móvil de Proceso en tres líneas.
**Resultado:** Las tarjetas dejan ver los fondos ambientales, los textos recuperan contraste en modo claro y la banda de marcas queda abierta, sin contenedores individuales. Lint, build, prerender de 12 rutas y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Revisar en el dispositivo móvil real la velocidad del carrusel de marcas y ajustar únicamente si algún logo de origen incluye demasiado espacio transparente.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/components/BragBar.tsx; C:/dev/proyectos/nexotalentos/src/components/Hero.tsx; C:/dev/proyectos/nexotalentos/src/components/FeaturedVacanciesSummary.tsx; C:/dev/proyectos/nexotalentos/src/components/MethodologySection.tsx; C:/dev/proyectos/nexotalentos/src/components/MetricStatsSection.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPainPoints.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPhases.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingPricing.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingForm.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingFaq.tsx; C:/dev/proyectos/nexotalentos/src/pages/JobhuntingPage.tsx; C:/dev/proyectos/nexotalentos/src/pages/ContactoPage.tsx; C:/dev/proyectos/nexotalentos/src/pages/ProcesoPage.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Auditoría de las quejas del cliente y de las decisiones de la reunión del 24 de noviembre de 2026, con tres agentes en paralelo.
**Resultado:** Se confirmó que el problema es real: el perfil genera subdominios `slug.nexotalento.com`, no el formato `pablo-garcia-nexotalento.com`; no existe portal de postulaciones ni recuperación/edición del perfil; los PDF escaneados no tienen OCR; el CV fuente puede quedar públicamente legible por reglas Storage; y siguen contradicciones de sede, dirección, Ecuador/Barcelona, correos, Jobhunting, precios, ROI y filtros. También se detectó una discrepancia crítica entre identificadores Firebase reportados en el código/entornos y falta de verificación de Vercel/Firebase en producción.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Corregir primero privacidad del CV y modelo de dominio; luego crear portal Mi Nexo, recuperación de perfiles y postulaciones; unificar contenido según la reunión; implementar OCR PDF; y validar Firebase/Vercel/DNS en producción antes de publicidad.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se corrigió el flujo de perfil y CV manteniendo el formato `slug.nexotalento.com`: separación de CV fuente privado y fotos públicas, eliminación del modo local engañoso, publicación condicionada a correo verificado, perfil público sin datos de contacto y recuperación básica del perfil guardado. Se añadió el módulo Mi Nexo para consultar postulaciones del usuario.
**Resultado:** Las reglas Storage bloquean la lectura pública del CV fuente; Firestore valida que los perfiles públicos nuevos no incluyan email ni teléfono; Firebase queda anclado al proyecto `studio-2340725787-ed6b5`; `npm run lint` pasa.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Desplegar las reglas en Firebase, probar con un usuario real y confirmar que los documentos antiguos que contienen contacto o CV público se migren/revoquen.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/storage.rules; C:/dev/proyectos/nexotalentos/firestore.rules; C:/dev/proyectos/nexotalentos/src/lib/firebase.ts; C:/dev/proyectos/nexotalentos/src/pages/CreateProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/features/profiles/publicProfile.ts; C:/dev/proyectos/nexotalentos/src/pages/PublicProfilePage.tsx; C:/dev/proyectos/nexotalentos/src/components/profile/AccountSetupCard.tsx; C:/dev/proyectos/nexotalentos/src/components/profile/MiNexoPortal.tsx; C:/dev/proyectos/nexotalentos/AVANCE.md
## [2026-11-24] - nexotalentos - Codex
**Qué se hizo:** Se ocultaron de la experiencia pública la calculadora ROI, los precios explícitos de Jobhunting y la barra superior de filtros rápidos de vacantes, conservando sus rutas, lógica y archivos para uso futuro.
**Resultado:** La navegación y el render visible ya no muestran esos elementos; se mantuvo el diseño existente, el formato `slug.nexotalento.com` y la configuración Firebase sin cambios.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Resolver los tres errores de lint preexistentes de referencias a la sede Barcelona y hacer verificación visual en navegador.
**Archivos modificados:** C:\dev\proyectos\nexotalentos\src\App.tsx, C:\dev\proyectos\nexotalentos\src\components\Navbar.tsx, C:\dev\proyectos\nexotalentos\src\components\Footer.tsx, C:\dev\proyectos\nexotalentos\src\components\jobhunting\JobhuntingPricing.tsx, C:\dev\proyectos\nexotalentos\src\components\JobsPortal.tsx.
## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se actualizó únicamente el contenido visible acordado en la reunión: sede única en Madrid, correo corporativo, foco España y Latam, nomenclatura de servicios y vacantes.
**Resultado:** Se conservaron las secciones y la estructura visual; las referencias secundarias de sede quedaron fuera de la interfaz activa. Firebase, autenticación y perfiles no fueron modificados.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance, modularidad-archivos.
**Próximos pasos:** Revisar visualmente la interfaz publicada y confirmar textos finales con el cliente.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/config/company.ts; C:/dev/proyectos/nexotalentos/data/site-content.json; C:/dev/proyectos/nexotalentos/src/components/ContactSection.tsx; C:/dev/proyectos/nexotalentos/src/pages/ContactoPage.tsx; C:/dev/proyectos/nexotalentos/src/components/Footer.tsx; C:/dev/proyectos/nexotalentos/src/pages/ServiciosPage.tsx; C:/dev/proyectos/nexotalentos/src/data/jobsData.ts.

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se alinearon textos visibles de portada, vacantes, contacto y datos estructurados con España/Latam, sede única en Calle Cabestrero 5 y correo info@nexotalento.com, conservando las secciones ocultas y el formato de perfil `slug.nexotalento.com`.
**Resultado:** `npm run lint`, `npm run build` y `git diff --check` pasan. La configuración cliente de Firebase queda fijada al proyecto real `studio-2340725787-ed6b5`; no se modificó el formato de URLs de perfil. Persisten como tareas externas el despliegue de reglas Firebase y la verificación de Vercel/DNS.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Desplegar reglas, revisar datos antiguos en Storage, probar usuario real, validar OCR/PDF y hacer verificación visual final en producción.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/components/Hero.tsx; C:/dev/proyectos/nexotalentos/src/components/FeaturedVacanciesSummary.tsx; C:/dev/proyectos/nexotalentos/src/components/JobsPortal.tsx; C:/dev/proyectos/nexotalentos/src/pages/ContactoPage.tsx; C:/dev/proyectos/nexotalentos/index.html; C:/dev/proyectos/nexotalentos/public/llms-full.txt; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se rehizo la presentación pública de vacantes y servicios: campaña antes del listado, una sola búsqueda textual, cinco tarjetas compactas de servicios y cinco áreas/sectores unificados. Se preservó el contenido retirado en módulos legacy sin renderizar; se ocultaron ROI y precios públicos, y se unificó la cabecera oscura en ambos temas.
**Resultado:** La portada sigue la secuencia métricas → impulso laboral → vacantes; `/vacantes` abre con una campaña y `/servicios#executive-search` no expone metodologías, SLAs ni listados de perfiles. Se comprobó visualmente en localhost y `npm run lint`, `npm run build` y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance, documents.
**Próximos pasos:** Desplegar únicamente tras revisión del usuario; antes de publicidad, aplicar las reglas Firebase en producción y hacer una prueba de alta, CV y postulación con una cuenta real.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/src/pages/HomePage.tsx; C:/dev/proyectos/nexotalentos/src/pages/VacantesPage.tsx; C:/dev/proyectos/nexotalentos/src/pages/ServiciosPage.tsx; C:/dev/proyectos/nexotalentos/src/components/JobsPortal.tsx; C:/dev/proyectos/nexotalentos/src/components/Navbar.tsx; C:/dev/proyectos/nexotalentos/src/index.css; C:/dev/proyectos/nexotalentos/src/components/services/CompactServicesGrid.tsx; C:/dev/proyectos/nexotalentos/src/components/services/legacySpecializationContent.ts; C:/dev/proyectos/nexotalentos/src/components/vacancies/VacancyCampaignHero.tsx; C:/dev/proyectos/nexotalentos/src/components/vacancies/LegacyVacancyFilters.tsx; C:/dev/proyectos/nexotalentos/src/components/JobhuntingTeaserSection.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingHero.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingForm.tsx; C:/dev/proyectos/nexotalentos/src/components/jobhunting/JobhuntingFaq.tsx; C:/dev/proyectos/nexotalentos/src/components/Hero.tsx; C:/dev/proyectos/nexotalentos/public/llms.txt; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se conectaron los endpoints de leads y bandejas administrativas a Firebase Admin mediante repositorios modulares; se añadió la bandeja de postulaciones y un aprovisionador manual de claims administrativos para cuentas existentes.
**Resultado:** Sin las tres variables privadas de Firebase Admin, la API falla cerrada y no usa JSON en producción. Los roles admitidos por login y servidor quedaron alineados con las reglas: admin, super, superadmin y recruiter. No se crearon usuarios, no se cambiaron reglas, ni se desplegó configuración externa.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Configurar las tres variables privadas en Vercel, desplegar, crear o recuperar la cuenta corporativa y ejecutar el aprovisionador manual; después probar envío de lead y postulación en producción con datos de prueba.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/server.ts; C:/dev/proyectos/nexotalentos/src/server/firebase-admin.ts; C:/dev/proyectos/nexotalentos/src/server/firestore-repository.ts; C:/dev/proyectos/nexotalentos/src/server/legacy-leads.ts; C:/dev/proyectos/nexotalentos/src/components/admin/AdminDashboard.tsx; C:/dev/proyectos/nexotalentos/src/components/admin/AdminDashboardSecondaryTabs.tsx; C:/dev/proyectos/nexotalentos/src/components/admin/AdminApplicationsInbox.tsx; C:/dev/proyectos/nexotalentos/src/auth/adminAuth.ts; C:/dev/proyectos/nexotalentos/scripts/provision-admin.ts; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se migraron las funciones serverless publicadas en Vercel para que `/api/contact` y `/api/leads` guarden en Firestore con Firebase Admin; se añadieron rutas privadas para las bandejas de leads y postulaciones.
**Resultado:** Las rutas publicadas ya no registran IP ni PII en logs, ni usan Google Sheets como persistencia. Sin Firebase Admin devuelven `503` y las bandejas sin token devuelven `401`. `npm run lint`, `npm run build` y `git diff --check` pasan.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Cargar las credenciales privadas de Firebase Admin en Vercel, desplegar y probar un lead y una postulación de extremo a extremo; crear/verificar la cuenta corporativa y asignar su claim administrativo.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/api/contact.ts; C:/dev/proyectos/nexotalentos/api/leads.ts; C:/dev/proyectos/nexotalentos/api/admin/leads.ts; C:/dev/proyectos/nexotalentos/api/admin/applications.ts; C:/dev/proyectos/nexotalentos/src/server/serverless-contact.ts; C:/dev/proyectos/nexotalentos/src/server/serverless-admin.ts; C:/dev/proyectos/nexotalentos/src/server/serverless-types.ts; C:/dev/proyectos/nexotalentos/AVANCE.md

## [2026-11-24] - Nexo Talento - Codex
**Qué se hizo:** Se verificó la vista local solicitada sin modificar código ni servicios externos.
**Resultado:** El servidor del repositorio quedó disponible en http://127.0.0.1:3001 y respondió HTTP 200 en inicio, vacantes, servicios y Jobhunting.
**Skills usadas/modificadas:** reglas-seguridad, modularidad-archivos, registrar-avance.
**Próximos pasos:** Revisar visualmente los cambios locales y, cuando estén aprobados, configurar Firebase Admin en Vercel para activar las bandejas persistentes.
**Archivos modificados:** C:/dev/proyectos/nexotalentos/AVANCE.md
