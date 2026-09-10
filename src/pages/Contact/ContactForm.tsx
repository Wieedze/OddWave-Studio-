// Contact request form. "Besoin" chips (single-select, default Mastering),
// Nom/Email, Projet textarea. Submits through ContactService.

import { useState, type FormEvent } from 'react';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { contactService } from '@/services';
import { useText } from '@/hooks';
import { CONTACT } from '@/content/contact';

interface ContactFormProps {
  onSubmitted: () => void;
}

function FieldLabel({ children }: { children: string }) {
  return (
    <MonoLabel as="label" size="11px" tracking="0.12em" color={colors.text.faint}>
      {children}
    </MonoLabel>
  );
}

export function ContactForm({ onSubmitted }: ContactFormProps) {
  const contact = useText(CONTACT);
  const { form } = contact;
  const [need, setNeed] = useState<string>(contact.needs[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await contactService.submit({ name, email, project, need });
    setSubmitting(false);
    if (result.ok) onSubmitted();
    else setError(form.error);
  }

  const labelGap = { display: 'flex', flexDirection: 'column', gap: '9px' } as const;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={labelGap}>
          <FieldLabel>{form.nameLabel}</FieldLabel>
          <input className="ow-field" type="text" placeholder={form.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={labelGap}>
          <FieldLabel>{form.emailLabel}</FieldLabel>
          <input className="ow-field" type="email" placeholder={form.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FieldLabel>{form.needLabel}</FieldLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
          {contact.needs.map((option) => (
            <button
              key={option}
              type="button"
              className={option === need ? 'ow-chip-radio on' : 'ow-chip-radio'}
              onClick={() => setNeed(option)}
            >
              {option}
            </button>
          ))}
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

      <button type="submit" className="ow-submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? (
          <>
            <span className="ow-submit-spinner" aria-hidden="true" />
            {form.sending}
          </>
        ) : (
          contact.submitLabel
        )}
      </button>
      {error && (
        <p style={{ margin: 0, fontFamily: typography.font.body, fontSize: '14px', lineHeight: 1.5, color: colors.signal.red }}>{error}</p>
      )}
    </form>
  );
}
