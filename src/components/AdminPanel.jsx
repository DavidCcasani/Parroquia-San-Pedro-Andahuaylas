import React, { useState, useEffect } from 'react';
import { getPosts, createPost, deletePost, resetPosts, subscribeToPosts, CATEGORIAS, SUPABASE_CONFIG } from '../services/postsService';

const ADMIN_STORAGE_KEY = 'parroquia_admin_session';

const IMAGENES_PREDETERMINADAS = [
  { label: 'Señor de los Milagros', url: '/assets/images/evento-senor-de-los-milagros-andahuaylas.jpg' },
  { label: 'Holywins / Niños', url: '/assets/images/evento-holywins-andahuaylas.jpg' },
  { label: 'Jornada Pastoral / Ancianos', url: '/assets/images/evento-jornada-enfermos-ancianos.jpg' },
  { label: 'Encuentro de Oración', url: '/assets/images/evento-encuentro-jesus-maria-sillapata.jpg' },
  { label: 'Frontis Parroquia Sillar', url: '/assets/images/foto-parroquia-san-pedro-lateral.jpg' },
  { label: 'Templo Histórico', url: '/assets/images/parroquia-san-pedro-historia-01.jpg' }
];

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estados de gestión de publicaciones
  const [posts, setPosts] = useState(getPosts());
  const [successMsg, setSuccessMsg] = useState('');
  const [formError, setFormError] = useState('');

  // Formulario de nueva publicación
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'Eventos',
    fecha: '',
    hora: '',
    imagen: '/assets/images/foto-parroquia-san-pedro-lateral.jpg',
    descripcion: '',
    lugar: '',
    organizador: 'Parroquia San Jeronimo'
  });

  // Verificar sesión existente en localStorage
  useEffect(() => {
    try {
      const session = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (session === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, []);

  // Escuchar actualizaciones de posts
  useEffect(() => {
    const unsubscribe = subscribeToPosts((updated) => {
      setPosts(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciales de administración
    if (username.trim() === 'admin' && (password === 'parroquia2026' || password === 'admin123')) {
      setIsAuthenticated(true);
      setLoginError('');
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      } catch {
        // Ignorar
      }
    } else {
      setLoginError('Usuario o contraseña incorrectos. (Prueba con usuario: admin / clave: parroquia2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // Ignorar
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
    if (successMsg) setSuccessMsg('');
  };

  // Carga de archivo de imagen local (conversión a DataURL)
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('La imagen seleccionada supera los 2MB. Te sugerimos una imagen más liviana.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      setFormError('El título de la publicación es obligatorio.');
      return;
    }
    if (!formData.fecha.trim()) {
      setFormError('Por favor especifica la fecha de la actividad.');
      return;
    }
    if (!formData.descripcion.trim()) {
      setFormError('Por favor ingresa una breve descripción o detalle de la publicación.');
      return;
    }

    createPost(formData);

    setSuccessMsg('¡Publicación creada exitosamente! Ya está visible en la sección de Actualidad.');
    setFormError('');

    // Reset form conservando valores comunes
    setFormData({
      titulo: '',
      categoria: 'Eventos',
      fecha: '',
      hora: '',
      imagen: '/assets/images/foto-parroquia-san-pedro-lateral.jpg',
      descripcion: '',
      lugar: '',
      organizador: 'Parroquia San Jeronimo'
    });

    // Auto-ocultar mensaje de éxito en 4 segundos
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleDelete = (id, titulo) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la publicación "${titulo}"?`)) {
      deletePost(id);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Restablecer todas las publicaciones a los datos originales de la parroquia?')) {
      resetPosts();
    }
  };

  return (
    <div id="content" className="site-content" style={{ backgroundColor: '#fcfaf7', minHeight: '80vh', padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        {/* PANTALLA 1: INICIO DE SESIÓN BÁSICO */}
        {!isAuthenticated ? (
          <div style={{ maxWidth: '460px', margin: '40px auto 0 auto' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                padding: '40px 32px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: 'linear-gradient(90deg, #c5a059 0%, #e0c587 100%)'
                }}
              />

              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#23170e',
                    border: '2px solid #c5a059',
                    color: '#c5a059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    margin: '0 auto 14px auto',
                    boxShadow: '0 4px 12px rgba(197, 155, 67, 0.3)'
                  }}
                >
                  <i className="fa fa-lock" />
                </div>
                <h2
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#1a1714',
                    margin: '0 0 6px 0'
                  }}
                >
                  Panel Administrativo
                </h2>
                <p style={{ fontSize: '13.5px', color: '#666666', margin: 0 }}>
                  Gestión de publicaciones de Actualidad Parroquial
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                  <label
                    htmlFor="username"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                  >
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario (ej. admin)"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1.5px solid #d0d7de',
                      borderRadius: '10px',
                      fontSize: '14.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label
                    htmlFor="password"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña de acceso"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1.5px solid #d0d7de',
                      borderRadius: '10px',
                      fontSize: '14.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {loginError && (
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #f87171',
                      color: '#b91c1c',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginBottom: '18px'
                    }}
                  >
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#c5a059',
                    backgroundImage: 'linear-gradient(135deg, #d4b068 0%, #c5a059 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '13px 20px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(197, 160, 89, 0.4)'
                  }}
                >
                  <i className="fa fa-sign-in" style={{ marginRight: '6px' }} /> Iniciar Sesión
                </button>
              </form>

              {/* Nota Informativa con Credenciales para Pruebas */}
              <div
                style={{
                  marginTop: '22px',
                  backgroundColor: '#fbf9f5',
                  border: '1px dashed rgba(197, 160, 89, 0.35)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontSize: '12px',
                  color: '#666666',
                  lineHeight: 1.5
                }}
              >
                <strong style={{ color: '#c5a059' }}>Acceso rápido de prueba:</strong>
                <br />
                Usuario: <code>admin</code> &bull; Clave: <code>parroquia2026</code>
              </div>
            </div>
          </div>
        ) : (
          /* PANTALLA 2: DASHBOARD ADMINISTRATIVO PROTEGIDO */
          <div>
            {/* Barra Superior de Control del Administrador */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                padding: '20px 24px',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    color: '#c5a059',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Sesión Activa
                </span>
                <h2
                  style={{
                    margin: '6px 0 2px 0',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#1a1714'
                  }}
                >
                  Gestión de Publicaciones Parroquiales
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#666666' }}>
                  Los cambios se reflejan inmediatamente en la sección de Actualidad.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href="/actualidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#f7f7f7',
                    border: '1px solid #d0d7de',
                    color: '#1a1714',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '9px 18px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fa fa-eye" style={{ color: '#c5a059' }} /> Ver Actualidad en vivo
                </a>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#23170e',
                    border: '1px solid #c5a059',
                    color: '#f5efe6',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '9px 18px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fa fa-sign-out" style={{ color: '#c5a059' }} /> Cerrar Sesión
                </button>
              </div>
            </div>

            {/* FORMULARIO PARA CREAR NUEVA PUBLICACIÓN */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                padding: '36px 32px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '40px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: 'linear-gradient(90deg, #c5a059 0%, #e0c587 100%)'
                }}
              />

              <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(197, 160, 89, 0.12)',
                    color: '#c5a059',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}
                >
                  <i className="fa fa-plus-circle" /> Nueva Publicación
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#1a1714'
                  }}
                >
                  Crear Noticia, Evento o Festividad
                </h3>
              </div>

              {successMsg && (
                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #10b981',
                    color: '#065f46',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <i className="fa fa-check-circle" style={{ fontSize: '18px', color: '#10b981' }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {formError && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #f87171',
                    color: '#b91c1c',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <i className="fa fa-exclamation-triangle" style={{ fontSize: '18px' }} />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitPost}>
                <div className="row">
                  {/* Título */}
                  <div className="col-sm-8" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="titulo"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Título de la Publicación <span style={{ color: '#c5a059' }}>*</span>
                    </label>
                    <input
                      id="titulo"
                      type="text"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleFormChange}
                      placeholder="Ej. Solemne Misa y Procesión de San Jeronimo"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Categoría */}
                  <div className="col-sm-4" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="categoria"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Categoría <span style={{ color: '#c5a059' }}>*</span>
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14.5px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#ffffff'
                      }}
                    >
                      <option value="Eventos">Eventos</option>
                      <option value="Comunicados">Comunicados</option>
                      <option value="Festividades">Festividades</option>
                    </select>
                  </div>

                  {/* Fecha */}
                  <div className="col-sm-6" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="fecha"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Fecha <span style={{ color: '#c5a059' }}>*</span>
                    </label>
                    <input
                      id="fecha"
                      type="text"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleFormChange}
                      placeholder="Ej. Domingo 20 de Noviembre del 2026"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Hora */}
                  <div className="col-sm-6" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="hora"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Horario / Hora <span style={{ fontWeight: 400, color: '#888' }}>(Opcional)</span>
                    </label>
                    <input
                      id="hora"
                      type="text"
                      name="hora"
                      value={formData.hora}
                      onChange={handleFormChange}
                      placeholder="Ej. 6:00 p.m. / 10:00 A.M."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Imagen (URL, selector de fotos y archivo local) */}
                  <div className="col-sm-12" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="imagen"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Imagen / Afiche de la Publicación
                    </label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      <input
                        id="imagen"
                        type="text"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleFormChange}
                        placeholder="Ruta local o URL web (ej. /assets/images/... o https://...)"
                        style={{
                          flex: 1,
                          minWidth: '260px',
                          padding: '12px 14px',
                          border: '1.5px solid #d0d7de',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <label
                        style={{
                          backgroundColor: '#f3f4f6',
                          border: '1.5px solid #d0d7de',
                          borderRadius: '10px',
                          padding: '11px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <i className="fa fa-upload" style={{ color: '#c5a059' }} />
                        <span>Subir desde dispositivo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    {/* Atajos a imágenes existentes de la parroquia */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '11.5px', color: '#666', fontWeight: 600 }}>Fotos predeterminadas:</span>
                      {IMAGENES_PREDETERMINADAS.map((img) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, imagen: img.url }))}
                          style={{
                            background: formData.imagen === img.url ? '#c5a059' : '#ffffff',
                            color: formData.imagen === img.url ? '#ffffff' : '#333333',
                            border: '1px solid #d0d7de',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            padding: '3px 10px',
                            cursor: 'pointer'
                          }}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>

                    {/* Previsualización de Imagen */}
                    {formData.imagen && (
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '80px',
                            height: '60px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #d0d7de',
                            background: '#fafafa'
                          }}
                        >
                          <img
                            src={formData.imagen}
                            alt="Previsualización"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/assets/images/foto-parroquia-san-pedro-lateral.jpg';
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '12px', color: '#666' }}>Vista previa del afiche cargado</span>
                      </div>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="col-sm-12" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="descripcion"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Descripción de la Actividad <span style={{ color: '#c5a059' }}>*</span>
                    </label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      rows="4"
                      value={formData.descripcion}
                      onChange={handleFormChange}
                      placeholder="Explica de qué trata la actividad, a quién está dirigida y el mensaje a los fieles..."
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Lugar */}
                  <div className="col-sm-6" style={{ marginBottom: '18px' }}>
                    <label
                      htmlFor="lugar"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Lugar o Punto de Partida
                    </label>
                    <input
                      id="lugar"
                      type="text"
                      name="lugar"
                      value={formData.lugar}
                      onChange={handleFormChange}
                      placeholder="Ej. Templo de San Jeronimo / Plaza de Armas"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Organizador */}
                  <div className="col-sm-6" style={{ marginBottom: '24px' }}>
                    <label
                      htmlFor="organizador"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333333', marginBottom: '6px' }}
                    >
                      Pastoral u Organización Encargada
                    </label>
                    <input
                      id="organizador"
                      type="text"
                      name="organizador"
                      value={formData.organizador}
                      onChange={handleFormChange}
                      placeholder="Ej. Hermandad, Catequesis, Pastoral Juvenil..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1.5px solid #d0d7de',
                        borderRadius: '10px',
                        fontSize: '14.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'center', paddingTop: '8px' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#c5a059',
                      backgroundImage: 'linear-gradient(135deg, #d4b068 0%, #c5a059 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '14px 44px',
                      fontSize: '16px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(197, 160, 89, 0.45)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="fa fa-check" /> Publicar en Actualidad
                  </button>
                </div>
              </form>
            </div>

            {/* LISTADO DE PUBLICACIONES REGISTRADAS */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                padding: '30px 28px',
                marginBottom: '40px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#1a1714'
                    }}
                  >
                    Publicaciones Activas ({posts.length})
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666666' }}>
                    Administra o retira publicaciones existentes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'none',
                    border: '1px solid #d0d7de',
                    color: '#666666',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fa fa-refresh" style={{ marginRight: '4px' }} /> Restablecer datos iniciales
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1.5px solid #e8ecf0',
                      backgroundColor: '#fafafa',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px', flex: 1 }}>
                      <img
                        src={post.imagen}
                        alt=""
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid #d0d7de',
                          flexShrink: 0
                        }}
                        onError={(e) => {
                          e.target.src = '/assets/images/foto-parroquia-san-pedro-lateral.jpg';
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                          <span
                            style={{
                              backgroundColor: 'rgba(197, 160, 89, 0.15)',
                              color: '#c5a059',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '9999px'
                            }}
                          >
                            {post.categoria}
                          </span>
                          <span style={{ fontSize: '11.5px', color: '#777' }}>{post.fecha}</span>
                        </div>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: '14.5px',
                            fontWeight: 700,
                            color: '#1a1714',
                            lineHeight: 1.3
                          }}
                        >
                          {post.titulo}
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id, post.titulo)}
                        style={{
                          backgroundColor: '#fee2e2',
                          border: '1px solid #fca5a5',
                          color: '#b91c1c',
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <i className="fa fa-trash-o" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN PREPARADA PARA SUPABASE */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '16px',
                padding: '22px 26px',
                fontSize: '13px',
                color: '#555555',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}
            >
              <i className="fa fa-database" style={{ color: '#c5a059', fontSize: '20px', marginTop: '2px' }} />
              <div>
                <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#1a1714' }}>
                  Sincronización y Preparación para Supabase
                </h5>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  Actualmente los cambios se almacenan de manera local y persistente en <strong>localStorage</strong> (reflejándose
                  en tiempo real en toda la web). El servicio <code>src/services/postsService.js</code> está preparado
                  para conectar con Supabase creando la tabla <code>publicaciones</code> e ingresando las credenciales en <code>.env</code>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}