import 'jsvectormap'
import 'jsvectormap/dist/maps/russia.js'
import BaseVectorMap from './BaseVectorMap'
import { RussiaVectorMapOpts } from '@/app/(admin)/maps/vector/data'

interface RussiaVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const RussiaVectorMap = ({ width, height }: RussiaVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={RussiaVectorMapOpts} type="russia" />
    </>
  )
}

export default RussiaVectorMap
