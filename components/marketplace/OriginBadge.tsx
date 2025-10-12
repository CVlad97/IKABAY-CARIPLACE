export default function OriginBadge({origin}:{origin?: "Local"|"Import"}){
  const isLocal=origin==="Local";
  return(
    <span className={`inline-block text-xs px-2 py-0.5 rounded ${isLocal?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`}>
      {isLocal?"LOCAL":"IMPORT"}
    </span>
  );
}
