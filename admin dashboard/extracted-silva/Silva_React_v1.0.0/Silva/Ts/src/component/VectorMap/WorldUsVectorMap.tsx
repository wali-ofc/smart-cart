import 'jsvectormap'
import 'jsvectormap/dist/maps/us-lcc-en.js'


import BaseVectorMap from './BaseVectorMap'
import { UsVectorMap } from '@/app/(admin)/maps/vector/data'


interface WorldVectorMapProps {
    width?: string
    height?: string
    options?: any
}


const WorldUsVectorMap = ({ width, height }: WorldVectorMapProps) => {
    return (
        <BaseVectorMap width={width} height={height} options={UsVectorMap} type="world" />
    )
}

export default WorldUsVectorMap