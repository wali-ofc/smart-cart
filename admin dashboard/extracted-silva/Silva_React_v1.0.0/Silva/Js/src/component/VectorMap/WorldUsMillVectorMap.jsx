import { UsMillVectorMap } from '@/app/(admin)/maps/vector/data';
import 'jsvectormap';
import 'jsvectormap/dist/maps/us-mill-en.js';
import BaseVectorMap from './BaseVectorMap';
const WorldUsMillVectorMap = () => {
  return <>
            <BaseVectorMap options={UsMillVectorMap} type="us_mill_en" />
        </>;
};
export default WorldUsMillVectorMap;