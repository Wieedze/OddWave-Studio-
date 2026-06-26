// Scaffold marker for pages whose full content is built in a later step. Clearly
// labelled as work-in-progress; carries no invented client copy.

import { Section, MonoLabel, Button } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { ROUTES } from '@/content/navigation';

interface PagePlaceholderProps {
  /** Short factual description of what this page will contain (from docs/pages.md). */
  purpose: string;
}

export function PagePlaceholder({ purpose }: PagePlaceholderProps) {
  return (
    <Section background="page" maxWidth="720px">
      <div data-reveal style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <MonoLabel size="12px" tracking="0.22em" color={colors.text.faint}>
          Section en cours de construction
        </MonoLabel>
        <p
          style={{
            margin: 0,
            maxWidth: '52ch',
            fontFamily: typography.font.body,
            fontWeight: typography.weight.regular,
            fontSize: '17px',
            lineHeight: 1.7,
            color: colors.text.secondary,
            textWrap: 'pretty',
          }}
        >
          {purpose}
        </p>
        <Button to={ROUTES.contact} variant="secondary">
          Nous contacter
        </Button>
      </div>
    </Section>
  );
}
