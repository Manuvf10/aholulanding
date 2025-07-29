'use client';

import { useState, useEffect } from 'react';
import './landing.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Menú móvil

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Cerrar modales con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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
          <h1 className="logo" onClick={scrollToTop}>
            Aholú
          </h1>

          {/* Menú desktop */}
          <nav className="nav-links" aria-label="Navegación principal">
            <a href="#benefits">Beneficios</a>
            <a href="#how">Cómo funciona</a>
            <a href="#services">Servicios</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#about">Nosotros</a>
            <a href="#contact">Contacto</a>
          </nav>

          {/* Botón CTA */}
          <button
            className="cta-button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Sube tu factura y empieza a ahorrar"
          >
            Subir factura
          </button>

          {/* Menú hamburguesa (móvil) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <nav className="mobile-menu" role="navigation">
            <a href="#benefits" onClick={() => setMenuOpen(false)}>Beneficios</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonios</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Nosotros</a>
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
      <section className="hero" id="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h2>
              <span className="highlight">¿Pagas de más</span> en la luz?
            </h2>
            <p>
              En Aholú analizamos tu factura y <strong>reducimos tu gasto</strong> sin que tengas que hacer nada. 
              Sin coste. Sin trámites. Sin cambiar tus hábitos.
            </p>
            <button
              className="cta-button big"
              onClick={() => setIsModalOpen(true)}
            >
              Quiero ahorrar hasta un 20%
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="number">18%</span>
              <span className="label">de ahorro promedio</span>
            </div>
            <div className="stat">
              <span className="number">100+</span>
              <span className="label">clientes ayudados</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="benefits" className="section benefits">
        <h3>¿Por qué confían en Aholú?</h3>
        <div className="cards">
          <div className="card benefit-card">
            <div className="emoji-icon">📤</div>
            <h4>Sube tu factura</h4>
            <p>Solo necesitas el PDF. Nosotros lo analizamos en minutos.</p>
          </div>
          <div className="card benefit-card">
            <div className="emoji-icon">🔍</div>
            <h4>Analizamos tu consumo</h4>
            <p>Buscamos tarifas mejores, potencia ajustada y errores ocultos.</p>
          </div>
          <div className="card benefit-card">
            <div className="emoji-icon">💸</div>
            <h4>Ahorra desde el primer mes</h4>
            <p>Reducimos tu factura. Sin pagar por adelantado. Sin sorpresas.</p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="how" className="section steps-section">
        <h3>Así te ayudamos a ahorrar</h3>
        <div className="steps">
          <div className="step-block">
            <span className="step-number">1</span>
            <p>Sube tu factura</p>
          </div>
          <div className="step-block">
            <span className="step-number">2</span>
            <p>Recibe tu análisis personalizado</p>
          </div>
          <div className="step-block">
            <span className="step-number">3</span>
            <p>Firmas el cambio y empiezas a ahorrar</p>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services" className="section services-section">
        <h3>Lo que hacemos por ti</h3>
        <div className="cards">
          <div className="card service-card">
            <h4>Optimización de tarifa</h4>
            <p>Comparamos todas las compañías y elegimos la que más te ahorra.</p>
          </div>
          <div className="card service-card">
            <h4>Trámites incluidos</h4>
            <p>Nosotros gestionamos el cambio. Tú solo firmas el contrato.</p>
          </div>
          <div className="card service-card">
            <h4>Seguimiento continuo</h4>
            <p>Revisamos tus facturas cada mes para asegurarte el mejor precio.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonials" className="section testimonials-section">
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="testimonials">
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

      {/* NOSOTROS */}
      <section id="about" className="section about-section">
        <h3>¿Quiénes somos?</h3>
        <p>
          En <strong>Aholú</strong>, creemos que pagar de más en la luz no es normal. 
          Somos un equipo de expertos en energía que quiere que pagues solo lo justo. 
          Transparentes, sin comisiones ocultas y con resultados reales.
        </p>
      </section>

      {/* CONTACTO */}
      <section id="contact" className="section contact-section">
        <h3>¿Tienes dudas? Escríbenos</h3>
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
        <div className="container footer-content">
          <h1 className="logo" onClick={scrollToTop}>Aholú</h1>
          <p>© {new Date().getFullYear()} Aholú. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* BOTÓN WHATSAPP */}
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
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            {isSuccess ? (
              <div className="modal-success">
                <h3>¡Gracias!</h3>
                <p>Hemos recibido tu factura. Te contactaremos en menos de 24h.</p>
              </div>
            ) : (
              <>
                <h3 id="modal-title">Sube tu factura y empieza a ahorrar</h3>
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