import React, { useState } from 'react';

/**
 * Constantes de contacto institucional
 */
const PARISH_PHONE_DISPLAY = '+51 984 123 456';
const PARISH_PHONE_NUM = '51984123456';
const PARISH_TEL_LOCAL = '(083) 421-230';
const PARISH_EMAIL = 'sanpedro.andahuaylas@gmail.com';

/**
 * Guía informativa de los 5 trámites principales
 */
const TRAMITES_DATA = [
  {
    id: 'bautizo',
    titulo: 'Bautizo',
    subtitulo: 'Sacramento de iniciación a la vida cristiana',
    categoria: 'Sacramento de Iniciación',
    icon: 'fa-tint',
    color: '#0284c7',
    tiempoRecomendado: '15 a 20 días de anticipación',
    resumen: 'El Bautismo es el fundamento de toda la vida cristiana, el pórtico de la vida en el espíritu y la puerta que abre el acceso a los otros sacramentos.',
    requisitos: [
      {
        titulo: 'Edad del niño(a)',
        desc: 'Recomendado para recién nacidos y párvulos hasta los 6 años de edad. Niños mayores de 7 años deben incorporarse a la catequesis de iniciación cristiana.'
      },
      {
        titulo: 'Condición de los Padrinos',
        desc: 'Pueden ser uno o dos padrinos (padrino y madrina). Deben ser mayores de 16 años, estar bautizados, confirmados y llevar una vida conforme a la fe católica. Si son pareja, deben estar casados por la Iglesia Católica.'
      },
      {
        titulo: 'Charla Pre-bautismal Obligatoria',
        desc: 'Tanto los padres como los padrinos deben participar en la charla catequética preparatoria antes de la fecha fijada para el sacramento.'
      },
      {
        titulo: 'Tiempo de anticipación',
        desc: 'Registrar la solicitud presencialmente en el despacho con al menos 15 a 20 días de antelación para asegurar la fecha de celebración.'
      }
    ],
    checklist: [
      'Copia simple del DNI del niño(a) o Acta de Nacimiento oficial expedida por RENIEC.',
      'Copia de DNI vigente de ambos padres.',
      'Copia de DNI vigente de los padrinos.',
      'Constancia de Confirmación de los padrinos (o Constancia de Matrimonio Religioso si son cónyuges).',
      'Constancia de asistencia a la charla pre-bautismal (si se realizó en otra parroquia debidamente autorizada).'
    ],
    pasos: [
      {
        numero: '1',
        titulo: 'Reunir toda la documentación física requerida',
        desc: 'Verifica y organiza todos los requisitos y copias de DNI en un fólder o mica antes de acudir al despacho.'
      },
      {
        numero: '2',
        titulo: 'Acercarse al Despacho Parroquial en horario de atención',
        desc: 'Visita nuestra secretaría en la Plaza de Armas de Andahuaylas (Lun a Vie: 9:00 am - 1:00 pm y 4:00 pm - 7:00 pm | Sáb: 9:00 am - 12:30 pm).'
      },
      {
        numero: '3',
        titulo: 'Revisión de documentos, programación de fecha y charlas',
        desc: 'La secretaría parroquial validará los expedientes, registrará el bautizo en el libro y programará la fecha de la ceremonia y la catequesis preparatoria.'
      }
    ],
    whatsappMsg: 'Hola, Parroquia San Jeronimo Andahuaylas. Deseo consultar información sobre los requisitos y próximas fechas para el sacramento del Bautizo.'
  },
  {
    id: 'matrimonio',
    titulo: 'Matrimonio',
    subtitulo: 'Alianza y bendición conyugal para toda la vida',
    categoria: 'Sacramento de Servicio y Comunión',
    icon: 'fa-heart',
    color: '#e11d48',
    tiempoRecomendado: '2 a 3 meses de anticipación',
    resumen: 'Por el sacramento del Matrimonio, un hombre y una mujer fundan entre sí una comunidad de vida y amor consagrada ante Dios y la comunidad eclesial.',
    requisitos: [
      {
        titulo: 'Tiempo previo para apertura de expediente',
        desc: 'Iniciar el trámite con un mínimo indispensable de 2 a 3 meses de anticipación a la fecha deseada de la boda religiosa.'
      },
      {
        titulo: 'Jurisdicción Parroquial',
        desc: 'Al menos uno de los novios debe pertenecer por domicilio a la Parroquia San Jeronimo. En caso de pertenecer a otra jurisdicción, tramitar la licencia de traslado matrimonial en su parroquia de residencia.'
      },
      {
        titulo: 'Sacramentos Previos',
        desc: 'Ambos contrayentes deben haber recibido los sacramentos del Bautismo, Primera Comunión y Confirmación.'
      },
      {
        titulo: 'Cursillo Prematrimonial y Testigos',
        desc: 'Participación obligatoria de los contrayentes en el curso de preparación conyugal, y presentación de dos testigos con más de 3 años de conocer a la pareja (que no sean familiares directos).'
      }
    ],
    checklist: [
      'Partidas de Bautizo de ambos novios, actualizadas para matrimonio (expedidas con no más de 6 meses y legalizadas por su diócesis si provienen de otra provincia).',
      'Constancias o Certificados de Confirmación y Primera Comunión de ambos novios.',
      'Copias legibles de DNI vigente de ambos novios y de los dos testigos del pliego matrimonial.',
      '2 fotografías tamaño carné o pasaporte a color y recientes de cada uno de los contrayentes.',
      'Copia del Acta de Matrimonio Civil (o constancia de edicto / inscripción civil si se celebrará simultáneamente).',
      'Certificado de asistencia al Cursillo Prematrimonial Diocesano.'
    ],
    pasos: [
      {
        numero: '1',
        titulo: 'Reunir toda la documentación física requerida',
        desc: 'Solicitar con suficiente antelación las partidas actualizadas en las parroquias donde fueron bautizados y reunir las constancias sacramentales.'
      },
      {
        numero: '2',
        titulo: 'Acercarse al Despacho Parroquial en horario de atención',
        desc: 'Los contrayentes se presentan en el despacho parroquial para iniciar la apertura del pliego y expediente matrimonial religioso.'
      },
      {
        numero: '3',
        titulo: 'Revisión de documentos, programación de fecha y charlas preparatorias',
        desc: 'Se realiza la entrevista testimonial con los testigos, se procede a la publicación de las proclamas matrimoniales y se confirma la fecha litúrgica.'
      }
    ],
    whatsappMsg: 'Hola, Parroquia San Jeronimo Andahuaylas. Quisiera consultar sobre la apertura del expediente matrimonial y requisitos para contraer Matrimonio religioso.'
  },
  {
    id: 'confirmacion-comunion',
    titulo: 'Confirmación y Primera Comunión',
    subtitulo: 'Catequesis formativa y madurez en la fe',
    categoria: 'Iniciación Cristiana y Formación',
    icon: 'fa-book',
    color: '#d97706',
    tiempoRecomendado: 'Inscripciones en febrero / marzo',
    resumen: 'Itinerarios catequéticos para alimentar la vida espiritual de los niños y jóvenes, profundizando su amistad con Cristo y el compromiso misionero.',
    requisitos: [
      {
        titulo: 'Primera Comunión (Eucaristía)',
        desc: 'Niños a partir de los 8 a 9 años de edad (3er y 4to grado de educación primaria). Formación catequética regular durante el año litúrgico.'
      },
      {
        titulo: 'Confirmación (Dones del Espíritu Santo)',
        desc: 'Jóvenes a partir de los 14 años de edad en adelante, o adultos que deseen completar su iniciación cristiana.'
      },
      {
        titulo: 'Compromiso y Asistencia',
        desc: 'Asistencia semanal y puntual a las sesiones de catequesis los fines de semana y participación dominical en la Santa Eucaristía.'
      },
      {
        titulo: 'Padrino o Madrina de Confirmación',
        desc: 'Debe ser una persona católica confirmada, mayor de 16 años, que constituya un ejemplo vivo de testimonio cristiano para el confirmando.'
      }
    ],
    checklist: [
      'Partida de Bautizo original o copia certificada expedida por la parroquia donde fue bautizado.',
      'Copia legible del DNI del catequizando (niño o joven).',
      'Copia simple del DNI del padre, madre o apoderado legal.',
      'Ficha de inscripción pastoral (se completa de manera presencial en secretaría durante la convocatoria anual).',
      'Constancia de Confirmación del padrino/madrina (se presenta en la etapa previa a la celebración del sacramento).'
    ],
    pasos: [
      {
        numero: '1',
        titulo: 'Reunir toda la documentación física requerida',
        desc: 'Tener a mano la partida de bautizo y las identificaciones correspondientes para el periodo de apertura de inscripciones.'
      },
      {
        numero: '2',
        titulo: 'Acercarse al Despacho Parroquial en horario de atención',
        desc: 'Acudir al despacho parroquial durante las semanas de matrícula e inscripción de catequesis (habitualmente entre febrero y abril).'
      },
      {
        numero: '3',
        titulo: 'Revisión de documentos, programación de fecha y charlas preparatorias',
        desc: 'Formalización de la matrícula, asignación de aula/grupo, entrega del calendario de actividades y reunión inicial con los padres de familia.'
      }
    ],
    whatsappMsg: 'Hola, Parroquia San Jeronimo Andahuaylas. Quisiera consultar sobre el periodo de inscripciones, horarios y requisitos para la Catequesis de Primera Comunión y Confirmación.'
  },
  {
    id: 'intencion-misa',
    titulo: 'Intenciones de Misa',
    subtitulo: 'Ofrecimiento de la Eucaristía por salud, difuntos y gracias',
    categoria: 'Culto Litúrgico y Peticiones',
    icon: 'fa-bell-o',
    color: '#c5a059',
    tiempoRecomendado: '24 a 48 horas de anticipación',
    resumen: 'La Santa Misa es el sacrificio supremo de adoración y alabanza donde la comunidad une sus oraciones y súplicas más íntimas a los méritos de Cristo.',
    requisitos: [
      {
        titulo: 'Modalidades de Ofrecimiento',
        desc: '• Sufragio por el descanso eterno de fieles difuntos (honras fúnebres, cabo de año, aniversario luctuoso).\n• Por la salud y recuperación de los enfermos.\n• Acción de gracias (cumpleaños, bodas de plata/oro, proyectos familiares o comunitarios).'
      },
      {
        titulo: 'Horarios de Misas Disponibles',
        desc: '• Lunes a Sábados: Misa vespertina de 6:00 p.m.\n• Domingos: 8:00 a.m. | 10:00 a.m. | 12:00 m. | 6:00 p.m.'
      },
      {
        titulo: 'Anticipación recomendada',
        desc: 'Registrar la intención con al menos 24 a 48 horas de anticipación en el despacho. Los domingos también se pueden anotar en sacristía antes de cada celebración.'
      },
      {
        titulo: 'Estipendio Parroquial',
        desc: 'Colaboración o estipendio voluntario según las normas y costumbres de la Diócesis de Abancay para el sostenimiento del culto.'
      }
    ],
    checklist: [
      'Nombres y apellidos claros y completos de las personas por quienes se ofrece la misa.',
      'Motivo explícito del ofrecimiento: Salud, Difunto o Acción de Gracias.',
      'Fecha exacta y horario de celebración en el que desea que sea mencionada la intención litúrgica.',
      'Aportar el estipendio voluntario en secretaría o sacristía.'
    ],
    pasos: [
      {
        numero: '1',
        titulo: 'Reunir toda la documentación física requerida',
        desc: 'Anotar en un papel de manera clara los nombres completos de las personas y la fecha y hora seleccionada.'
      },
      {
        numero: '2',
        titulo: 'Acercarse al Despacho Parroquial en horario de atención',
        desc: 'Presentarse en secretaría parroquial (Lun a Sáb) o en la Sacristía del templo 15 a 20 minutos antes de la misa dominical.'
      },
      {
        numero: '3',
        titulo: 'Revisión de documentos, programación de fecha y registro oficial',
        desc: 'La secretaría registrará la intención en el libro litúrgico parroquial para ser proclamada durante la Santa Misa.'
      }
    ],
    whatsappMsg: 'Hola, Parroquia San Jeronimo Andahuaylas. Quisiera consultar sobre la disponibilidad y horarios para anotar una Intención de Misa.'
  },
  {
    id: 'partidas-constancias',
    titulo: 'Partidas y Constancias',
    subtitulo: 'Búsqueda en libros de archivo y certificados oficiales',
    categoria: 'Certificaciones Parroquiales',
    icon: 'fa-file-text-o',
    color: '#16a34a',
    tiempoRecomendado: 'Búsqueda en 24 a 48 horas',
    resumen: 'Expedición de copias certificadas de los libros parroquiales para fines sacramentales (matrimonio, confirmación) o constancias eclesiásticas.',
    requisitos: [
      {
        titulo: 'Jurisdicción del Sacramento',
        desc: 'El sacramento (Bautismo, Matrimonio o Confirmación) debe haberse celebrado en la Parroquia San Jeronimo de Andahuaylas o sus capillas dependientes.'
      },
      {
        titulo: 'Datos referenciales precisos',
        desc: 'Es fundamental conocer el año aproximado de la celebración, nombres completos de los padres y del titular para facilitar la búsqueda en los libros foliados.'
      },
      {
        titulo: 'Validez y Legalización',
        desc: 'Las partidas para expediente matrimonial tienen una vigencia canónica de 6 meses. Si se usará fuera de la Diócesis de Abancay, requiere visado de cancillería diocesana.'
      },
      {
        titulo: 'Tiempo de Entrega',
        desc: 'El tiempo habitual de búsqueda y emisión es de 24 a 48 horas hábiles dependiendo de la antigüedad del tomo en el archivo parroquial.'
      }
    ],
    checklist: [
      'Nombres y apellidos completos del titular tal como figuran en los documentos civiles o eclesiásticos.',
      'Año aproximado (o fecha exacta si se conserva) en que se administró el sacramento.',
      'Nombres y apellidos completos de los padres y, si es posible, de los padrinos.',
      'Copia simple del DNI del titular o familiar directo que realiza la solicitud.',
      'Comprobante o derecho de búsqueda y certificación de archivo parroquial.'
    ],
    pasos: [
      {
        numero: '1',
        titulo: 'Reunir toda la documentación física requerida',
        desc: 'Tener por escrito todos los datos del titular y el año aproximado del sacramento.'
      },
      {
        numero: '2',
        titulo: 'Acercarse al Despacho Parroquial en horario de atención',
        desc: 'Presentar la solicitud de búsqueda en la secretaría parroquial (Plaza de Armas de Andahuaylas).'
      },
      {
        numero: '3',
        titulo: 'Revisión de documentos, programación y entrega oficial',
        desc: 'El personal ubicará el tomo en el archivo histórico y expedirá la partida oficial sellada y firmada por el párroco.'
      }
    ],
    whatsappMsg: 'Hola, Parroquia San Jeronimo Andahuaylas. Quisiera consultar sobre la búsqueda y expedición de una Partida de Bautizo en el archivo parroquial.'
  }
];

export default function TramitesSection() {
  const [tramiteActivoId, setTramiteActivoId] = useState('bautizo');

  const tramiteActivo =
    TRAMITES_DATA.find((t) => t.id === tramiteActivoId) || TRAMITES_DATA[0];

  const getWhatsAppUrl = (msg) => {
    return `https://wa.me/${PARISH_PHONE_NUM}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div id="content" className="site-content" style={{ backgroundColor: '#fcfaf7' }}>
      {/* Cabecera Principal con Fondo Parroquial */}
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
                  backgroundColor: 'rgba(197, 160, 89, 0.22)',
                  border: '1px solid #c5a059',
                  color: '#f0ebe1',
                  padding: '7px 20px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.9px',
                  marginBottom: '16px'
                }}
              >
                <i className="fa fa-folder-open-o" style={{ color: '#c5a059' }} /> Guía de Trámites y Sacramentos
              </div>
              <h1
                className="entry-title"
                style={{
                  color: '#ffffff',
                  fontFamily: "'Roboto Slab', Georgia, serif",
                  fontSize: '42px',
                  fontWeight: 700,
                  textShadow: '0 3px 15px rgba(0,0,0,0.85)',
                  margin: '0 0 14px 0'
                }}
              >
                Trámites y Solicitudes Parroquiales
              </h1>
              <p
                style={{
                  color: '#f0ebe1',
                  fontSize: '17px',
                  maxWidth: '760px',
                  margin: '0 auto',
                  textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                  fontWeight: 400,
                  lineHeight: 1.55
                }}
              >
                Conoce los requisitos, documentos y pasos para realizar tus trámites presenciales en el Despacho Parroquial de San Jeronimo.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Selector de Trámites en Tarjetas / Pestañas */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e8ecf0', padding: '30px 0 25px 0' }}>
        <div className="container" style={{ maxWidth: '1120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#8e8576'
              }}
            >
              Selecciona el trámite o sacramento de tu interés:
            </span>
          </div>

          {/* Grid de Pestañas / Tarjetas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '12px'
            }}
          >
            {TRAMITES_DATA.map((t) => {
              const isSelected = t.id === tramiteActivoId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTramiteActivoId(t.id)}
                  style={{
                    backgroundColor: isSelected ? '#1a1714' : '#fcfaf7',
                    border: isSelected ? '2px solid #c5a059' : '1.5px solid #eae5db',
                    color: isSelected ? '#ffffff' : '#1a1714',
                    borderRadius: '14px',
                    padding: '16px 14px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.22s ease',
                    boxShadow: isSelected
                      ? '0 8px 24px rgba(197, 160, 89, 0.28)'
                      : '0 2px 6px rgba(0,0,0,0.03)',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.2)' : 'rgba(26, 23, 20, 0.05)',
                      color: isSelected ? '#c5a059' : '#555',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}
                  >
                    <i className={`fa ${t.icon}`} />
                  </span>
                  <span
                    style={{
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: 700,
                      fontSize: '14.5px',
                      lineHeight: 1.25,
                      color: isSelected ? '#ffffff' : '#1a1714'
                    }}
                  >
                    {t.titulo}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: isSelected ? '#c5a059' : '#888',
                      fontWeight: 500
                    }}
                  >
                    {t.tiempoRecomendado}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contenido Detallado del Trámite Seleccionado */}
      <section style={{ padding: '50px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          
          {/* Banner Resumen del Trámite Activo */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #eae5db',
              borderLeft: '6px solid #c5a059',
              borderRadius: '16px',
              padding: '28px 32px',
              marginBottom: '35px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    color: '#8f6f26',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    padding: '4px 12px',
                    borderRadius: '9999px'
                  }}
                >
                  {tramiteActivo.categoria}
                </span>
                <span style={{ fontSize: '12.5px', color: '#777' }}>
                  <i className="fa fa-clock-o" style={{ color: '#c5a059', marginRight: '5px' }} />
                  {tramiteActivo.tiempoRecomendado}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Roboto Slab', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1a1714',
                  margin: '0 0 10px 0'
                }}
              >
                Guía para: {tramiteActivo.titulo}
              </h2>
              <p style={{ fontSize: '14.5px', color: '#555555', margin: 0, lineHeight: 1.6 }}>
                {tramiteActivo.resumen}
              </p>
            </div>

            {/* Acceso Rápido a Horarios */}
            <div
              style={{
                backgroundColor: '#fbf9f5',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '12px',
                padding: '16px 20px',
                textAlign: 'left',
                minWidth: '220px'
              }}
            >
              <span
                style={{
                  fontSize: '11.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  color: '#c5a059',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                <i className="fa fa-building-o" style={{ marginRight: '6px' }} /> Despacho Parroquial
              </span>
              <p style={{ fontSize: '12.5px', color: '#444', margin: '0 0 4px 0', lineHeight: 1.4 }}>
                <strong>Lun a Vie:</strong> 9am-1pm | 4pm-7pm<br />
                <strong>Sábados:</strong> 9:00 am - 12:30 pm
              </p>
              <span style={{ fontSize: '11.5px', color: '#777' }}>
                Plaza de Armas de Andahuaylas
              </span>
            </div>
          </div>

          {/* Bloque 1: Requisitos Previos y Condiciones */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #eae5db',
              borderRadius: '16px',
              padding: '32px 30px',
              marginBottom: '30px',
              boxShadow: '0 6px 22px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  color: '#c5a059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0
                }}
              >
                <i className="fa fa-info-circle" />
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1a1714',
                    margin: '0 0 3px 0'
                  }}
                >
                  1. Requisitos Previos y Condiciones Canónicas
                </h3>
                <p style={{ fontSize: '13px', color: '#777', margin: 0 }}>
                  Condiciones necesarias antes de programar la celebración o solicitar el servicio
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px'
              }}
            >
              {tramiteActivo.requisitos.map((req, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#fbf9f5',
                    border: '1px solid #eee7db',
                    borderRadius: '12px',
                    padding: '18px 20px'
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Roboto Slab', serif",
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: '#1a1714',
                      margin: '0 0 8px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="fa fa-check-circle" style={{ color: '#c5a059', fontSize: '15px' }} />
                    {req.titulo}
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#555555',
                      margin: 0,
                      lineHeight: 1.55,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {req.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque 2: Documentos que debe llevar a la mano (Checklist) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #eae5db',
              borderRadius: '16px',
              padding: '32px 30px',
              marginBottom: '30px',
              boxShadow: '0 6px 22px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(22, 163, 74, 0.12)',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0
                }}
              >
                <i className="fa fa-list-ul" />
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1a1714',
                    margin: '0 0 3px 0'
                  }}
                >
                  2. Documentos que debe llevar a la mano (Checklist)
                </h3>
                <p style={{ fontSize: '13px', color: '#777', margin: 0 }}>
                  Asegúrate de tener copias legibles y vigentes de los siguientes documentos físicos
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tramiteActivo.checklist.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px 18px',
                    backgroundColor: '#faf8f5',
                    border: '1px solid #eee7db',
                    borderRadius: '10px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      flexShrink: 0,
                      marginTop: '2px',
                      boxShadow: '0 2px 6px rgba(22,163,74,0.3)'
                    }}
                  >
                    <i className="fa fa-check" />
                  </span>
                  <span style={{ fontSize: '14px', color: '#333333', lineHeight: 1.5, fontWeight: 500 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '18px',
                padding: '12px 16px',
                backgroundColor: 'rgba(197, 160, 89, 0.1)',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12.5px',
                color: '#6e541b'
              }}
            >
              <i className="fa fa-exclamation-triangle" style={{ fontSize: '14px', flexShrink: 0 }} />
              <span>
                <strong>Nota:</strong> Lleva siempre los documentos originales para cotejar y copias simples en tamaño A4 legibles y sin enmendaduras.
              </span>
            </div>
          </div>

          {/* Bloque 3: Paso a Paso para realizar el trámite presencial */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #eae5db',
              borderRadius: '16px',
              padding: '32px 30px',
              marginBottom: '35px',
              boxShadow: '0 6px 22px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(26, 23, 20, 0.08)',
                  color: '#1a1714',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0
                }}
              >
                <i className="fa fa-road" />
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1a1714',
                    margin: '0 0 3px 0'
                  }}
                >
                  3. Paso a Paso para realizar el trámite presencial
                </h3>
                <p style={{ fontSize: '13px', color: '#777', margin: 0 }}>
                  Secuencia clara para completar tu gestión directamente en el despacho parroquial
                </p>
              </div>
            </div>

            {/* Tarjetas de Pasos 1, 2 y 3 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {/* Paso 1 */}
              <div
                style={{
                  backgroundColor: '#fbf9f5',
                  border: '1.5px solid #eee7db',
                  borderRadius: '14px',
                  padding: '24px 22px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#c5a059',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: '0 3px 10px rgba(197, 160, 89, 0.35)'
                  }}
                >
                  1
                </div>
                <h4
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1a1714',
                    margin: '0 0 8px 0'
                  }}
                >
                  Paso 1: Reunir toda la documentación física
                </h4>
                <p style={{ fontSize: '13.5px', color: '#555555', lineHeight: 1.55, margin: 0 }}>
                  Revisa el checklist anterior y asegúrate de tener las partidas actualizadas y copias de DNI legibles en una mica o sobre manila.
                </p>
              </div>

              {/* Paso 2 */}
              <div
                style={{
                  backgroundColor: '#fbf9f5',
                  border: '1.5px solid #eee7db',
                  borderRadius: '14px',
                  padding: '24px 22px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#1a1714',
                    color: '#c5a059',
                    fontWeight: 800,
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  2
                </div>
                <h4
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1a1714',
                    margin: '0 0 8px 0'
                  }}
                >
                  Paso 2: Acercarse al Despacho Parroquial
                </h4>
                <p style={{ fontSize: '13.5px', color: '#555555', lineHeight: 1.55, margin: '0 0 8px 0' }}>
                  Acude presencialmente a la oficina parroquial en la Plaza de Armas de Andahuaylas dentro de los horarios de atención:
                </p>
                <div
                  style={{
                    fontSize: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5ded2',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#333'
                  }}
                >
                  <strong>Lun a Vie:</strong> 9:00 am - 1:00 pm | 4:00 pm - 7:00 pm<br />
                  <strong>Sábados:</strong> 9:00 am - 12:30 pm
                </div>
              </div>

              {/* Paso 3 */}
              <div
                style={{
                  backgroundColor: '#fbf9f5',
                  border: '1.5px solid #eee7db',
                  borderRadius: '14px',
                  padding: '24px 22px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#c5a059',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: '0 3px 10px rgba(197, 160, 89, 0.35)'
                  }}
                >
                  3
                </div>
                <h4
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1a1714',
                    margin: '0 0 8px 0'
                  }}
                >
                  Paso 3: Revisión, programación y charlas
                </h4>
                <p style={{ fontSize: '13.5px', color: '#555555', lineHeight: 1.55, margin: 0 }}>
                  En secretaría se revisarán los documentos, se coordinará la fecha de la celebración en el libro parroquial y se agendarán las charlas preparatorias.
                </p>
              </div>
            </div>
          </div>

          {/* Bloque 4: Botón de Consulta Opcional por WhatsApp */}
          <div
            style={{
              backgroundColor: '#1a1714',
              borderRadius: '16px',
              padding: '32px 30px',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              color: '#ffffff',
              boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c5a059', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, marginBottom: '6px' }}>
                <i className="fa fa-comments-o" /> Orientación Pastoral Directa
              </div>
              <h3
                style={{
                  fontFamily: "'Roboto Slab', serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 8px 0'
                }}
              >
                ¿Tienes dudas o alguna consulta sobre {tramiteActivo.titulo}?
              </h3>
              <p
                style={{
                  color: '#d6cfc4',
                  fontSize: '14px',
                  lineHeight: 1.55,
                  margin: 0
                }}
              >
                Si tienes alguna pregunta particular sobre requisitos especiales o disponibilidad de fechas, puedes escribir a nuestro número de secretaría parroquial sin necesidad de llenar ningún formulario previo.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {/* Botón WhatsApp */}
              <a
                href={getWhatsAppUrl(tramiteActivo.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '17px' }} />
                <span>Consultar por WhatsApp</span>
              </a>

              {/* Botón Llamar */}
              <a
                href={`tel:${PARISH_PHONE_NUM}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  color: '#f0ebe1',
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className="fa fa-phone" style={{ color: '#c5a059' }} />
                <span>{PARISH_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Tarjeta de Ubicación y Horarios de Despacho al Pie */}
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#ffffff',
              border: '1px solid #e8ecf0',
              borderRadius: '14px',
              padding: '24px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  color: '#c5a059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0
                }}
              >
                <i className="fa fa-map-marker" />
              </span>
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '15px', fontWeight: 700, color: '#1a1714' }}>
                  Despacho Parroquial &bull; Parroquia San Jeronimo Andahuaylas
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                  Plaza de Armas de Andahuaylas, Apurímac (Frente a la glorieta central) &bull; Tel: {PARISH_TEL_LOCAL}
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Parroquia+San+Pedro+Andahuaylas"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#c5a059',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <span>Ver en Google Maps</span>
              <i className="fa fa-external-link" style={{ fontSize: '11px' }} />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
