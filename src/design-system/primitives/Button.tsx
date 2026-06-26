// Button — two families (flat / pill), three variants (primary / secondary /
// tertiary). Renders an internal link, an external anchor, or a <button>.
// Mirrors the handoff component family (06 · Composants).

import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { colors, radius, shadow, typography } from '@/design-system/tokens';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonShape = 'flat' | 'pill';

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  small?: boolean;
  style?: CSSProperties;
  className?: string;
}

type ButtonProps =
  | (CommonProps & { to: string; href?: never; onClick?: never })
  | (CommonProps & { href: string; to?: never; onClick?: never })
  | (CommonProps & { onClick: () => void; to?: never; href?: never });

function baseStyle(variant: ButtonVariant, shape: ButtonShape, small: boolean): CSSProperties {
  const pad = small ? '10px 18px' : '14px 26px';
  const radii = shape === 'pill' ? radius.pill : radius.button;
  const common: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    fontFamily: typography.font.body,
    fontWeight: typography.weight.semibold,
    fontSize: small ? '12px' : '15px',
    lineHeight: 1,
    borderRadius: radii,
    padding: pad,
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    transition: 'transform .24s cubic-bezier(.19,1,.22,1), background .24s ease, border-color .24s ease',
  };
  if (variant === 'primary') {
    return {
      ...common,
      background: colors.copper.landing,
      color: colors.text.primaryWarm,
      boxShadow: shadow.button,
    };
  }
  if (variant === 'secondary') {
    return {
      ...common,
      background: 'transparent',
      color: colors.text.primary,
      border: `1px solid ${colors.border.bold}`,
    };
  }
  // tertiary — underlined text link
  return {
    ...common,
    background: 'transparent',
    color: colors.text.primary,
    padding: small ? '6px 1px' : '8px 2px',
    borderRadius: 0,
    borderBottom: `1px solid rgba(194,142,87,.85)`,
  };
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', shape = 'flat', small = false, style, className } = props;
  const merged = { ...baseStyle(variant, shape, small), ...style };
  const cls = ['ow-btn', `ow-btn--${variant}`, className].filter(Boolean).join(' ');

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls} style={merged}>
        {children}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={cls} style={merged}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} style={merged} onClick={(props as { onClick: () => void }).onClick}>
      {children}
    </button>
  );
}
