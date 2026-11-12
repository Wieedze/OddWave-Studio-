// HoneypotField — invisible input that only bots fill (see useSpamGuard).
// Moved off-screen rather than `display:none`, which some bots detect and skip.
// Out of the tab order and hidden from assistive tech, so keyboard and screen
// reader users never reach it; autocomplete off so browsers never prefill it.

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
