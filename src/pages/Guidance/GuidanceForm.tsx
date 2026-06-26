// Guidance request form. Formule chips reflect the shared selection; submit runs
// through ContactService and flips the parent to its confirmation state.

import { useState, type FormEvent } from 'react';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { contactService } from '@/services';
import { GUIDANCE_FORMULAS } from '@/content/guidance';

interface GuidanceFormProps {
  /** Currently selected formule name (shared with the formules table). */
  formule: string | null;
  onSelectFormule: (name: string) => void;
  onSubmitted: () => void;
}

function FieldLabel({ children }: { children: string }) {
  return (
    <MonoLabel as="label" size="11px" tracking="0.12em" color={colors.text.faint}>
      {children}
    </MonoLabel>
  );
}

export function GuidanceForm({ formule, onSelectFormule, onSubmitted }: GuidanceFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await contactService.submit({ name, email, project, formule: formule ?? undefined });
    setSubmitting(false);
    if (result.ok) onSubmitted();
    else setError("L'envoi n'a pas abouti. Réessayez, ou écrivez-nous à contact@oddwave.studio.");
  }

  const labelGap = { display: 'flex', flexDirection: 'column', gap: '9px' } as const;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FieldLabel>Formule souhaitée</FieldLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
          {GUIDANCE_FORMULAS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={f.name === formule ? 'ow-chip-radio on' : 'ow-chip-radio'}
              onClick={() => onSelectFormule(f.name)}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div data-form-grid style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={labelGap}>
          <FieldLabel>Nom</FieldLabel>
          <input
            className="ow-field"
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={labelGap}>
          <FieldLabel>Email</FieldLabel>
          <input
            className="ow-field"
            type="email"
            placeholder="vous@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div style={labelGap}>
        <FieldLabel>Votre projet</FieldLabel>
        <textarea
          className="ow-field"
          placeholder="Parlez-nous du morceau, du nombre de titres, de vos délais, de vos références…"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>

      <button type="submit" className="ow-submit" disabled={submitting} style={{ fontFamily: typography.font.body }}>
        Envoyer la demande →
      </button>
      {error && (
        <p style={{ margin: 0, fontFamily: typography.font.body, fontSize: '14px', lineHeight: 1.5, color: colors.signal.red }}>{error}</p>
      )}
    </form>
  );
}
