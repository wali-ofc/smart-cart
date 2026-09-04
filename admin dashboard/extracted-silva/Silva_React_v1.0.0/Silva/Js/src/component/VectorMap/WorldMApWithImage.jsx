import BaseVectorMap from './BaseVectorMap';
import { getMapWithImage } from '@/app/(admin)/maps/vector/data';
const WorldMApWithImage = () => {
  return <BaseVectorMap options={getMapWithImage} type="world" />;
};
export default WorldMApWithImage;