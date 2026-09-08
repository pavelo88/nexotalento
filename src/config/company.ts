export const COMPANY_CONFIG = {
  name: 'Nexo Talentos',
  legalName: 'Nexo Talentos Consultores S.L.',
  phone: '+34 614 143 763',
  phoneDisplay: '+34 614 143 763',
  whatsappNumber: '34614143763',
  whatsappDefaultMessage: 'Hola Nexo Talentos, deseo consultar sobre servicios de selección directiva y solicitar una terna en 18 días.',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappDefaultMessage)}`;
  },
  emailUser: 'info',
  emailDomain: 'nexotalentos.com',
  // Direcciones institucionales: listas para actualizar en cuanto Caro entregue la dirección definitiva
  addresses: {
    madrid: {
      city: 'Madrid',
      zone: 'Sede España',
      full: 'Calle Principal, Madrid, España',
      short: 'Madrid, España',
    },
    barcelona: {
      city: 'Barcelona',
      zone: 'Hub Empresarial',
      full: 'Distrito de Negocios, Barcelona, España',
      short: 'Barcelona, España',
    }
  },
  // Compromisos y SLAs oficiales actualizados
  commitments: {
    slaDays: 18,
    slaText: 'Terna validada en 18 días hábiles',
    warrantyText: 'Garantía contractual de 3 a 6 meses de sustitución',
    warrantyShort: 'Garantía 3 a 6 Meses',
  }
};
