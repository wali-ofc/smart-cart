import 'jsvectormap'
import 'jsvectormap/dist/maps/iraq.js'
import BaseVectorMap from './BaseVectorMap'
import { IraqVectorMapOpts } from '@/app/(admin)/maps/vector/data'


interface IraqVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const IraqVectorMap = ({ width, height }: IraqVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={IraqVectorMapOpts} type="iraq" />
    </>
  )
}

export default IraqVectorMap
