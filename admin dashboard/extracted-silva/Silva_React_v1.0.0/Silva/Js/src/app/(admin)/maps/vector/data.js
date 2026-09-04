import images from "@/assets/images/logo-sm.png";
export const getMarkersLine = {
  map: "world_merc",
  zoomOnScroll: false,
  zoomButtons: false,
  markersSelectable: true,
  markers: [{
    name: "Greenland",
    coords: [72, -42]
  }, {
    name: "Canada",
    coords: [56.1304, -106.3468]
  }, {
    name: "Germany",
    coords: [51.1657, 10.4515]
  }, {
    name: "Japan",
    coords: [36.2048, 138.2529]
  }, {
    name: "United States",
    coords: [37.0902, -95.7129]
  }, {
    name: "Egypt",
    coords: [26.8206, 30.8025]
  }, {
    name: "Brazil",
    coords: [-14.2350, -51.9253]
  }, {
    name: "Australia",
    coords: [-25.2744, 133.7751]
  }, {
    name: "Malaysia",
    coords: [4.2105, 101.9758]
  }, {
    name: "China",
    coords: [35.8617, 104.1954]
  }, {
    name: "Norway",
    coords: [60.472024, 8.468946]
  }, {
    name: "Ukraine",
    coords: [48.379433, 31.16558]
  }],
  lines: [{
    from: "Greenland",
    to: "Egypt"
  }, {
    from: "Canada",
    to: "Egypt"
  }, {
    from: "Germany",
    to: "Egypt"
  }, {
    from: "Japan",
    to: "Egypt"
  }, {
    from: "United States",
    to: "Egypt"
  }, {
    from: "Brazil",
    to: "Egypt"
  }, {
    from: "Australia",
    to: "Egypt"
  }, {
    from: "Malaysia",
    to: "Egypt"
  }, {
    from: "China",
    to: "Egypt"
  }, {
    from: "Norway",
    to: "Egypt"
  }, {
    from: "Ukraine",
    to: "Egypt"
  }],
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  },
  markerStyle: {
    initial: {
      fill: "#343a40"
    }
  },
  labels: {
    markers: {
      render: marker => marker.name
    }
  },
  lineStyle: {
    animation: true,
    strokeDasharray: "6 3 6"
  }
};
export const getWorldMapwithMarkers = {
  map: 'world_merc',
  zoomOnScroll: false,
  zoomButtons: false,
  selectedMarkers: [0, 2],
  markersSelectable: true,
  markers: [{
    name: "Palestine",
    coords: [31.9474, 35.2272]
  }, {
    name: "Russia",
    coords: [61.524, 105.3188]
  }, {
    name: "Canada",
    coords: [56.1304, -106.3468]
  }, {
    name: "Greenland",
    coords: [71.7069, -42.6043]
  }],
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  },
  markerStyle: {
    initial: {
      fill: "#343a40"
    },
    selected: {
      fill: "red"
    }
  },
  labels: {
    markers: {
      render: marker => marker.name
    }
  }
};
export const getMapWithImage = {
  map: 'world_merc',
  zoomOnScroll: true,
  zoomButtons: true,
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  },
  selectedMarkers: [0, 2],
  markersSelectable: true,
  markers: [{
    name: "Palestine",
    coords: [31.9474, 35.2272]
  }, {
    name: "Russia",
    coords: [61.524, 105.3188]
  }, {
    name: "Canada",
    coords: [56.1304, -106.3468]
  }, {
    name: "Greenland",
    coords: [71.7069, -42.6043]
  }],
  markerStyle: {
    initial: {
      image: images
    }
  },
  labels: {
    markers: {
      render: marker => marker.name
    }
  }
};
export const getUsaVectorMap = {
  map: "us_merc_en",
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};
export const getCanadaVectorMaps = {
  map: 'canada',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};
export const RussiaVectorMapOpts = {
  map: 'russia',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};
export const SpainVectorMapOpts = {
  map: 'spain',
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};
export const IraqVectorMapOpts = {
  map: 'iraq',
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};
export const UsVectorMap = {
  map: 'us_lcc_en',
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};
export const UsMillVectorMap = {
  map: 'us_mill_en',
  regionStyle: {
    initial: {
      stroke: "#4a5a6b",
      fill: "#ced4da",
      strokeWidth: 0.25,
      fillOpacity: 1
    }
  }
};