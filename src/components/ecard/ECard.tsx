import { useEffect, useState } from "react";
import { Check, ChevronDown, Copy, Download, ExternalLink, Moon, QrCode, Share2, Sun, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { actionIcons, ecardConfig, whatsappUrl } from "@/data/ecard-config";

type Theme = "light" | "dark";

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="icon-button" aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
}

function ActionTile({
  label,
  icon: Icon,
  href,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span className="action-icon"><Icon size={22} strokeWidth={1.8} /></span>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a className="action-tile" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {content}
      </a>
    );
  }
  return <button type="button" className="action-tile" onClick={onClick}>{content}</button>;
}

export function ECard() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [copied, setCopied] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("graficolor-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(saved === "light" || saved === "dark" ? saved : preferred);
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
    window.localStorage.setItem("graficolor-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!showQRModal) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowQRModal(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showQRModal]);

  function saveContact() {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${ecardConfig.businessName}`,
      `N:${ecardConfig.businessName};;;;`,
      `ORG:${ecardConfig.legalName}`,
      `TITLE:${ecardConfig.activity}`,
      `TEL;TYPE=CELL:${ecardConfig.phoneHref}`,
      ...ecardConfig.emails.map((e, i) =>
        i === 0 ? `EMAIL;TYPE=PREF,INTERNET:${e}` : `EMAIL;TYPE=INTERNET:${e}`
      ),
      `ADR;TYPE=WORK:;;${ecardConfig.address}`,
      `URL:${ecardConfig.website}`,
      "END:VCARD",
    ].join("\r\n");
    const contactUrl = URL.createObjectURL(new Blob([vcard], { type: "text/vcard;charset=utf-8" }));
    const downloadLink = document.createElement("a");
    downloadLink.href = contactUrl;
    downloadLink.download = ecardConfig.vcfFilename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(contactUrl), 100);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl || window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  async function shareNative() {
    const shareData = {
      title: `${ecardConfig.businessName} · ${ecardConfig.activity}`,
      text: ecardConfig.tagline,
      url: currentUrl || window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    } else {
      await copyLink();
    }
  }

  const actions = [
    { label: "WhatsApp", icon: actionIcons.whatsapp, href: whatsappUrl(ecardConfig.heroWhatsappMessage) },
    { label: "Llamar", icon: actionIcons.call, href: `tel:${ecardConfig.phoneHref}` },
    { label: "Correo", icon: actionIcons.email, href: `mailto:${ecardConfig.email}` },
    { label: "Sitio web", icon: actionIcons.website, href: ecardConfig.website },
    { label: "Instagram", icon: actionIcons.instagram, href: ecardConfig.instagram },
    { label: "Ubicación", icon: actionIcons.location, href: ecardConfig.mapUrl },
    { label: "Portafolio", icon: actionIcons.portfolio, href: ecardConfig.portfolioUrl },
    { label: "Cotizar", icon: actionIcons.quote, href: whatsappUrl(ecardConfig.quoteMessage) },
  ];

  const headlineLines = ecardConfig.portfolioBand.headline.split("\n");

  return (
    <main className="ecard-page">
      <article className="ecard-shell" aria-label={`E-Card de ${ecardConfig.businessName}`}>
        <header className="ecard-hero reveal">
          <div className="hero-grid" aria-hidden="true" />
          <div className="registration-marks" aria-hidden="true"><i /><i /><i /></div>
          <div className="topbar">
            <span className="edition">{ecardConfig.editionLabel}</span>
            <div className="flex items-center gap-2">
              <IconButton label="Ver código QR" onClick={() => setShowQRModal(true)}>
                <QrCode size={19} />
              </IconButton>
              <IconButton label={`Activar modo ${theme === "dark" ? "claro" : "oscuro"}`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
              </IconButton>
            </div>
          </div>
          <div className="brand-lockup">
            <div className="logo-frame">
              <img src={ecardConfig.assets.logoLight} alt={`Logo de ${ecardConfig.businessName}`} />
            </div>
            <p className="activity">{ecardConfig.activity}</p>
            <h1>{ecardConfig.businessName}</h1>
            <p className="tagline">{ecardConfig.tagline}</p>
            <p className="hero-description">{ecardConfig.description}</p>
          </div>
        </header>

        <div className="ecard-content">
          <a className="primary-cta reveal delay-1" href={whatsappUrl(ecardConfig.heroWhatsappMessage)} target="_blank" rel="noreferrer">
            <actionIcons.whatsapp size={22} />
            <span>{ecardConfig.heroCTALabel}</span>
            <ExternalLink size={17} />
          </a>

          <section className="section reveal delay-2" aria-labelledby="acciones-title">
            <div className="section-heading"><span>01</span><h2 id="acciones-title">{ecardConfig.sectionTitles.actions}</h2></div>
            <div className="actions-grid">
              {actions.map((action) => <ActionTile key={action.label} {...action} />)}
              <ActionTile label="Compartir / QR" icon={QrCode} onClick={() => setShowQRModal(true)} />
              <ActionTile label="Guardar contacto" icon={Download} onClick={saveContact} />
            </div>
          </section>

          <section className="section reveal delay-3" id="servicios" aria-labelledby="servicios-title">
            <div className="section-heading"><span>02</span><h2 id="servicios-title">{ecardConfig.sectionTitles.services}</h2></div>
            <div className="services-list">
              {ecardConfig.services.map((service, index) => {
                const Icon = service.icon;
                const expanded = openService === service.id;
                return (
                  <div className={`service-item${expanded ? " is-open" : ""}`} key={service.id}>
                    <button
                      type="button"
                      className="service-trigger"
                      aria-expanded={expanded}
                      aria-controls={`service-${service.id}`}
                      onClick={() => setOpenService(expanded ? null : service.id)}
                    >
                      <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                      <Icon size={23} />
                      <strong>{service.name}</strong>
                      <ChevronDown className="service-chevron" size={20} aria-hidden="true" />
                    </button>
                    <div className="service-panel" id={`service-${service.id}`} aria-hidden={!expanded}>
                      <div>
                        <p>{service.description}</p>
                        {service.href ? <a href={service.href}>Más información <ExternalLink size={14} /></a> : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="portfolio-band reveal" aria-labelledby="portafolio-title">
            <div>
              <span className="eyebrow">{ecardConfig.portfolioBand.eyebrow}</span>
              <h2 id="portafolio-title">
                {headlineLines.map((line, i) => (
                  <span key={i}>{line}{i < headlineLines.length - 1 && <br />}</span>
                ))}
              </h2>
            </div>
            <a href={ecardConfig.portfolioUrl} target="_blank" rel="noreferrer">{ecardConfig.portfolioBand.ctaLabel} <ExternalLink size={17} /></a>
            <img className="portfolio-logo" src={ecardConfig.assets.logoDark} alt="" aria-hidden="true" />
          </section>

          <section className="section contact-section reveal" aria-labelledby="contacto-title">
            <div className="section-heading"><span>03</span><h2 id="contacto-title">{ecardConfig.sectionTitles.contact}</h2></div>
            <address>
              <strong>{ecardConfig.legalName}</strong>
              <span>{ecardConfig.locationLabel}</span>
              <a href={`tel:${ecardConfig.phoneHref}`}>{ecardConfig.phone}</a>
              <a href={`mailto:${ecardConfig.email}`}>{ecardConfig.email}</a>
              <a href={ecardConfig.website} target="_blank" rel="noreferrer">{ecardConfig.websiteLabel}</a>
            </address>
          </section>
        </div>

        <footer>
          <img src={ecardConfig.assets.logoLight} alt={`Logo de ${ecardConfig.businessName}`} />
        </footer>
      </article>

      {/* Modal QR / Compartir */}
      {showQRModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="qr-modal-title" onClick={() => setShowQRModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Cerrar modal" onClick={() => setShowQRModal(false)}>
              <X size={18} />
            </button>
            <h3 id="qr-modal-title" className="modal-title">Comparte Graficolor</h3>
            <p className="modal-subtitle">Escanea el código QR desde cualquier teléfono o comparte el enlace:</p>
            
            <div className="qr-box">
              <QRCodeSVG
                value={currentUrl || "https://graficolorsm.github.io/Graficolor-ECARD/"}
                size={180}
                level="M"
                marginSize={1}
                fgColor="#111014"
                bgColor="#ffffff"
              />
            </div>

            <div className="copy-bar">
              <input type="text" readOnly value={currentUrl || window.location.href} className="copy-input" />
              <button type="button" className="copy-btn" onClick={copyLink}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>

            {"share" in navigator && (
              <button type="button" className="primary-cta mt-3 text-xs w-full min-h-[3rem] justify-center" onClick={shareNative}>
                <Share2 size={16} />
                <span>Compartir con otras apps</span>
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}