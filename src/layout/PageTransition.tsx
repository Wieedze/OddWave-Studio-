// Wraps the routed page and replays a slow fade each time the route changes.
// Keying on pathname remounts the page (its own intro motion replays too), and
// the .ow-page class fades it in cinematically. Used in place of a bare <Outlet/>.

import { useLocation, useOutlet } from 'react-router-dom';
import './PageTransition.css';

export function PageTransition() {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="ow-page">
      {outlet}
    </div>
  );
}
