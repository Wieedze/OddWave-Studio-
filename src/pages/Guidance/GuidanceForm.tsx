// Guidance request form. Formule chips reflect the shared selection; submit runs
// through ContactService and flips the parent to its confirmation state.

import { useState, type FormEvent } from 'react';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { contactService } from '@/services';
import { useText } from '@/hooks';
import { GUIDANCE, GUIDANCE_FORMULAS } from '@/content/guidance';
import { CONTACT } from '@/content/contact';

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
  const guidance = useText(GUIDANCE);
  const formulas = useText(GUIDANCE_FORMULAS);
  // Name / email / project are the same fields as the contact form, so they
  // share its copy rather than keeping a second translation in step.
  const { form } = useText(CONTACT);
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
    else setError(guidance.error);
  }

  const labelGap = { display: 'flex', flexDirection: 'column', gap: '9px' } as const;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FieldLabel>{guidance.formulaLabel}</FieldLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
          {formulas.map((f) => (
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
          <FieldLabel>{form.nameLabel}</FieldLabel>
          <input
            className="ow-field"
            type="text"
            placeholder={form.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={labelGap}>
          <FieldLabel>{form.emailLabel}</FieldLabel>
          <input
            className="ow-field"
            type="email"
            placeholder={form.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div style={labelGap}>
        <FieldLabel>{form.projectLabel}</FieldLabel>
        <textarea
          className="ow-field"
          placeholder={form.projectPlaceholder}
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>

      <button type="submit" className="ow-submit" disabled={submitting} aria-busy={submitting} style={{ fontFamily: typography.font.body }}>
        {submitting ? (
          <>
            <span className="ow-submit-spinner" aria-hidden="true" />
            {guidance.sending}
          </>
        ) : (
          guidance.submitLabel
        )}
      </button>
      {error && (
        <p style={{ margin: 0, fontFamily: typography.font.body, fontSize: '14px', lineHeight: 1.5, color: colors.signal.red }}>{error}</p>
      )}
    </form>
  );
}
