import 'jsvectormap';
import 'jsvectormap/dist/maps/russia.js';
import BaseVectorMap from './BaseVectorMap';
import { RussiaVectorMapOpts } from '@/app/(admin)/maps/vector/data';
const RussiaVectorMap = ({
  width,
  height
}) => {
  return <>
      <BaseVectorMap width={width} height={height} options={RussiaVectorMapOpts} type="russia" />
    </>;
};
export default RussiaVectorMap;