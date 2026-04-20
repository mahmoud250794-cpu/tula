import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [config, setConfig] = useState({ siteName: "Tula Store", socialLinks: {} });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب الإعدادات والمنتجات من ملفات JSON
    Promise.all([
      fetch('/src/data/config.json').then(r => r.json()).catch(() => ({})),
      fetch('/src/data/products.json').then(r => r.json()).catch(() => [])
    ]).then(([configData, productsData]) => {
      setConfig(configData);
      setProducts(productsData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}>جاري تحميل Tula...</div>;

  return (
    <div className="app-container">
      {/* رأس الصفحة واللوجو */}
      <header className="header">
        <div>
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="logo" />
          ) : (
            <h1 style={{margin:0}}>{config.siteName}</h1>
          )}
        </div>
        
        {/* روابط التواصل */}
        {config.socialLinks && (
          <div className="social-links">
            {config.socialLinks.facebook && <a href={config.socialLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>}
            {config.socialLinks.instagram && <a href={config.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            {config.socialLinks.whatsapp && <a href={config.socialLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}
          </div>
        )}
      </header>

      {/* شبكة المنتجات */}
      <main className="products-grid">
        {products.length > 0 ? products.map((p, i) => (
          <article key={i} className="product-card">
            {p.image && <img src={p.image} alt={p.name} className="product-image" />}
            <div className="product-info">
              <h3 className="product-name">{p.name}</h3>
              <p className="product-desc">{p.description}</p>
              <div>
                <span className="product-price">{p.price} ريال</span>
                {p.video && <a href={p.video} target="_blank" rel="noreferrer" className="video-link">🎥 شاهد الفيديو</a>}
              </div>
            </div>
          </article>
        )) : <p>لا توجد منتجات حالياً.</p>}
      </main>
    </div>
  );
}

export default App;
