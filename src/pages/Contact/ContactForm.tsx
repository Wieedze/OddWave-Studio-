// Contact request form. "Besoin" chips (single-select, default Mastering),
// Nom/Email, Projet textarea. Submits through ContactService.

import { useState, type FormEvent } from 'react';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { contactService } from '@/services';
import { CONTACT, CONTACT_NEEDS } from '@/content/contact';

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
  const [need, setNeed] = useState<string>(CONTACT_NEEDS[0]);
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
    else setError("L'envoi n'a pas abouti. Réessayez, ou écrivez-nous à contact@oddwave.studio.");
  }

  const labelGap = { display: 'flex', flexDirection: 'column', gap: '9px' } as const;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={labelGap}>
          <FieldLabel>Nom</FieldLabel>
          <input className="ow-field" type="text" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={labelGap}>
          <FieldLabel>Email</FieldLabel>
          <input className="ow-field" type="email" placeholder="vous@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FieldLabel>Votre besoin</FieldLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
          {CONTACT_NEEDS.map((option) => (
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
        <FieldLabel>Votre projet</FieldLabel>
        <textarea
          className="ow-field"
          placeholder="Parlez-nous du morceau, du nombre de titres, de vos délais, de vos références…"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>

      <button type="submit" className="ow-submit" disabled={submitting}>
        {CONTACT.submitLabel}
      </button>
      {error && (
        <p style={{ margin: 0, fontFamily: typography.font.body, fontSize: '14px', lineHeight: 1.5, color: colors.signal.red }}>{error}</p>
      )}
    </form>
  );
}
