import 'jsvectormap';
import 'jsvectormap/dist/maps/us-merc-en.js';
import BaseVectorMap from './BaseVectorMap';
import { getUsaVectorMap } from '@/app/(admin)/maps/vector/data';
const UsaVectorMap = () => {
  return <>
      <BaseVectorMap options={getUsaVectorMap} type="us_merc_en" />
    </>;
};
export default UsaVectorMap;