import type { ComponentProps } from 'react';
export function usePathname(){return window.location.pathname.replace(/\/$/,'') || '/annie'}
type Props=ComponentProps<'a'> & {scroll?:boolean;onNavigate?:(event:{preventDefault:()=>void})=>void};
export function StaticLink({scroll,onNavigate,...props}:Props){return <a {...props}/>}
