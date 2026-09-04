import 'jsvectormap';
import 'jsvectormap/dist/maps/spain.js';
import BaseVectorMap from './BaseVectorMap';
import { SpainVectorMapOpts } from '@/app/(admin)/maps/vector/data';
const SpainVectorMap = ({
  width,
  height
}) => {
  return <>
      <BaseVectorMap width={width} height={height} options={SpainVectorMapOpts} type="spain" />
    </>;
};
export default SpainVectorMap;