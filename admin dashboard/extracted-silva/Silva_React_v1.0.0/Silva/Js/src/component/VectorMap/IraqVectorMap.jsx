import 'jsvectormap';
import 'jsvectormap/dist/maps/iraq.js';
import BaseVectorMap from './BaseVectorMap';
import { IraqVectorMapOpts } from '@/app/(admin)/maps/vector/data';
const IraqVectorMap = ({
  width,
  height
}) => {
  return <>
      <BaseVectorMap width={width} height={height} options={IraqVectorMapOpts} type="iraq" />
    </>;
};
export default IraqVectorMap;