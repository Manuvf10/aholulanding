'use client';

import { useState, useEffect } from 'react';
import './landing.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e: { key: string; }) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 2500);
  };

  return (
    <div className="aholu-landing">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container navbar-content">
          <h1 className="logo" onClick={scrollToTop}>Aholú</h1>

          <nav className="nav-links">
            <a href="#how">Cómo funciona</a>
            <a href="#services">Servicios</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#contact">Contacto</a>
          </nav>

          <button
            className="cta-button"
            onClick={() => setIsModalOpen(true)}
          >
            Subir factura
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-menu">
            <a href="#how" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonios</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>
            <button
              className="cta-button mobile-cta"
              onClick={() => {
                setIsModalOpen(true);
                setMenuOpen(false);
              }}
            >
              Subir factura
            </button>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h2>
              <span className="highlight">Tu luz</span> puede costar menos.
            </h2>
            <p>
              Sube tu factura y nosotros encontramos la mejor tarifa para ti. 
              <strong> Sin trámites, sin llamadas, sin pagar por adelantado.</strong>
            </p>
            <button
              className="cta-button big"
              onClick={() => setIsModalOpen(true)}
            >
              Quiero ahorrar ya ⚡
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="number">18%</span>
              <span className="label">ahorro promedio</span>
            </div>
            <div className="stat">
              <span className="number">50+</span>
              <span className="label">clientes ayudados</span>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="how" className="section steps">
        <h3>Así te ayudamos a ahorrar</h3>
        <div className="steps-grid">
          <div className="step">
            <div className="step-icon">📤</div>
            <h4>Sube tu factura</h4>
            <p>PDF, foto o captura. Solo necesitamos tus datos de consumo.</p>
          </div>
          <div className="step">
            <div className="step-icon">🔍</div>
            <h4>Analizamos tu caso</h4>
            <p>Comparamos tarifas, potencia y errores ocultos.</p>
          </div>
          <div className="step">
            <div className="step-icon">💸</div>
            <h4>Ahorras desde el mes que viene</h4>
            <p>Nosotros gestionamos el cambio. Tú solo firmas.</p>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services" className="section services">
        <h3>Lo que hacemos por ti</h3>
        <div className="cards">
          <div className="card">
            <h4>Optimización de tarifa</h4>
            <p>Buscamos la compañía y plan que más te ahorran, según tu consumo real.</p>
          </div>
          <div className="card">
            <h4>Trámites incluidos</h4>
            <p>Nosotros cambiamos tu compañía. Tú no haces ninguna llamada.</p>
          </div>
          <div className="card">
            <h4>Seguimiento mensual</h4>
            <p>Revisamos cada factura para asegurarte que sigues pagando lo justo.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonials" className="section testimonials">
        <h3>Clientes que ya ahorran</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>Bajaron mi factura un 22% sin que hiciera nada. Increíble.</p>
            <span className="author">— Marta R., Madrid</span>
          </div>
          <div className="testimonial">
            <p>Al final del año ahorré más de 300€. Muy recomendable.</p>
            <span className="author">— Carlos M., Barcelona</span>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" className="section contact">
        <h3>¿Tienes dudas?</h3>
        <p>Escíbenos y te responderemos en menos de 24h.</p>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Gracias por tu mensaje. Te responderemos pronto.');
          }}
        >
          <input name="email" type="email" placeholder="Tu correo electrónico" required />
          <textarea name="message" placeholder="Tu mensaje" rows={4} required></textarea>
          <button type="submit">Enviar mensaje</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <h1 className="logo" onClick={scrollToTop}>Aholú</h1>
          <p>© {new Date().getFullYear()} Aholú. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/34600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Chatea con nosotros por WhatsApp"
      >
        💬
      </a>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>✕</button>

            {isSuccess ? (
              <div className="modal-success">
                <h3>¡Gracias!</h3>
                <p>Hemos recibido tu factura. Te contactaremos en menos de 24h.</p>
              </div>
            ) : (
              <>
                <h3>Sube tu factura y empieza a ahorrar</h3>
                <form className="form" onSubmit={handleSubmit}>
                  <input name="name" placeholder="Tu nombre" required />
                  <input name="email" type="email" placeholder="Correo electrónico" required />
                  <input name="phone" placeholder="Teléfono" required />
                  <input type="file" name="file" accept=".pdf" required />
                  <button type="submit">Enviar factura</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}