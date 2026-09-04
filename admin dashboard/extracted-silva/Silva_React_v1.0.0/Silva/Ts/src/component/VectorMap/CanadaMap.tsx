import 'jsvectormap'
import 'jsvectormap/dist/maps/canada.js'
import { getCanadaVectorMaps } from '@/app/(admin)/maps/vector/data'
import BaseVectorMap from './BaseVectorMap'

interface CanadaVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const CanadaVectorMap = ({ width, height }: CanadaVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={getCanadaVectorMaps} type="canada" />
    </>
  )
}

export default CanadaVectorMap
