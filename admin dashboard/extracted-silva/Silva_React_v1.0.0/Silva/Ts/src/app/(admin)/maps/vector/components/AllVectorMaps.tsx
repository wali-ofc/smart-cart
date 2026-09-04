import CommonCard from "@/component/CommonCard"
import { CanadaVectorMap, IraqVectorMap, RussiaVectorMap, SpainVectorMap, UsaVectorMap } from "@/component/VectorMap"
import WorldLineVectorMap from "@/component/VectorMap/WorldLineVectorMap"
import WorldMApWithImage from "@/component/VectorMap/WorldMApWithImage"
import WorldMapwithMarkers from "@/component/VectorMap/WorldMapwithMarkers"
import WorldUsMillVectorMap from "@/component/VectorMap/WorldUsMillVectorMap"
import WorldUsVectorMap from "@/component/VectorMap/WorldUsVectorMap"
import { Col, Row } from "react-bootstrap"


const MarkersLine = () => {
  return (
    <CommonCard title="Markers" >
      <div style={{ height: "420px" }}>
        <WorldLineVectorMap />
      </div>
    </CommonCard>
  )
}

const MapwithMarkers = () => {
  return (
    <CommonCard title="World Vector Map with Markers" >
      <div style={{ height: "420px" }}>
        <WorldMapwithMarkers  />
      </div>
    </CommonCard>
  )
}

const MapWithImage = () => {
  return (
    <CommonCard title="World Vector Map with Image Markers" >
      <div style={{ height: "420px" }}>
        <WorldMApWithImage />
      </div>
    </CommonCard>
  )
}

const USVectorMaps = () => {
  return (
    <CommonCard title="USA (Merc En) Vector Map">
      <div style={{ height: "420px" }}>
        <UsaVectorMap />
      </div>
    </CommonCard>
  )
}


const CanadaVectorMaps = () => {
  return (
    <CommonCard title="Canada Vector Map">
      <div style={{ height: "420px" }}>
        <CanadaVectorMap />
      </div>
    </CommonCard>
  )
}


const RussiaVectorMaps = () => {
  return (
    <CommonCard title="Russia Vector Map">
      <div style={{ height: "420px" }}>
        <RussiaVectorMap />
      </div>

    </CommonCard>
  )
}

const SpainVectorMaps = () => {
  return (
    <CommonCard title="Spain Vector Map">
      <div style={{ height: "420px" }}>
        <SpainVectorMap />
      </div>

    </CommonCard>
  )
}


const IraqVectorMaps = () => {
  return (
    <CommonCard title="Iraq Vector Map">
      <div style={{ height: "420px" }}>
        <IraqVectorMap />
      </div>

    </CommonCard>
  )
}

const UsVectorMap = () => {
  return (
    <CommonCard title="US (Lcc-En) Vector Map">
      <div style={{ height: "420px" }}>
        <WorldUsVectorMap />
      </div>

    </CommonCard>
  )
}

const UsMillVectorMap = () => {
  return (
    <CommonCard title="US (Mill En)) Vector Map">
      <div style={{ height: "420px" }}>
        <WorldUsMillVectorMap />
      </div>

    </CommonCard>
  )
}


const AllVectorMaps = () => {
  return (
    <>
      <Row>
        <Col lg={6}>
          <MarkersLine />
        </Col>
        <Col lg={6}>
          <MapwithMarkers />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <MapWithImage />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <USVectorMaps />
        </Col>
        <Col lg={6}>
          <CanadaVectorMaps />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <RussiaVectorMaps />
        </Col>
        <Col lg={6}>
          <SpainVectorMaps />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <IraqVectorMaps />
        </Col>
        <Col lg={6}>
          <UsVectorMap />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <UsMillVectorMap />
        </Col>
      </Row>
    </>
  )
}

export default AllVectorMaps