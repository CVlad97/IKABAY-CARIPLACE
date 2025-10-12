"use client";
import React,{useState} from "react";
type Props={ basePrice:number; onMode?:(m:string)=>void };
const modes=[
  {key:"express_relais",label:"Express Relais",coef:1.00},
  {key:"express_domicile",label:"Express Domicile",coef:1.05},
  {key:"maritime_relais",label:"Maritime Relais",coef:0.92},
  {key:"maritime_domicile",label:"Maritime Domicile",coef:0.97},
];
export default function PriceDomModes({basePrice,onMode}:Props){
  const [m,setM]=useState(modes[0].key);
  const cur=modes.find(x=>x.key===m)!;
  const price=(basePrice*cur.coef).toFixed(2);
  return(<div className="space-y-2">
    <div className="flex gap-2 flex-wrap">
      {modes.map(x=>(
        <button key={x.key}
          onClick={()=>{setM(x.key);onMode?.(x.key);}}
          className={`px-3 py-1 rounded border ${m===x.key?"bg-emerald-600 text-white":"bg-white"}`}>
          {x.label}
        </button>
      ))}
    </div>
    <div className="text-sm text-gray-700">Prix <b>Rendu Martinique</b> : <b>{price} €</b></div>
  </div>);
}
