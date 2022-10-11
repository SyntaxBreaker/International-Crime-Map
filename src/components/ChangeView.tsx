import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

export function ChangeView({center, zoom} : {center: LatLngExpression | null; zoom: number}) {
    const map = useMap();

    if(center !== null) {
        map.setView(center, zoom);
    } else {
        map.setView([48.864716, 2.349], 2);
    }
    
    return null;
}