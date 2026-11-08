import React from 'react';
import {createRoot} from 'react-dom/client';
import {SiteShell,PortfolioPage} from '../components/portfolio';
import {destinations} from '../lib/portfolio-content';
import './styles.css';
const section=window.location.pathname.replace(/^\/|\/$/g,'') || 'annie';
const valid=destinations.some(d=>d.slug===section);
createRoot(document.getElementById('root')!).render(<SiteShell>{valid?<PortfolioPage section={section}/>:<main className="page"><h1>Page not found</h1><a href="/annie/">Back to Annie</a></main>}</SiteShell>);
