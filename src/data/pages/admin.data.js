import AdminPanel from '../../components/AdminPanel';

export const adminPage = {
  slug: '/admin',
  aliases: ['/admin/', '/panel', '/administracion', '/admin-parroquia'],
  title: 'Panel Administrativo | Parroquia San Jeronimo Andahuaylas',
  bodyClass: 'page-template-default page page-id-99903 _masterslider _ms_version_3.9.5 group-blog cmplz-functional cmplz-eu cmplz-optin',
  isHome: false,
  heroHtml: '',
  Component: AdminPanel,
  headerHtml: `<header id="masthead" class="site-header" role="banner">
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" rel="home" href="/">
            <img class="hidden-xs hidden-sm visible-md visible-lg" src="/assets/images/logo_catedral_small.png" alt="Parroquia San Jeronimo logo">
            <img class="visible-xs visible-sm hidden-md hidden-lg" src="/assets/images/logo_responsive.png" alt="Parroquia San Jeronimo logo">
          </a>
        </div>
        <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
          <div class="" id="dropupid">
            <ul id="menu-principal" class="nav navbar-nav navbar-right">
              <li id="menu-item-39" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-39"><a href="/historia">Historia</a></li>
              <li id="menu-item-29" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"><a href="/actualidad">Actualidad</a></li>
              <li id="menu-item-tramites" class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/tramites">Trámites</a></li>
              <li id="menu-item-admin" class="menu-item menu-item-type-post_type menu-item-object-page active"><a href="/admin"><i class="fa fa-lock" style="color: #c5a059;"></i> Admin</a></li>
              <li id="menu-item-donaciones" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-donaciones" style="display: inline-flex; align-items: center; height: 60px; margin-left: 16px;"><a href="/donaciones" class="btn-donar-navbar" style="background-color: #c5a059 !important; background-image: linear-gradient(135deg, #d4b068 0%, #c5a059 100%) !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; font-weight: 700 !important; font-size: 13px !important; text-transform: uppercase !important; letter-spacing: 0.8px !important; padding: 10px 24px !important; border-radius: 9999px !important; border: none !important; border-bottom: none !important; box-shadow: 0 4px 14px rgba(197, 160, 89, 0.45) !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 7px !important; text-decoration: none !important; line-height: 1 !important; transition: all 0.25s ease !important;"><i class="fa fa-heart" style="font-size: 13px; color: #ffffff !important;"></i> <span>Donar</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>`,
  contentHtml: `<div id="content" class="site-content">
    <div style="padding: 60px 0; text-align: center;">
      <h2>Panel Administrativo Parroquial</h2>
      <p>Cargando panel de administración...</p>
    </div>
  </div>`
};
