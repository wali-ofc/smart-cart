import BaseVectorMap from './BaseVectorMap'
import { getWorldMapwithMarkers } from '@/app/(admin)/maps/vector/data'


interface WorldVectorMapProps {
    width?: string
    height?: string
    options?: any
}

const WorldMapwithMarkers = ({ width, height }: WorldVectorMapProps) => {
    return (
        <BaseVectorMap width={width} height={height} options={getWorldMapwithMarkers} type="world" />

    )
}

export default WorldMapwithMarkers