import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {mkdirSync,copyFileSync,writeFileSync} from 'node:fs';
export default defineConfig({plugins:[react(),{name:'static-route-pages',closeBundle(){for(const route of ['annie','projects','research','social-responsibility','internships']){mkdirSync('dist/'+route,{recursive:true});copyFileSync('dist/index.html','dist/'+route+'/index.html')}copyFileSync('dist/index.html','dist/404.html');writeFileSync('dist/.nojekyll','')}}],resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}}});
