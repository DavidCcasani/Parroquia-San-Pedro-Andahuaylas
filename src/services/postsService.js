/**
 * Servicio de almacenamiento y gestión de publicaciones de Actualidad Parroquial.
 * Utiliza localStorage para persistencia inmediata y está preparado para conectarse a Supabase.
 */

export const CATEGORIAS = ['Todos', 'Eventos', 'Comunicados', 'Festividades'];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    titulo: 'Segundo Recorrido Procesional del Señor de los Milagros',
    categoria: 'Festividades',
    fecha: 'Lunes 19 de Octubre del 2026',
    hora: '2:00 p.m.',
    imagen: '/assets/images/evento-senor-de-los-milagros-andahuaylas.jpg',
    descripcion:
      'La Hermandad del Señor de los Milagros de Andahuaylas invita a toda la comunidad y devotos al solemne recorrido procesional con la sagrada imagen por las principales calles de nuestra ciudad.',
    lugar: 'Desde la Iglesia San Jeronimo Andahuaylas',
    organizador: 'Hermandad del Señor de los Milagros',
    createdAt: 1729346400000
  },
  {
    id: 'post-2',
    titulo: 'HOLYWINS: «La Santidad Vence» en la Parroquia San Jeronimo',
    categoria: 'Eventos',
    fecha: 'Sábado 31 de Octubre',
    hora: 'Desde 6:00 p.m.',
    imagen: '/assets/images/evento-holywins-andahuaylas.jpg',
    descripcion:
      '¡Ven, vístete de tu santo favorito y acompáñanos a celebrar la fiesta de la santidad! Una hermosa alternativa cristiana para que los niños y familias vivan la alegría del Reino de Dios.',
    lugar: '6:00 p.m. Santo Rosario • 6:30 p.m. Santa Misa',
    organizador: 'Parroquia San Jeronimo',
    createdAt: 1730390400000
  },
  {
    id: 'post-3',
    titulo: 'Jornada y Misa Comunitaria de Enfermos y Ancianos',
    categoria: 'Comunicados',
    fecha: 'Sábado 10 de Octubre',
    hora: '10:00 A.M.',
    imagen: '/assets/images/evento-jornada-enfermos-ancianos.jpg',
    descripcion:
      'La parroquia abre sus brazos con amor y ternura para homenajear y orar por nuestros queridos abuelitos y personas enfermas. ¡Ven y comparte un momento entrañable de fe y alegría!',
    lugar: '10:00 A.M. Santa Misa solemne y compartir fraterno',
    organizador: 'Pastoral de la Salud',
    createdAt: 1728561600000
  },
  {
    id: 'post-4',
    titulo: 'Gran Encuentro de Oración y Retiro con Jesús y María',
    categoria: 'Eventos',
    fecha: '19 y 20 de Setiembre',
    hora: 'Jornada completa',
    imagen: '/assets/images/evento-encuentro-jesus-maria-sillapata.jpg',
    descripcion:
      'Un espacio profundo de oración, adoración al Santísimo, reflexión y encuentro con el Señor, acompañado del amor maternal de María en la Comunidad Cristiana de Sillapata.',
    lugar: 'Sillapata • Inkawasi',
    organizador: 'Comunidad de Sillapata',
    createdAt: 1726747200000
  }
];

const STORAGE_KEY = 'parroquia_actualidad_posts';
const EVENT_NAME = 'parroquia_posts_updated';

/**
 * Obtiene todas las publicaciones desde localStorage o retorna las iniciales.
 */
export function getPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error al leer publicaciones de localStorage:', err);
  }
  // Si no hay datos guardados, inicializa con las publicaciones oficiales
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
  } catch {
    // Si localStorage no está disponible
  }
  return INITIAL_POSTS;
}

/**
 * Guarda una nueva publicación en el almacenamiento local y notifica a las vistas.
 */
export function createPost(newPostData) {
  const posts = getPosts();
  const newPost = {
    id: `post-${Date.now()}`,
    titulo: newPostData.titulo.trim(),
    categoria: newPostData.categoria || 'Eventos',
    fecha: newPostData.fecha || 'Fecha a confirmar',
    hora: newPostData.hora ? newPostData.hora.trim() : '',
    imagen: newPostData.imagen || '/assets/images/foto-parroquia-san-pedro-lateral.jpg',
    descripcion: newPostData.descripcion.trim(),
    lugar: newPostData.lugar ? newPostData.lugar.trim() : 'Parroquia San Jeronimo Andahuaylas',
    organizador: newPostData.organizador ? newPostData.organizador.trim() : 'Parroquia San Jeronimo',
    createdAt: Date.now()
  };

  const updatedPosts = [newPost, ...posts];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updatedPosts }));
  } catch (err) {
    console.error('Error al guardar publicación:', err);
  }
  return newPost;
}

/**
 * Elimina una publicación por su ID.
 */
export function deletePost(postId) {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== postId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: filtered }));
  } catch (err) {
    console.error('Error al eliminar publicación:', err);
  }
  return filtered;
}

/**
 * Restablece las publicaciones a la configuración inicial.
 */
export function resetPosts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: INITIAL_POSTS }));
  } catch (err) {
    console.error('Error al restablecer publicaciones:', err);
  }
  return INITIAL_POSTS;
}

/**
 * Suscribe un callback a las actualizaciones de publicaciones.
 */
export function subscribeToPosts(callback) {
  const handler = () => {
    callback(getPosts());
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

/**
 * Estructura de integración futura con Supabase:
 * Para habilitar Supabase en producción:
 * 1. Configurar variables de entorno: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
 * 2. Instalar @supabase/supabase-js
 * 3. Reemplazar o complementar getPosts() y createPost() con llamadas a:
 *    supabase.from('publicaciones').select('*').order('created_at', { ascending: false })
 */
export const SUPABASE_CONFIG = {
  isConfigured: Boolean(import.meta.env?.VITE_SUPABASE_URL && import.meta.env?.VITE_SUPABASE_ANON_KEY),
  url: import.meta.env?.VITE_SUPABASE_URL || null,
  key: import.meta.env?.VITE_SUPABASE_ANON_KEY || null
};
