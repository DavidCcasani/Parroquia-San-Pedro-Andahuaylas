import React, { useState } from 'react';

/**
 * Constantes de contacto de la Parroquia San Jeronimo Andahuaylas
 */
const PARISH_PHONE_DISPLAY = '+51 984 123 456';
const PARISH_PHONE_NUM = '51984123456';
const PARISH_EMAIL = 'sanpedro.andahuaylas@gmail.com';

const TIPOS_TRAMITE = [
  {
    id: 'bautizo',
    titulo: 'Bautizo',
    subtitulo: 'Sacramento de iniciación cristiana',
    icon: 'fa-tint',
    color: '#0284c7'
  },
  {
    id: 'misa',
    titulo: 'Intención de Misa',
    subtitulo: 'Eucaristía por salud, difunto o acción de gracias',
    icon: 'fa-bell-o',
    color: '#c5a059'
  },
  {
    id: 'partida',
    titulo: 'Partida de Bautizo',
    subtitulo: 'Certificado y constancia parroquial oficial',
    icon: 'fa-file-text-o',
    color: '#16a34a'
  },
  {
    id: 'matrimonio',
    titulo: 'Matrimonio',
    subtitulo: 'Apertura de expediente matrimonial religioso',
    icon: 'fa-heart',
    color: '#e11d48'
  }
];

export default function TramitesSection() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('bautizo');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Estados generales del solicitante
  const [formData, setFormData] = useState({
    // Datos generales de contacto
    solicitanteNombre: '',
    solicitanteTelefono: '',
    solicitanteEmail: '',
    observaciones: '',

    // Específico: Bautizo
    bautizoNombreNino: '',
    bautizoFechaNac: '',
    bautizoPadres: '',
    bautizoPadrinos: '',
    bautizoFechaDeseada: '',
    bautizoRequisitosPadrinos: 'si',

    // Específico: Intención de Misa
    misaTipoIntencion: 'salud',
    misaNombres: '',
    misaFecha: '',
    misaHorario: '6:00 p.m. (Lunes a Sábado)',

    // Específico: Partida de Bautizo
    partidaNombreBautizado: '',
    partidaAnioAprox: '',
    partidaPadres: '',
    partidaPadrinos: '',
    partidaMotivo: 'matrimonio',
    partidaLegalizacion: 'no',

    // Específico: Matrimonio
    matrimonioNovio: '',
    matrimonioNovioBautizo: '',
    matrimonioNovia: '',
    matrimonioNoviaBautizo: '',
    matrimonioFechaDeseada: '',
    matrimonioSacramentosCompletos: 'si'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSelectTipo = (tipoId) => {
    setTipoSeleccionado(tipoId);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas de campos indispensables
    if (!formData.solicitanteNombre.trim()) {
      setErrorMsg('Por favor ingresa tu nombre y apellido completos.');
      return;
    }
    if (!formData.solicitanteTelefono.trim()) {
      setErrorMsg('Por favor ingresa un número de teléfono o celular de contacto.');
      return;
    }

    if (tipoSeleccionado === 'bautizo') {
      if (!formData.bautizoNombreNino.trim()) {
        setErrorMsg('Por favor ingresa el nombre del niño/a a bautizar.');
        return;
      }
    } else if (tipoSeleccionado === 'misa') {
      if (!formData.misaNombres.trim()) {
        setErrorMsg('Por favor ingresa el nombre de la persona por quien se ofrece la misa.');
        return;
      }
      if (!formData.misaFecha.trim()) {
        setErrorMsg('Por favor selecciona la fecha deseada para la misa.');
        return;
      }
    } else if (tipoSeleccionado === 'partida') {
      if (!formData.partidaNombreBautizado.trim()) {
        setErrorMsg('Por favor ingresa el nombre de la persona de quien se solicita la partida.');
        return;
      }
    } else if (tipoSeleccionado === 'matrimonio') {
      if (!formData.matrimonioNovio.trim() || !formData.matrimonioNovia.trim()) {
        setErrorMsg('Por favor completa los nombres de ambos novios.');
        return;
      }
    }

    setErrorMsg('');
    setIsSubmitted(true);
    // Scroll suave a la cabecera del resumen
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Construcción del texto formateado para WhatsApp y Correo
  const getFormattedMessage = () => {
    const tipo = TIPOS_TRAMITE.find((t) => t.id === tipoSeleccionado)?.titulo || tipoSeleccionado;

    let detalles = '';
    if (tipoSeleccionado === 'bautizo') {
      detalles = `• Nombre del Niño/a: ${formData.bautizoNombreNino}
• Fecha de Nacimiento: ${formData.bautizoFechaNac || 'No especificada'}
• Padres: ${formData.bautizoPadres || 'No especificados'}
• Padrinos: ${formData.bautizoPadrinos || 'No especificados'}
• ¿Padrinos cumplen requisitos canónicos?: ${formData.bautizoRequisitosPadrinos === 'si' ? 'Sí' : 'Por consultar'}
• Fecha tentativa deseada: ${formData.bautizoFechaDeseada || 'A coordinar'}`;
    } else if (tipoSeleccionado === 'misa') {
      const tipoIntencionMap = {
        salud: 'Por la Salud y Recuperación',
        difunto: 'Por el Eterno Descanso (Difunto)',
        agradecimiento: 'Acción de Gracias',
        cumpleanos: 'Cumpleaños / Aniversario'
      };
      detalles = `• Motivo de la Intención: ${tipoIntencionMap[formData.misaTipoIntencion] || formData.misaTipoIntencion}
• Nombre(s) de la Intención: ${formData.misaNombres}
• Fecha de la Misa: ${formData.misaFecha}
• Horario deseado: ${formData.misaHorario}`;
    } else if (tipoSeleccionado === 'partida') {
      const motivoMap = {
        matrimonio: 'Para Matrimonio Religioso',
        confirmacion: 'Para Sacramento de Confirmación',
        personal: 'Trámite personal / Civil',
        otro: 'Otro trámite'
      };
      detalles = `• Nombre del Bautizado/a: ${formData.partidaNombreBautizado}
• Año / Fecha Aprox. del Bautizo: ${formData.partidaAnioAprox || 'No precisado'}
• Nombres de los Padres: ${formData.partidaPadres || 'No precisado'}
• Nombres de los Padrinos: ${formData.partidaPadrinos || 'No precisado'}
• Finalidad del Certificado: ${motivoMap[formData.partidaMotivo] || formData.partidaMotivo}
• ¿Requiere Legalización Diocesana?: ${formData.partidaLegalizacion === 'si' ? 'Sí' : 'No'}`;
    } else if (tipoSeleccionado === 'matrimonio') {
      detalles = `• Novio: ${formData.matrimonioNovio} (Bautizado en: ${formData.matrimonioNovioBautizo || 'Por verificar'})
• Novia: ${formData.matrimonioNovia} (Bautizada en: ${formData.matrimonioNoviaBautizo || 'Por verificar'})
• Fecha tentativa de la Boda: ${formData.matrimonioFechaDeseada || 'A coordinar'}
• ¿Sacramentos previos al día?: ${formData.matrimonioSacramentosCompletos === 'si' ? 'Sí, ambos' : 'En proceso / Por verificar'}`;
    }

    return `🏛️ *SOLICITUD PARROQUIAL - PARROQUIA SAN JERONIMO ANDAHUAYLAS*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 *Trámite:* ${tipo}
👤 *Solicitante:* ${formData.solicitanteNombre}
📱 *Teléfono / Celular:* ${formData.solicitanteTelefono}
📧 *Correo:* ${formData.solicitanteEmail || 'No indicado'}

📋 *DETALLES DEL TRÁMITE:*
${detalles}

${formData.observaciones.trim() ? `📝 *Observaciones adicionales:*\n${formData.observaciones}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Enviado desde el portal web oficial de la Parroquia San Jeronimo Andahuaylas_`;
  };

  const handleCopy = () => {
    const text = getFormattedMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getWhatsAppUrl = () => {
    const text = getFormattedMessage();
    return `https://wa.me/${PARISH_PHONE_NUM}?text=${encodeURIComponent(text)}`;
  };

  const getMailtoUrl = () => {
    const tipo = TIPOS_TRAMITE.find((t) => t.id === tipoSeleccionado)?.titulo || tipoSeleccionado;
    const subject = `Solicitud de ${tipo} - ${formData.solicitanteNombre}`;
    const body = getFormattedMessage();
    return `mailto:${PARISH_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div id="content" className="site-content">
      {/* Cabecera de Página de Trámites */}
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
            background: 'linear-gradient(to bottom, rgba(26,23,20,0.65) 0%, rgba(26,23,20,0.92) 100%)'
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="row">
            <div className="col-sm-12">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(197, 160, 89, 0.25)',
                  border: '1px solid #c5a059',
                  color: '#f0ebe1',
                  padding: '6px 18px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '16px'
                }}
              >
                <i className="fa fa-folder-open-o" style={{ color: '#c5a059' }} /> Despacho Parroquial Virtual
              </div>
              <h1
                className="entry-title"
                style={{
                  color: '#ffffff',
                  fontFamily: "'Roboto Slab', serif",
                  fontSize: '44px',
                  fontWeight: 700,
                  textShadow: '0 3px 15px rgba(0,0,0,0.85)',
                  margin: '0 0 12px 0'
                }}
              >
                Trámites y Solicitudes Parroquiales
              </h1>
              <p
                style={{
                  color: '#f0ebe1',
                  fontSize: '17px',
                  maxWidth: '740px',
                  margin: '0 auto',
                  textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                  fontWeight: 400,
                  lineHeight: 1.5
                }}
              >
                Parroquia San Jeronimo Andahuaylas &bull; Diócesis de Abancay
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal con Bento Cards */}
      <div className="bloques-pagina" style={{ backgroundColor: '#fcfaf7', padding: '60px 0 90px 0' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          {/* Introducción Informativa */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px auto', padding: '0 15px' }}>
            <h2
              style={{
                fontFamily: "Georgia, 'Playfair Display', serif",
                fontSize: '30px',
                fontWeight: 700,
                color: '#1a1714',
                lineHeight: 1.3,
                margin: '0 0 14px 0'
              }}
            >
              Atención pastoral a tu servicio y al de tu familia
            </h2>
            <p
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: '16px',
                color: '#555555',
                margin: 0,
                lineHeight: 1.6
              }}
            >
              Inicia tu solicitud sacramental o administrativa de forma digital. Completa los datos requeridos y envíalos
              directamente al WhatsApp o correo del despacho para agilizar tu atención en la parroquia.
            </p>
          </div>

          {/* Tarjeta de Selección de Trámite (Estilo Contacto / Bento Grid) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #eaeaea',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '32px'
            }}
          >
            {/* Detalle decorativo dorado superior */}
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

            <div style={{ marginBottom: '18px', textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(197, 160, 89, 0.12)',
                  color: '#c5a059',
                  padding: '5px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  marginBottom: '10px'
                }}
              >
                <i className="fa fa-hand-pointer-o" /> Paso 1: Elige el Trámite
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  color: '#1a1714',
                  fontSize: '22px',
                  fontWeight: 800
                }}
              >
                ¿Qué trámite o sacramento deseas gestionar?
              </h3>
            </div>

            {/* Grid de 4 opciones de trámites */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}
            >
              {TIPOS_TRAMITE.map((tipo) => {
                const isActive = tipoSeleccionado === tipo.id;
                return (
                  <button
                    key={tipo.id}
                    type="button"
                    onClick={() => handleSelectTipo(tipo.id)}
                    style={{
                      backgroundColor: isActive ? '#c5a059' : '#ffffff',
                      color: isActive ? '#ffffff' : '#1a1714',
                      border: isActive ? '2px solid #c5a059' : '1.5px solid #e8ecf0',
                      borderRadius: '14px',
                      padding: '20px 16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.22s ease',
                      boxShadow: isActive ? '0 8px 24px rgba(197, 160, 89, 0.38)' : '0 2px 8px rgba(0,0,0,0.03)',
                      transform: isActive ? 'translateY(-2px)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      outline: 'none'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? '#ffffff' : 'rgba(197, 160, 89, 0.15)',
                        color: isActive ? '#c5a059' : '#c5a059',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        boxShadow: isActive ? '0 3px 10px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <i className={`fa ${tipo.icon}`} />
                    </div>
                    <span
                      style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '16px',
                        fontWeight: 700,
                        color: isActive ? '#ffffff' : '#1a1714'
                      }}
                    >
                      {tipo.titulo}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: 1.35,
                        color: isActive ? 'rgba(255,255,255,0.92)' : '#666666'
                      }}
                    >
                      {tipo.subtitulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VISTA DE CONFIRMACIÓN (Al Enviar) */}
          {isSubmitted ? (
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
                  background: 'linear-gradient(90deg, #10b981 0%, #c5a059 100%)'
                }}
              />

              <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 30px auto' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    margin: '0 auto 16px auto',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <i className="fa fa-check" />
                </div>
                <h3
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#1a1714',
                    margin: '0 0 8px 0'
                  }}
                >
                  ¡Solicitud Formulada con Éxito!
                </h3>
                <p style={{ fontSize: '15px', color: '#555555', margin: 0, lineHeight: 1.5 }}>
                  Tus datos han sido estructurados para despacho. Para que la Parroquia San Jeronimo proceda con la
                  revisión y calendarización,{' '}
                  <strong>envía la información a nuestro canal oficial por WhatsApp o Correo:</strong>
                </p>
              </div>

              {/* Botones de Envío Directo WhatsApp y Correo */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                  marginBottom: '32px'
                }}
              >
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#25d366',
                    color: '#ffffff',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '15.5px',
                    fontWeight: 700,
                    padding: '14px 34px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 5px 18px rgba(37,211,102,0.4)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '20px' }} />
                  <span>Enviar a WhatsApp ({PARISH_PHONE_DISPLAY})</span>
                </a>

                <a
                  href={getMailtoUrl()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#23170e',
                    border: '1.5px solid #c5a059',
                    color: '#f5efe6',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '15.5px',
                    fontWeight: 600,
                    padding: '13px 30px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <i className="fa fa-envelope" style={{ color: '#c5a059', fontSize: '16px' }} />
                  <span>Enviar por Correo Electrónico</span>
                </a>
              </div>

              {/* Tarjeta de Resumen / Vista Previa de los Datos */}
              <div
                style={{
                  backgroundColor: '#fbf9f5',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  borderRadius: '12px',
                  padding: '24px 26px',
                  maxWidth: '720px',
                  margin: '0 auto 28px auto'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '14px',
                    borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
                    paddingBottom: '10px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#c5a059',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px'
                    }}
                  >
                    Resumen de tu Solicitud
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      background: 'none',
                      border: '1px solid #c5a059',
                      color: '#c5a059',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <i className={`fa ${copied ? 'fa-check' : 'fa-clone'}`} />
                    <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>

                <pre
                  style={{
                    fontFamily: "'SFMono-Regular', Consolas, Menlo, monospace",
                    fontSize: '13px',
                    color: '#2a241e',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                    lineHeight: 1.6,
                    background: 'transparent',
                    border: 'none',
                    padding: 0
                  }}
                >
                  {getFormattedMessage()}
                </pre>
              </div>

              {/* Botón para regresar o hacer otra solicitud */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666666',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  &larr; Modificar o hacer otra solicitud
                </button>
              </div>
            </div>
          ) : (
            /* FORMULARIO DINÁMICO SEGÚN TIPO SELECCIONADO */
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                padding: '36px 32px',
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

              {/* Encabezado del Formulario */}
              <div
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: '16px',
                  marginBottom: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(197, 160, 89, 0.12)',
                      color: '#c5a059',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '8px'
                    }}
                  >
                    <i className="fa fa-pencil-square-o" /> Paso 2: Completa los Datos
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      color: '#1a1714',
                      fontSize: '22px',
                      fontWeight: 800
                    }}
                  >
                    Formulario para{' '}
                    <span style={{ color: '#c5a059' }}>
                      {TIPOS_TRAMITE.find((t) => t.id === tipoSeleccionado)?.titulo}
                    </span>
                  </h3>
                </div>

                <div
                  style={{
                    fontSize: '12.5px',
                    color: '#777777',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ color: '#c5a059', fontWeight: 700 }}>*</span> Campos obligatorios
                </div>
              </div>

              {/* SECCIÓN A: DATOS DEL SOLICITANTE */}
              <div style={{ marginBottom: '26px' }}>
                <h4
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#1a1714',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#c5a059',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                  >
                    1
                  </span>
                  Datos de Contacto del Solicitante
                </h4>

                <div className="row">
                  <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="solicitanteNombre"
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#333333',
                        marginBottom: '6px'
                      }}
                    >
                      Nombres y Apellidos Completos <span style={{ color: '#c5a059' }}>*</span>
                    </label>
                    <input
                      id="solicitanteNombre"
                      type="text"
                      name="solicitanteNombre"
                      value={formData.solicitanteNombre}
                      onChange={handleChange}
                      placeholder="Ej. Juan Carlos Pérez Quispe"
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

                  <div className="col-sm-3" style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="solicitanteTelefono"
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#333333',
                        marginBottom: '6px'
                      }}
                    >
                      Celular / WhatsApp <span style={{ color: '#c5a059' }}>*</span>
                    </label>
                    <input
                      id="solicitanteTelefono"
                      type="tel"
                      name="solicitanteTelefono"
                      value={formData.solicitanteTelefono}
                      onChange={handleChange}
                      placeholder="Ej. 984 123 456"
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

                  <div className="col-sm-3" style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="solicitanteEmail"
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#333333',
                        marginBottom: '6px'
                      }}
                    >
                      Correo Electrónico
                    </label>
                    <input
                      id="solicitanteEmail"
                      type="email"
                      name="solicitanteEmail"
                      value={formData.solicitanteEmail}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
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
              </div>

              {/* SECCIÓN B: CAMPOS DINÁMICOS SEGÚN EL TRÁMITE */}
              <div style={{ marginBottom: '26px' }}>
                <h4
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#1a1714',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#c5a059',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                  >
                    2
                  </span>
                  Información Específica del Sacramento o Trámite
                </h4>

                {/* CASO 1: BAUTIZO */}
                {tipoSeleccionado === 'bautizo' && (
                  <div
                    style={{
                      backgroundColor: '#fbf9f5',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      borderRadius: '12px',
                      padding: '20px 20px 8px 20px'
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-8" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="bautizoNombreNino"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombre Completo del Niño/a <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <input
                          id="bautizoNombreNino"
                          type="text"
                          name="bautizoNombreNino"
                          value={formData.bautizoNombreNino}
                          onChange={handleChange}
                          placeholder="Nombre(s) y apellidos del bautizando"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14.5px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-4" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="bautizoFechaNac"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Fecha de Nacimiento
                        </label>
                        <input
                          id="bautizoFechaNac"
                          type="date"
                          name="bautizoFechaNac"
                          value={formData.bautizoFechaNac}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="bautizoPadres"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombres de los Padres
                        </label>
                        <input
                          id="bautizoPadres"
                          type="text"
                          name="bautizoPadres"
                          value={formData.bautizoPadres}
                          onChange={handleChange}
                          placeholder="Padre y madre del niño/a"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="bautizoPadrinos"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombres de los Padrinos
                        </label>
                        <input
                          id="bautizoPadrinos"
                          type="text"
                          name="bautizoPadrinos"
                          value={formData.bautizoPadrinos}
                          onChange={handleChange}
                          placeholder="Madrina y/o padrino propuestos"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="bautizoFechaDeseada"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Fecha Tentativa Deseada
                        </label>
                        <input
                          id="bautizoFechaDeseada"
                          type="date"
                          name="bautizoFechaDeseada"
                          value={formData.bautizoFechaDeseada}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="bautizoRequisitosPadrinos"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          ¿Padrinos casados por iglesia o confirmados?
                        </label>
                        <select
                          id="bautizoRequisitosPadrinos"
                          name="bautizoRequisitosPadrinos"
                          value={formData.bautizoRequisitosPadrinos}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        >
                          <option value="si">Sí, cumplen con los requisitos eclesiales</option>
                          <option value="consulta">Deseo consultar sobre los requisitos</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px dashed rgba(197, 160, 89, 0.4)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '12.5px',
                        color: '#666666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px'
                      }}
                    >
                      <i className="fa fa-info-circle" style={{ color: '#c5a059', fontSize: '15px' }} />
                      <span>
                        <strong>Requisitos para el día del bautizo:</strong> Copia de DNI del menor y de los padres,
                        copia de partida de nacimiento, y asistencia a la charla pre-bautismal.
                      </span>
                    </div>
                  </div>
                )}

                {/* CASO 2: INTENCIÓN DE MISA */}
                {tipoSeleccionado === 'misa' && (
                  <div
                    style={{
                      backgroundColor: '#fbf9f5',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      borderRadius: '12px',
                      padding: '20px 20px 8px 20px'
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="misaTipoIntencion"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Tipo de Intención <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <select
                          id="misaTipoIntencion"
                          name="misaTipoIntencion"
                          value={formData.misaTipoIntencion}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        >
                          <option value="salud">Por la Salud y Recuperación</option>
                          <option value="difunto">Por el Eterno Descanso (Difunto / Honras fúnebres)</option>
                          <option value="agradecimiento">En Acción de Gracias</option>
                          <option value="cumpleanos">Por Cumpleaños / Aniversario</option>
                        </select>
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="misaNombres"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombre(s) por quien se ofrece <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <input
                          id="misaNombres"
                          type="text"
                          name="misaNombres"
                          value={formData.misaNombres}
                          onChange={handleChange}
                          placeholder="Ej. Familia Pérez / Juan Quispe (Q.E.P.D.)"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="misaFecha"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Fecha de la Misa <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <input
                          id="misaFecha"
                          type="date"
                          name="misaFecha"
                          value={formData.misaFecha}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="misaHorario"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Horario de Misa <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <select
                          id="misaHorario"
                          name="misaHorario"
                          value={formData.misaHorario}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        >
                          <option value="6:00 p.m. (Lunes a Sábado)">6:00 p.m. (Lunes a Sábado)</option>
                          <option value="Domingo - 8:00 a.m.">Domingo - 8:00 a.m.</option>
                          <option value="Domingo - 10:00 a.m.">Domingo - 10:00 a.m.</option>
                          <option value="Domingo - 12:00 m.">Domingo - 12:00 m.</option>
                          <option value="Domingo - 6:00 p.m.">Domingo - 6:00 p.m.</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px dashed rgba(197, 160, 89, 0.4)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '12.5px',
                        color: '#666666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px'
                      }}
                    >
                      <i className="fa fa-bell-o" style={{ color: '#c5a059', fontSize: '15px' }} />
                      <span>
                        Las intenciones recibidas con al menos 2 horas de anticipación son leídas al inicio de la
                        celebración eucarística en el altar mayor.
                      </span>
                    </div>
                  </div>
                )}

                {/* CASO 3: PARTIDA DE BAUTIZO */}
                {tipoSeleccionado === 'partida' && (
                  <div
                    style={{
                      backgroundColor: '#fbf9f5',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      borderRadius: '12px',
                      padding: '20px 20px 8px 20px'
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-8" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="partidaNombreBautizado"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombre Completo del Bautizado/a <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <input
                          id="partidaNombreBautizado"
                          type="text"
                          name="partidaNombreBautizado"
                          value={formData.partidaNombreBautizado}
                          onChange={handleChange}
                          placeholder="Tal como figura en su partida original"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-4" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="partidaAnioAprox"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Año / Década Aprox. del Bautizo
                        </label>
                        <input
                          id="partidaAnioAprox"
                          type="text"
                          name="partidaAnioAprox"
                          value={formData.partidaAnioAprox}
                          onChange={handleChange}
                          placeholder="Ej. 1995 o 1990-2000"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="partidaPadres"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombres de los Padres (para búsqueda en libro)
                        </label>
                        <input
                          id="partidaPadres"
                          type="text"
                          name="partidaPadres"
                          value={formData.partidaPadres}
                          onChange={handleChange}
                          placeholder="Nombre del padre y de la madre"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="partidaPadrinos"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombres de los Padrinos (opcional)
                        </label>
                        <input
                          id="partidaPadrinos"
                          type="text"
                          name="partidaPadrinos"
                          value={formData.partidaPadrinos}
                          onChange={handleChange}
                          placeholder="Si los recuerda, ayuda en la búsqueda"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="partidaMotivo"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Finalidad del Certificado
                        </label>
                        <select
                          id="partidaMotivo"
                          name="partidaMotivo"
                          value={formData.partidaMotivo}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        >
                          <option value="matrimonio">Para Matrimonio Religioso</option>
                          <option value="confirmacion">Para Confirmación</option>
                          <option value="personal">Trámite personal / Civil</option>
                          <option value="otro">Otro propósito</option>
                        </select>
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="partidaLegalizacion"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          ¿Requiere Legalización Diocesana?
                        </label>
                        <select
                          id="partidaLegalizacion"
                          name="partidaLegalizacion"
                          value={formData.partidaLegalizacion}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        >
                          <option value="no">No, uso local en Andahuaylas</option>
                          <option value="si">Sí, para otra diócesis o el extranjero</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px dashed rgba(197, 160, 89, 0.4)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '12.5px',
                        color: '#666666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px'
                      }}
                    >
                      <i className="fa fa-archive" style={{ color: '#c5a059', fontSize: '15px' }} />
                      <span>
                        El archivo parroquial resguarda libros históricos. Las búsquedas demoran entre 24 y 48 horas
                        hábiles en despacho.
                      </span>
                    </div>
                  </div>
                )}

                {/* CASO 4: MATRIMONIO */}
                {tipoSeleccionado === 'matrimonio' && (
                  <div
                    style={{
                      backgroundColor: '#fbf9f5',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      borderRadius: '12px',
                      padding: '20px 20px 8px 20px'
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="matrimonioNovio"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombres y Apellidos del Novio <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <input
                          id="matrimonioNovio"
                          type="text"
                          name="matrimonioNovio"
                          value={formData.matrimonioNovio}
                          onChange={handleChange}
                          placeholder="Nombre completo del novio"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="matrimonioNovioBautizo"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Parroquia donde fue bautizado el Novio
                        </label>
                        <input
                          id="matrimonioNovioBautizo"
                          type="text"
                          name="matrimonioNovioBautizo"
                          value={formData.matrimonioNovioBautizo}
                          onChange={handleChange}
                          placeholder="Ej. Parroquia San Jeronimo / Otra"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="matrimonioNovia"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Nombres y Apellidos de la Novia <span style={{ color: '#c5a059' }}>*</span>
                        </label>
                        <input
                          id="matrimonioNovia"
                          type="text"
                          name="matrimonioNovia"
                          value={formData.matrimonioNovia}
                          onChange={handleChange}
                          placeholder="Nombre completo de la novia"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="matrimonioNoviaBautizo"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Parroquia donde fue bautizada la Novia
                        </label>
                        <input
                          id="matrimonioNoviaBautizo"
                          type="text"
                          name="matrimonioNoviaBautizo"
                          value={formData.matrimonioNoviaBautizo}
                          onChange={handleChange}
                          placeholder="Ej. Parroquia San Jeronimo / Otra"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="matrimonioFechaDeseada"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          Fecha Tentativa Deseada para la Boda
                        </label>
                        <input
                          id="matrimonioFechaDeseada"
                          type="date"
                          name="matrimonioFechaDeseada"
                          value={formData.matrimonioFechaDeseada}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        />
                      </div>

                      <div className="col-sm-6" style={{ marginBottom: '16px' }}>
                        <label
                          htmlFor="matrimonioSacramentosCompletos"
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#333333',
                            marginBottom: '6px'
                          }}
                        >
                          ¿Cuentan con Bautizo y Confirmación?
                        </label>
                        <select
                          id="matrimonioSacramentosCompletos"
                          name="matrimonioSacramentosCompletos"
                          value={formData.matrimonioSacramentosCompletos}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1.5px solid #d0d7de',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: '#ffffff'
                          }}
                        >
                          <option value="si">Sí, ambos novios confirmados</option>
                          <option value="uno">Solo uno de los contrayentes</option>
                          <option value="en_tramite">En proceso de confirmación</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px dashed rgba(197, 160, 89, 0.4)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '12.5px',
                        color: '#666666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px'
                      }}
                    >
                      <i className="fa fa-heart-o" style={{ color: '#c5a059', fontSize: '15px' }} />
                      <span>
                        El pliego matrimonial requiere abrirse con al menos 2 meses de anticipación a la fecha fijada
                        para la ceremonia.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* SECCIÓN C: OBSERVACIONES / MENSAJE ADICIONAL */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="observaciones"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#333333',
                    marginBottom: '6px'
                  }}
                >
                  Mensaje u Observaciones Adicionales <span style={{ fontWeight: 400, color: '#888' }}>(Opcional)</span>
                </label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  rows="3"
                  value={formData.observaciones}
                  onChange={handleChange}
                  placeholder="Detalles adicionales, consultas sobre ofrendas, disponibilidad de fechas, etc."
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

              {/* Mensaje de Error si falta algún dato */}
              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #f87171',
                    color: '#b91c1c',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <i className="fa fa-exclamation-triangle" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Botón CTA Dorado con bordes redondeados (Estilo Contacto Parroquia) */}
              <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#c5a059',
                    backgroundImage: 'linear-gradient(135deg, #d4b068 0%, #c5a059 100%)',
                    color: '#ffffff',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    padding: '14px 44px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(197, 160, 89, 0.45)',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <i className="fa fa-paper-plane" />
                  <span>Registrar y Preparar Solicitud</span>
                </button>

                <p style={{ fontSize: '12.5px', color: '#888888', marginTop: '12px', marginBottom: 0 }}>
                  Al registrar, podrás enviar los datos directamente al WhatsApp o correo del despacho parroquial.
                </p>
              </div>
            </form>
          )}

          {/* Tarjeta Informativa Inferior (Horarios y Canales) */}
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#ffffff',
              border: '1px solid #eaeaea',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  color: '#c5a059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}
              >
                <i className="fa fa-clock-o" />
              </div>
              <div>
                <h4
                  style={{
                    margin: '0 0 4px 0',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1a1714'
                  }}
                >
                  Horario de Atención Presencial en Despacho
                </h4>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#666666' }}>
                  <strong>Lunes a Viernes:</strong> 9:00 am &ndash; 1:00 pm y 4:00 pm &ndash; 7:00 pm &bull;{' '}
                  <strong>Sábados:</strong> 9:00 am &ndash; 12:30 pm
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={`tel:${PARISH_PHONE_NUM}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#c5a059',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(197, 160, 89, 0.3)'
                }}
              >
                <i className="fa fa-phone" /> Llamar
              </a>
              <a
                href={`https://wa.me/${PARISH_PHONE_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(37,211,102,0.3)'
                }}
              >
                <i className="fab fa-whatsapp" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}