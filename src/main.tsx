import React from 'react';
import {createRoot} from 'react-dom/client';
import {SiteShell,PortfolioPage} from '../components/portfolio';
import {destinations} from '../lib/portfolio-content';
import './styles.css';
const section=window.location.pathname.replace(/^\/|\/$/g,'') || 'annie';
const valid=destinations.some(d=>d.slug===section);
// A refresh starts the project directory at its overview. New deep links still
// open their target, and subsequent in-page links retain normal anchor behavior.
if(section==='projects' && (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type==='reload'){
 history.scrollRestoration='manual';
 history.replaceState(history.state,'',location.pathname+location.search);
 window.scrollTo({top:0,left:0,behavior:'instant'});
}

createRoot(document.getElementById('root')!).render(<SiteShell>{valid?<PortfolioPage section={section}/>:<main className="page"><h1>Page not found</h1><a href="/annie/">Back to Annie</a></main>}</SiteShell>);
