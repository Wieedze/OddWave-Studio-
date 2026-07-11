# OddWave — Navbar « disque + barre » (handoff)

Redesign de la nav flottante. Objectif visuel : **un seul bloc continu** = une barre
horizontale arrondie avec un **disque central plus grand** qui déborde en haut/bas,
**un seul contour** qui suit toute la silhouette (aucune ligne interne).

Comportement (inchangé vs l'ancienne nav) :
- Au repos : seul le disque central est visible (nav = 90px de large).
- Hover / focus-within / `.is-open` : la largeur passe à 812px, les deux groupes de
  liens se révèlent symétriquement (du centre vers l'extérieur), le logo reste centré.
- ≤ 860px : groupes masqués, burger + menu vertical (`.ow-menu`) — identique à avant.

## Comment le « bloc unique » est obtenu
- La barre (`.bar`) et le disque (`.disc`) ont **le même fond opaque `#15161B`** et
  **aucun `border`**.
- Le contour + l'ombre viennent d'un **`filter: drop-shadow`** posé sur leur conteneur
  `.ow-nav-bg`. Le drop-shadow trace la silhouette de **l'union** des deux formes →
  pas de couture interne là où le disque recouvre la barre.
- Important : ne PAS mettre de `backdrop-filter`/translucidité sur `.bar` et `.disc`
  (sinon les zones de recouvrement doublent et la couture réapparaît). Le fond est
  volontairement opaque.

## Géométrie / proportions (à respecter)
- `nav` : hauteur 90px, largeur 90px → 812px (animée).
- `.disc` : 90px, centré (`left:50% ; translateX(-50%)`), `border-radius:50%`.
- `.bar` : `top/bottom:17px` (≈ 56px de haut), `border-radius:999px`. Le disque (90)
  est plus grand que la barre (56) → il déborde de 17px en haut et en bas.
- Logo : `size = 108px` (déborde légèrement le disque de 90 — voulu).
- Centrage horizontal du logo : `.ow-nav-left` / `.ow-nav-right` en `flex:1 1 0`
  (largeurs égales) → le logo tombe pile au centre du disque.
- **Correction optique du logo** : le tracé du monogramme est décentré dans son
  viewBox `0 0 3000 3000` (bbox réelle ≈ x494 y571 w1997 h1978 → centre ≈ 1492.5 / 1560,
  soit +60u en Y). À 108px l'échelle = 108/3000 = 0.036 → décalage ≈ 0.27px à gauche
  et 2.16px vers le bas. On compense avec `transform: translate(0.3px, -2.2px)`.
  **Si tu changes `size`, recalcule** : `tx = -( (494+1997/2) - 1500 ) * size/3000`,
  `ty = -( (571+1978/2) - 1500 ) * size/3000`.

---

## Nav.css

```css
/* Nav flottante en un seul bloc : barre + disque, contour unique via drop-shadow.
   Repos = disque seul. Hover/focus/.is-open = déploiement. ≤860px = burger. */

.ow-nav-shell {
  position: fixed; top: 22px; left: 0; right: 0; z-index: 60;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  pointer-events: none;
}

.ow-nav { position: relative; height: 90px; width: 90px; pointer-events: auto;
  transition: width .85s cubic-bezier(.19,1,.22,1); }
.ow-nav:hover, .ow-nav:focus-within, .ow-nav.is-open { width: 812px; }

/* Fond = union barre+disque, même couleur, pas de border. Contour = drop-shadow. */
.ow-nav-bg { position: absolute; inset: 0; pointer-events: none;
  filter:
    drop-shadow(0 0 .8px rgba(255,255,255,.2))
    drop-shadow(0 0 .8px rgba(255,255,255,.16))
    drop-shadow(0 10px 30px rgba(0,0,0,.42)); }
.ow-nav-bg .bar  { position: absolute; left: 0; right: 0; top: 17px; bottom: 17px;
  border-radius: 999px; background: #15161B; }
.ow-nav-bg .disc { position: absolute; left: 50%; top: 0; width: 90px; height: 90px;
  transform: translateX(-50%); border-radius: 50%; background: #15161B; }

/* Contenu clippé → révélation du centre vers l'extérieur */
.ow-nav-content { position: absolute; inset: 0; overflow: hidden;
  display: flex; align-items: center; justify-content: center; pointer-events: none; }

.ow-nav-side { display: flex; gap: 28px; align-items: center; white-space: nowrap;
  opacity: 0; transition: opacity .45s ease; }
.ow-nav:hover .ow-nav-side, .ow-nav:focus-within .ow-nav-side, .ow-nav.is-open .ow-nav-side {
  opacity: 1; transition: opacity .6s ease .2s; }
.ow-nav-left  { flex: 1 1 0; min-width: 0; justify-content: flex-end;   margin-right: 26px; }
.ow-nav-right { flex: 1 1 0; min-width: 0; justify-content: flex-start; margin-left: 26px; }

.ow-nav-logo { flex: none; width: 90px; height: 90px;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; cursor: pointer; pointer-events: auto; }
.ow-nav-logo span { flex: none; width: 108px; height: 108px; display: block;
  transform: translate(0.3px, -2.2px); } /* correction optique du tracé */

.ow-link { pointer-events: auto; position: relative;
  font: 600 13px/1.5 'Manrope', sans-serif; letter-spacing: .02em;
  color: rgba(241,238,232,.74); text-decoration: none; white-space: nowrap;
  transition: color .25s; }
.ow-link:hover { color: #F1EEE8; }
.ow-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: 1px;
  height: 1px; background: #C24E37; transform: scaleX(0); transform-origin: left;
  transition: transform .3s cubic-bezier(.16,1,.3,1); }
.ow-link:hover::after { transform: scaleX(1); }

/* --- Mobile : burger + menu (repris de l'ancienne version) --- */
.ow-burger { display: none; pointer-events: auto; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: 999px; background: rgba(20,21,26,.46);
  backdrop-filter: blur(13px) saturate(1.3); -webkit-backdrop-filter: blur(13px) saturate(1.3);
  border: 1px solid rgba(255,255,255,.1); color: #F1EEE8; cursor: pointer; }
.ow-menu { display: none; flex-direction: column; gap: 2px; padding: 12px 14px;
  border-radius: 18px; background: rgba(18,19,24,.78);
  backdrop-filter: blur(16px) saturate(1.3); -webkit-backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid rgba(255,255,255,.1); box-shadow: 0 14px 44px rgba(0,0,0,.45);
  min-width: 210px; pointer-events: auto; }
.ow-menu.open { display: flex; }
.ow-mlink { font: 600 15px/1.1 'Manrope', sans-serif; letter-spacing: .01em;
  color: rgba(241,238,232,.82); text-decoration: none; padding: 12px 14px;
  border-radius: 10px; white-space: nowrap; transition: background .2s, color .2s; }
.ow-mlink:hover { background: rgba(255,255,255,.06); color: #F6EEE6; }

@media (max-width: 860px) {
  .ow-nav { width: 90px !important; }
  .ow-nav-side { display: none !important; }
  .ow-burger { display: flex !important; }
  .ow-menu.open { display: flex !important; }
}
```

## Nav.tsx

```tsx
// Nav flottante « disque + barre ». Le déploiement des groupes est en CSS
// (hover/focus-within). La couche motion (intro home) peut ajouter `.is-open`.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { colors } from '@/design-system/tokens';
import { NAV_LEFT, NAV_RIGHT, MENU_LINKS, ROUTES } from '@/content/navigation';
import type { NavLink as NavLinkModel } from '@/models';
import './Nav.css';

function NavLinkItem({ link }: { link: NavLinkModel }) {
  if (link.external) {
    return (
      <a href={link.to} className="ow-link" target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }
  return <Link to={link.to} className="ow-link">{link.label}</Link>;
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ow-nav-shell">
      <nav className="ow-nav" aria-label="Navigation principale">
        {/* fond en un seul bloc : union barre + disque */}
        <div className="ow-nav-bg">
          <div className="bar" />
          <div className="disc" />
        </div>

        <div className="ow-nav-content">
          <div className="ow-nav-side ow-nav-left">
            {NAV_LEFT.map((link) => <NavLinkItem key={link.to} link={link} />)}
          </div>

          <Link to={ROUTES.home} className="ow-nav-logo" aria-label="Accueil">
            {/* le <span> porte la taille + la correction optique (voir Nav.css) */}
            <span><Logo size={108} stroke={colors.text.primary} /></span>
          </Link>

          <div className="ow-nav-side ow-nav-right">
            {NAV_RIGHT.map((link) => <NavLinkItem key={link.to} link={link} />)}
          </div>
        </div>
      </nav>

      <button
        type="button" className="ow-burger" aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <div className={menuOpen ? 'ow-menu open' : 'ow-menu'}>
        {MENU_LINKS.map((link) =>
          link.external ? (
            <a key={link.to} href={link.to} className="ow-mlink" target="_blank"
               rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ) : (
            <Link key={link.to} to={link.to} className="ow-mlink"
                  onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
```

## Dépendances (rappel)
- `react-router-dom` (`Link`), composant `Logo` (SVG monogramme, viewBox 0 0 3000 3000),
  token `colors.text.primary` (#F1EEE8), police **Manrope**, accent cuivre **#C24E37**.
- Le `<Logo>` doit rendre un `<svg style="width:100%;height:100%;display:block">` (pas de
  `width`/`height` fixes en attributs) pour que le `<span>` pilote sa taille.

## Pièges à éviter
- Ne pas remettre de `border` sur `.bar`/`.disc` ni de `backdrop-filter` dessus → la
  couture interne revient. Le look « un seul bloc » dépend de : même fond opaque + contour
  par `drop-shadow` sur `.ow-nav-bg`.
- Garder `overflow:hidden` sur `.ow-nav-content` (clippe les groupes au repos) mais PAS
  sur `.ow-nav-bg` (sinon l'ombre/contour est rognée).
- `.ow-nav-left`/`right` doivent rester `flex:1 1 0` (largeurs égales) pour le centrage.
