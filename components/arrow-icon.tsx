export default function ArrowIcon({direction='up-right'}:{direction?:string}){
 const rotation:Record<string,number>={'right':0,'down-right':45,'down':90,'left':180,'up':270,'up-right':315};
 return <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16m-7-7 7 7-7 7" transform={`rotate(${rotation[direction]??0} 12 12)`}/></svg>
}
