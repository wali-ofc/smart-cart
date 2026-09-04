import BaseVectorMap from './BaseVectorMap';
import { getWorldMapwithMarkers } from '@/app/(admin)/maps/vector/data';
const WorldMapwithMarkers = ({
  width,
  height
}) => {
  return <BaseVectorMap width={width} height={height} options={getWorldMapwithMarkers} type="world" />;
};
export default WorldMapwithMarkers;