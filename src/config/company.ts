export const COMPANY_CONFIG = {
  name: 'Nexo Talento',
  legalName: 'Nexo Talento Consultores S.L.',
  phone: '+34 614 143 763',
  phoneDisplay: '+34 614 143 763',
  whatsapp: '+34 614 143 763',
  whatsappNumber: '34614143763',
  whatsappDefaultMessage: 'Hola Nexo Talento, deseo consultar sobre servicios de selección directiva y solicitar una terna en 18 días.',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappDefaultMessage)}`;
  },
  emailUser: 'info',
  emailDomain: 'nexotalento.com',
  // Dirección institucional única acordada en la reunión del 24/11/2026.
  addresses: {
    madrid: {
      city: 'Madrid',
      zone: 'Sede España',
      full: 'Calle Cabestrero 5, 28012 Madrid, España',
      short: 'Madrid, España',
    }
    // Barcelona se conserva fuera de la configuración activa por la decisión de sede única.
  },
  // Compromisos y SLAs oficiales actualizados
  commitments: {
    slaDays: 18,
    slaText: 'Terna validada en 18 días hábiles',
    warrantyText: 'Garantía contractual de 3 a 6 meses de sustitución',
    warrantyShort: 'Garantía 3 a 6 Meses',
  }
};
