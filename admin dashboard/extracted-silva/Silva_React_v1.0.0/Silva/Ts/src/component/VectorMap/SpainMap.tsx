import 'jsvectormap'
import 'jsvectormap/dist/maps/spain.js'
import BaseVectorMap from './BaseVectorMap'
import { SpainVectorMapOpts } from '@/app/(admin)/maps/vector/data'


interface SpainVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const SpainVectorMap = ({ width, height }: SpainVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={SpainVectorMapOpts} type="spain" />
    </>
  )
}

export default SpainVectorMap
