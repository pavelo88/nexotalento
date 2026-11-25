import React, { useState } from 'react';

/**
 * Controles conservados a petición de negocio. No se importan en la experiencia
 * pública actual: Vacantes usa únicamente búsqueda textual para evitar fricción.
 */
export const legacyVacancyFilterPills = [
  'Todos',
  'Madrid',
  'Remoto España',
  'Latam',
  'Marketing',
  'Contabilidad',
  'Carga Internacional',
  'Ventas B2B'
];

export const legacyVacancyModalities = ['Presencial', 'Híbrido', '100% Remoto'];
export const legacyVacancyDepartments = ['Marketing', 'Finanzas', 'Logística', 'Ventas', 'Tecnología', 'People'];

/**
 * Conserva el JSX de los controles retirados. Se mantiene sin importar hasta que
 * negocio decida restaurar una navegación de vacantes basada en filtros.
 */
export const LegacyVacancyFilters: React.FC = () => {
  const [selectedPill, setSelectedPill] = useState('Todos');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handlePillClick = (pill: string) => {
    setSelectedPill(pill);

    if (pill === 'Todos') {
      setSelectedModalities([]);
      setSelectedDepartments([]);
      return;
    }

    if (legacyVacancyModalities.includes(pill)) {
      setSelectedModalities([pill]);
      setSelectedDepartments([]);
      return;
    }

    setSelectedDepartments([pill]);
    setSelectedModalities([]);
  };

  const toggleModality = (modality: string) => {
    setSelectedModalities((current) =>
      current.includes(modality) ? current.filter((item) => item !== modality) : [...current, modality]
    );
  };

  const toggleDepartment = (department: string) => {
    setSelectedDepartments((current) =>
      current.includes(department) ? current.filter((item) => item !== department) : [...current, department]
    );
  };

  return (
    <aside className="space-y-5" aria-label="Filtros de vacantes heredados">
    <div className="flex flex-wrap gap-2">
      {legacyVacancyFilterPills.map((pill) => (
        <button
          key={pill}
          type="button"
          onClick={() => handlePillClick(pill)}
          aria-pressed={selectedPill === pill}
          className="rounded-full border px-3 py-1.5 text-xs font-black"
        >
          {pill}
        </button>
      ))}
    </div>
    <fieldset>
      <legend className="text-xs font-black uppercase">Modalidad de trabajo</legend>
      {legacyVacancyModalities.map((modality) => (
        <label key={modality} className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selectedModalities.includes(modality)}
            onChange={() => toggleModality(modality)}
          />
          {modality}
        </label>
      ))}
    </fieldset>
    <fieldset>
      <legend className="text-xs font-black uppercase">Sector o departamento</legend>
      {legacyVacancyDepartments.map((department) => (
        <label key={department} className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selectedDepartments.includes(department)}
            onChange={() => toggleDepartment(department)}
          />
          {department}
        </label>
      ))}
    </fieldset>
    </aside>
  );
};
