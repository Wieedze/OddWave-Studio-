// App shell: global tokens + reset, the shared floating Nav, the routed page,
// and the Footer. Rendered once around every route.

import { Outlet } from 'react-router-dom';
import { GlobalStyles } from '@/design-system/theme';
import { Nav, Footer } from '@/components';
import { ScrollToTop } from './ScrollToTop';
import '@/design-system/theme/global.css';
import '@/design-system/primitives/forms.css';

export function RootLayout() {
  return (
    <>
      <GlobalStyles />
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
