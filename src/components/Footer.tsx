export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span role="img" aria-label="leaf">🌿</span> EcoShop
        </div>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:contact@ecoshop.com">Contact</a>
        </div>
        <div className="footer-copy">
          <small>© {new Date().getFullYear()} EcoShop. Tous droits réservés.</small>
        </div>
      </div>
    </footer>
  );
}