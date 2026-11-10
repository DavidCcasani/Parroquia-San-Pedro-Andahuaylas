import { homePage } from './home.data';
import { actualidadPage } from './actualidad.data';
import { descubriendoPage } from './descubriendo.data';
import { permisosPage } from './permisos.data';
import { avisoLegalPage } from './avisoLegal.data';
import { privacidadPage } from './privacidad.data';
import { cookiesPage } from './cookies.data';
import { creditosPage } from './creditos.data';
import { donacionesPage } from './donaciones.data';
import { historiaPage } from './historia.data';
import { SHARED_LAYOUT } from './sharedLayout.data';

export const PAGES_BY_SLUG = {
  '/': homePage,
  '/actualidad': actualidadPage,
  '/descubriendo-la-catedral': descubriendoPage,
  '/permisos': permisosPage,
  '/aviso-legal': avisoLegalPage,
  '/politica-privacidad': privacidadPage,
  '/politica-cookies': cookiesPage,
  '/creditos': creditosPage,
  '/donaciones': donacionesPage,
  '/historia': historiaPage,
};

export { SHARED_LAYOUT };
