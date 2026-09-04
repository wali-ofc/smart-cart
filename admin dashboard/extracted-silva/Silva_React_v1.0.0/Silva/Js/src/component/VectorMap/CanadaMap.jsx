import 'jsvectormap';
import 'jsvectormap/dist/maps/canada.js';
import { getCanadaVectorMaps } from '@/app/(admin)/maps/vector/data';
import BaseVectorMap from './BaseVectorMap';
const CanadaVectorMap = ({
  width,
  height
}) => {
  return <>
      <BaseVectorMap width={width} height={height} options={getCanadaVectorMaps} type="canada" />
    </>;
};
export default CanadaVectorMap;