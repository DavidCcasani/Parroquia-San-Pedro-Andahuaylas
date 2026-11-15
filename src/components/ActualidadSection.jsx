import React, { useState, useEffect } from 'react';
import { getPosts, subscribeToPosts, CATEGORIAS } from '../services/postsService';

export default function ActualidadSection() {
  const [posts, setPosts] = useState(getPosts());
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Escuchar cambios inmediatos desde el servicio (localStorage o actualizaciones del panel admin)
  useEffect(() => {
    const unsubscribe = subscribeToPosts((updatedPosts) => {
      setPosts(updatedPosts);
    });
    return () => unsubscribe();
  }, []);

  // Filtrado de publicaciones
  const postsFiltrados = posts.filter((post) => {
    const coincideCategoria =
      categoriaActiva === 'Todos' || post.categoria?.toLowerCase() === categoriaActiva.toLowerCase();
    const termino = busqueda.toLowerCase().trim();
    const coincideTexto =
      !termino ||
      post.titulo?.toLowerCase().includes(termino) ||
      post.descripcion?.toLowerCase().includes(termino) ||
      post.lugar?.toLowerCase().includes(termino);
    return coincideCategoria && coincideTexto;
  });

  // Conteo por categoría
  const getCount = (cat) => {
    if (cat === 'Todos') return posts.length;
    return posts.filter((p) => p.categoria?.toLowerCase() === cat.toLowerCase()).length;
  };

  const getCategoriaColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'festividades':
        return { bg: 'rgba(197, 160, 89, 0.14)', text: '#c5a059', border: '#c5a059' };
      case 'eventos':
        return { bg: 'rgba(37, 99, 235, 0.12)', text: '#1d4ed8', border: '#93c5fd' };
      case 'comunicados':
        return { bg: 'rgba(5, 150, 105, 0.12)', text: '#047857', border: '#6ee7b7' };
      default:
        return { bg: '#f3f4f6', text: '#4b5563', border: '#d1d5db' };
    }
  };

  return (
    <div id="content" className="site-content">
      {/* Cabecera de Actualidad con Portada */}
      <header
        className="entry-header cabecera-custom"
        style={{
          backgroundImage: 'url(/assets/images/foto-parroquia-san-pedro-lateral.jpg)',
          backgroundPosition: 'center 35%',
          backgroundSize: 'cover',
          padding: '110px 0 95px 0',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)'
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="row">
            <div className="col-sm-12">
              <h1
                className="entry-title"
                style={{
                  color: '#ffffff',
                  fontFamily: "'Roboto Slab', serif",
                  fontSize: '50px',
                  fontWeight: 700,
                  textShadow: '0 3px 15px rgba(0,0,0,0.85)',
                  margin: '0 0 12px 0'
                }}
              >
                Actualidad y Vida Parroquial
              </h1>
              <p
                style={{
                  color: '#f0ebe1',
                  fontSize: '18px',
                  margin: '0 auto',
                  maxWidth: '760px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                  fontWeight: 400,
                  lineHeight: 1.5
                }}
              >
                Parroquia San Jeronimo Andahuaylas &bull; Diócesis de Abancay, Apurímac
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Bloque Principal */}
      <div className="bloques-pagina" style={{ backgroundColor: '#ffffff', padding: '60px 0 90px 0' }}>
        <div className="container">
          {/* Encabezado Inspiracional */}
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 35px auto', padding: '0 15px' }}>
            <h2
              style={{
                fontFamily: "Georgia, 'Playfair Display', 'Times New Roman', serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#1a1714',
                lineHeight: 1.28,
                margin: '0 0 14px 0',
                letterSpacing: '-0.2px'
              }}
            >
              Próximas actividades, celebraciones y vida comunitaria
            </h2>
            <p
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: '16px',
                color: '#444444',
                fontWeight: 300,
                margin: 0,
                lineHeight: 1.6
              }}
            >
              Participa de las jornadas pastorales, procesiones y encuentros de fe que congregan a nuestra comunidad
              parroquial y a los devotos de Andahuaylas.
            </p>
          </div>

          {/* BARRA DE FILTROS POR CATEGORÍA Y BÚSQUEDA */}
          <div
            style={{
              backgroundColor: '#fbf9f5',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            {/* Píldoras de Categorías */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1a1714',
                  marginRight: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                <i className="fa fa-filter" style={{ color: '#c5a059', marginRight: '4px' }} /> Filtrar:
              </span>

              {CATEGORIAS.map((cat) => {
                const isActive = categoriaActiva.toLowerCase() === cat.toLowerCase();
                const count = getCount(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoriaActiva(cat)}
                    style={{
                      backgroundColor: isActive ? '#c5a059' : '#ffffff',
                      color: isActive ? '#ffffff' : '#2a241e',
                      border: isActive ? '1.5px solid #c5a059' : '1.5px solid #e8ecf0',
                      borderRadius: '9999px',
                      padding: '7px 18px',
                      fontSize: '13.5px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      boxShadow: isActive ? '0 3px 10px rgba(197, 160, 89, 0.35)' : 'none',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      style={{
                        backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)',
                        color: isActive ? '#ffffff' : '#666666',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '1px 7px',
                        borderRadius: '9999px'
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Buscador Rápido y Acceso Admin */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '220px' }}>
                <i
                  className="fa fa-search"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#888888',
                    fontSize: '13px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Buscar actividad..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 32px',
                    borderRadius: '9999px',
                    border: '1.5px solid #d0d7de',
                    fontSize: '13px',
                    background: '#ffffff',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Enlace al Panel Admin */}
              <a
                href="/admin"
                title="Gestionar publicaciones (Panel Administrador)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#23170e',
                  color: '#f5efe6',
                  border: '1px solid #c5a059',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s'
                }}
              >
                <i className="fa fa-lock" style={{ color: '#c5a059' }} />
                <span>Panel Admin</span>
              </a>
            </div>
          </div>

          {/* GRID DE PUBLICACIONES */}
          {postsFiltrados.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#fafafa',
                borderRadius: '16px',
                border: '1px dashed #d0d7de'
              }}
            >
              <i className="fa fa-calendar-times-o" style={{ fontSize: '42px', color: '#c5a059', marginBottom: '14px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1714', margin: '0 0 8px 0' }}>
                No se encontraron publicaciones
              </h3>
              <p style={{ color: '#666666', fontSize: '14px', margin: '0 0 16px 0' }}>
                No hay actividades registradas en la categoría "{categoriaActiva}" con los filtros actuales.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategoriaActiva('Todos');
                  setBusqueda('');
                }}
                style={{
                  backgroundColor: '#c5a059',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '9px 24px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Mostrar todas las actividades
              </button>
            </div>
          ) : (
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
              {postsFiltrados.map((post) => {
                const catStyle = getCategoriaColor(post.categoria);
                return (
                  <div key={post.id} className="col-md-4 col-sm-6 col-xs-12" style={{ marginBottom: '30px', display: 'flex' }}>
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #f0f0f0',
                        borderRadius: '14px',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.07)',
                        overflow: 'hidden',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                      }}
                    >
                      <div>
                        {/* Imagen con botón para ampliar */}
                        <div
                          style={{
                            height: '240px',
                            overflow: 'hidden',
                            position: 'relative',
                            background: '#23170e',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedImage({ src: post.imagen, title: post.titulo })}
                        >
                          <img
                            src={post.imagen}
                            alt={post.titulo}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top center',
                              display: 'block',
                              transition: 'transform 0.4s ease'
                            }}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              backgroundColor: catStyle.bg,
                              color: catStyle.text,
                              border: `1px solid ${catStyle.border}`,
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              backdropFilter: 'blur(6px)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {post.categoria}
                          </span>
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '12px',
                              right: '12px',
                              background: 'rgba(0,0,0,0.7)',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '5px 12px',
                              borderRadius: '9999px',
                              backdropFilter: 'blur(4px)',
                              pointerEvents: 'none'
                            }}
                          >
                            <i className="fa fa-search-plus" /> Ver afiche
                          </span>
                        </div>

                        {/* Cuerpo de la Tarjeta */}
                        <div style={{ padding: '24px 24px 16px 24px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                            <span
                              style={{
                                backgroundColor: 'rgba(197,160,89,0.12)',
                                color: '#c5a059',
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                fontSize: '12px',
                                fontWeight: 700,
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <i className="fa fa-calendar" /> {post.fecha}
                            </span>
                            {post.hora && (
                              <span
                                style={{
                                  backgroundColor: '#f7f7f7',
                                  color: '#555',
                                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  padding: '4px 12px',
                                  borderRadius: '9999px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}
                              >
                                <i className="fa fa-clock-o" /> {post.hora}
                              </span>
                            )}
                          </div>

                          <h3
                            style={{
                              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontSize: '19px',
                              fontWeight: 700,
                              color: '#1a1714',
                              margin: '0 0 10px 0',
                              lineHeight: 1.35
                            }}
                          >
                            {post.titulo}
                          </h3>

                          <p style={{ fontSize: '13.5px', color: '#555555', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                            {post.descripcion}
                          </p>

                          {post.lugar && (
                            <div
                              style={{
                                backgroundColor: '#fafafa',
                                border: '1.5px solid #d0d7de',
                                borderRadius: '12px',
                                padding: '12px 14px',
                                marginBottom: '8px',
                                fontSize: '12.5px',
                                color: '#333333'
                              }}
                            >
                              <strong style={{ color: '#c5a059' }}>
                                <i className="fa fa-map-marker" /> Lugar / Detalle:
                              </strong>{' '}
                              {post.lugar}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pie del Card */}
                      <div
                        style={{
                          padding: '14px 24px 18px 24px',
                          borderTop: '1px solid #f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedImage({ src: post.imagen, title: post.titulo })}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#c5a059',
                            fontSize: '13.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: 0
                          }}
                        >
                          <span>Ampliar invitación</span> <i className="fa fa-external-link" style={{ fontSize: '11px' }} />
                        </button>
                        <span style={{ fontSize: '11.5px', color: '#888' }}>
                          {post.organizador || 'Parroquia San Jeronimo'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Lightbox para Ampliar Afiche */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar vista previa"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '28px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'block',
                margin: '0 auto'
              }}
            />
            <p style={{ color: '#ffffff', marginTop: '12px', fontSize: '15px', fontWeight: 600 }}>
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}