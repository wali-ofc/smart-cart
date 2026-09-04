import 'jsvectormap'
import 'jsvectormap/dist/maps/world-merc'

//components
import BaseVectorMap from './BaseVectorMap'
import { getMarkersLine } from '@/app/(admin)/maps/vector/data'

interface WorldVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const WorldLineVectorMap = ({ width, height }: WorldVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={getMarkersLine} type="world" />
    </>
  )
}

export default WorldLineVectorMap
