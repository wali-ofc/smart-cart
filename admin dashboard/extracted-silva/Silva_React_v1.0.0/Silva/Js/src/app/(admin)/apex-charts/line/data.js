export const getBasicLineChart = () => ({
  series: [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 140]
  }],
  chart: {
    height: 380,
    type: 'line',
    parentHeightOffset: 0,
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  markers: {
    size: 4
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  colors: ["#287F71"],
  title: {
    text: 'Product Trends by Month',
    align: 'left',
    style: {
      fontWeight: 600
    }
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      }
    }
  }]
});
export const getDataLabelChart = () => ({
  series: [{
    name: "High - 2022",
    data: [28, 29, 33, 36, 32, 32, 33]
  }, {
    name: "Low - 2022",
    data: [12, 11, 14, 17, 19, 13, 13]
  }],
  chart: {
    height: 380,
    type: 'line',
    parentHeightOffset: 0,
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#287F71', '#001b2f'],
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Average High & Low Temperature',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  markers: {
    // style: "inverted",
    size: 6
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    title: {
      text: 'Month'
    }
  },
  yaxis: {
    title: {
      text: 'Temperature'
    },
    min: 5,
    max: 40
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      }
    }
  }]
});
export const getZoomableTimeseriesChart = () => ({
  series: [{
    name: 'XYZ MOTORS',
    data: [{
      x: new Date("2018-01-01").getTime(),
      y: 140
    }, {
      x: new Date("2018-01-02").getTime(),
      y: 147
    }, {
      x: new Date("2018-01-03").getTime(),
      y: 150
    }, {
      x: new Date("2018-01-04").getTime(),
      y: 154
    }, {
      x: new Date("2018-01-05").getTime(),
      y: 160
    }, {
      x: new Date("2018-01-06").getTime(),
      y: 165
    }, {
      x: new Date("2018-01-07").getTime(),
      y: 162
    }, {
      x: new Date("2018-01-08").getTime(),
      y: 159
    }, {
      x: new Date("2018-01-09").getTime(),
      y: 164
    }, {
      x: new Date("2018-01-10").getTime(),
      y: 160
    }, {
      x: new Date("2018-01-11").getTime(),
      y: 167
    }, {
      x: new Date("2018-01-12").getTime(),
      y: 169
    }, {
      x: new Date("2018-01-13").getTime(),
      y: 172
    }, {
      x: new Date("2018-01-14").getTime(),
      y: 175
    }, {
      x: new Date("2018-01-15").getTime(),
      y: 178
    }, {
      x: new Date("2018-01-16").getTime(),
      y: 173
    }, {
      x: new Date("2018-01-17").getTime(),
      y: 167
    }, {
      x: new Date("2018-01-18").getTime(),
      y: 167
    }, {
      x: new Date("2018-01-19").getTime(),
      y: 163
    }, {
      x: new Date("2018-01-20").getTime(),
      y: 159
    }, {
      x: new Date("2018-01-21").getTime(),
      y: 161
    }, {
      x: new Date("2018-01-22").getTime(),
      y: 158
    }, {
      x: new Date("2018-01-23").getTime(),
      y: 152
    }, {
      x: new Date("2018-01-24").getTime(),
      y: 147
    }, {
      x: new Date("2018-01-25").getTime(),
      y: 151
    }, {
      x: new Date("2018-01-26").getTime(),
      y: 151
    }, {
      x: new Date("2018-01-27").getTime(),
      y: 151
    }, {
      x: new Date("2018-01-28").getTime(),
      y: 151
    }, {
      x: new Date("2018-01-29").getTime(),
      y: 155
    }, {
      x: new Date("2018-01-30").getTime(),
      y: 159
    }, {
      x: new Date("2018-01-31").getTime(),
      y: 162
    }, {
      x: new Date("2018-02-01").getTime(),
      y: 157
    }, {
      x: new Date("2018-02-01").getTime(),
      y: 157
    }, {
      x: new Date("2018-02-02").getTime(),
      y: 161
    }, {
      x: new Date("2018-02-03").getTime(),
      y: 166
    }, {
      x: new Date("2018-02-04").getTime(),
      y: 169
    }, {
      x: new Date("2018-02-05").getTime(),
      y: 172
    }, {
      x: new Date("2018-02-06").getTime(),
      y: 177
    }, {
      x: new Date("2018-02-07").getTime(),
      y: 181
    }, {
      x: new Date("2018-02-08").getTime(),
      y: 178
    }, {
      x: new Date("2018-02-09").getTime(),
      y: 173
    }, {
      x: new Date("2018-02-10").getTime(),
      y: 169
    }, {
      x: new Date("2018-02-11").getTime(),
      y: 159
    }, {
      x: new Date("2018-02-12").getTime(),
      y: 164
    }, {
      x: new Date("2018-02-13").getTime(),
      y: 167
    }, {
      x: new Date("2018-02-14").getTime(),
      y: 168
    }, {
      x: new Date("2018-02-15").getTime(),
      y: 172
    }, {
      x: new Date("2018-02-16").getTime(),
      y: 169
    }, {
      x: new Date("2018-02-17").getTime(),
      y: 175
    }, {
      x: new Date("2018-02-18").getTime(),
      y: 177
    }, {
      x: new Date("2018-02-19").getTime(),
      y: 179
    }, {
      x: new Date("2018-02-20").getTime(),
      y: 181
    }, {
      x: new Date("2018-02-21").getTime(),
      y: 183
    }, {
      x: new Date("2018-02-22").getTime(),
      y: 185
    }, {
      x: new Date("2018-02-23").getTime(),
      y: 188
    }, {
      x: new Date("2018-02-24").getTime(),
      y: 191
    }, {
      x: new Date("2018-02-25").getTime(),
      y: 187
    }, {
      x: new Date("2018-02-26").getTime(),
      y: 184
    }, {
      x: new Date("2018-02-27").getTime(),
      y: 181
    }, {
      x: new Date("2018-02-28").getTime(),
      y: 179
    }, {
      x: new Date("2018-03-01").getTime(),
      y: 177
    }, {
      x: new Date("2018-03-02").getTime(),
      y: 176
    }, {
      x: new Date("2018-03-02").getTime(),
      y: 172
    }]
  }],
  chart: {
    type: 'area',
    stacked: false,
    parentHeightOffset: 0,
    height: 400,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  colors: ["#287F71"],
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0
  },
  title: {
    text: 'Stock Price Movement',
    align: 'left',
    style: {
      fontWeight: 500
    }
  },
  fill: {
    // type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0);
      }
    },
    title: {
      text: 'Price',
      style: {
        fontWeight: 500
      }
    }
  },
  xaxis: {
    type: 'datetime'
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0);
      }
    }
  }
});
function generateDayWiseTimeSeriesline(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
export const getSyncingChart = () => ({
  series: [{
    data: generateDayWiseTimeSeriesline(new Date('11 Jan 2024').getTime(), 20, {
      min: 10,
      max: 60
    })
  }],
  chart: {
    height: 120,
    id: 'fb',
    group: 'social',
    type: 'line',
    parentHeightOffset: 0
  },
  colors: ['#287F71'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  // toolbar: {
  //     tools: {
  //         selection: false
  //     }
  // },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  tooltip: {
    followCursor: false,
    x: {
      show: false
    },
    marker: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return '';
        }
      }
    }
  },
  grid: {
    // clipMarkers: false
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: 'datetime'
  }
});
export const getSyncingChart2 = () => ({
  series: [{
    data: generateDayWiseTimeSeriesline(new Date('11 Feb 2024').getTime(), 20, {
      min: 10,
      max: 30
    })
  }],
  chart: {
    id: 'tw',
    group: 'social',
    type: 'line',
    height: 120,
    parentHeightOffset: 0
  },
  colors: ['#6b3baa'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 3
  },
  // toolbar: {
  //     tools: {
  //         selection: false
  //     }
  // },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  tooltip: {
    followCursor: false,
    x: {
      show: false
    },
    marker: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return '';
        }
      }
    }
  },
  grid: {
    // clipMarkers: false
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: 'datetime'
  }
});
export const getSyncingChartarea = () => ({
  series: [{
    data: generateDayWiseTimeSeriesline(new Date('11 March 2024').getTime(), 20, {
      min: 10,
      max: 60
    })
  }],
  chart: {
    id: 'yt',
    group: 'social',
    type: 'area',
    height: 160,
    parentHeightOffset: 0
  },
  colors: ['#ec344c'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'stepline',
    width: 3
  },
  // toolbar: {
  //     tools: {
  //         selection: false
  //     }
  // },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  tooltip: {
    followCursor: false,
    x: {
      show: false
    },
    marker: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return '';
        }
      }
    }
  },
  grid: {
    // clipMarkers: false
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: 'datetime'
  }
});
function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
var data = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
  min: 30,
  max: 90
});
export const getBrushLineChart = () => ({
  series: [{
    data: data
  }],
  chart: {
    id: 'chart2',
    type: 'line',
    height: 180,
    parentHeightOffset: 0,
    toolbar: {
      autoSelected: 'pan',
      show: false
    }
  },
  colors: ['#ec344c'],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    opacity: 1
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime'
  }
});
export const getBrushLineChart2 = () => ({
  series: [{
    data: data
  }],
  chart: {
    id: 'chart1',
    height: 170,
    type: 'area',
    parentHeightOffset: 0,
    brush: {
      target: 'chart2',
      enabled: true
    },
    selection: {
      enabled: true,
      xaxis: {
        min: new Date('19 Jun 2017').getTime(),
        max: new Date('14 Aug 2017').getTime()
      }
    }
  },
  colors: ['#6b3baa'],
  stroke: {
    width: 3
  },
  fill: {
    // type: 'gradient',
    gradient: {
      opacityFrom: 0.91,
      opacityTo: 0.1
    }
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    tickAmount: 2
  }
});
export const getSteplineChart = () => ({
  series: [{
    data: [36, 34, 45, 60, 33, 40, 55, 42, 38, 64, 64, 55]
  }],
  chart: {
    type: 'line',
    height: 350,
    parentHeightOffset: 0,
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'stepline'
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'Stepline Chart',
    align: 'left',
    style: {
      fontWeight: 500
    }
  },
  markers: {
    hover: {
      sizeOffset: 4
    }
  },
  colors: ['#287F71']
});
export const getGradientChart = () => ({
  series: [{
    name: 'Sales',
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
  }],
  chart: {
    height: 350,
    type: 'line',
    parentHeightOffset: 0
  },
  forecastDataPoints: {
    count: 7
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
    tickAmount: 10,
    labels: {
      formatter: function (_, timestamp, opts) {
        return opts.dateFormatter(new Date(timestamp ?? 0), 'dd MMM');
      }
    }
  },
  title: {
    text: 'Forecast',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#287F71'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    }
  }
});
export const getMissingDataChart = () => ({
  series: [{
    name: 'Peter',
    data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9]
  }, {
    name: 'Johnny',
    data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null]
  }, {
    name: 'David',
    data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null]
  }],
  chart: {
    height: 350,
    type: 'line',
    parentHeightOffset: 0,
    zoom: {
      enabled: false
    },
    animations: {
      enabled: false
    }
  },
  stroke: {
    width: [5, 5, 4],
    curve: 'smooth'
  },
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
  title: {
    text: 'Missing data (null values)',
    style: {
      fontWeight: 600
    }
  },
  xaxis: {},
  colors: ['#287F71', '#963b68', '#2786f1']
});
export function createDailyTimeSeries(baseval, count, yrange) {
  const series = [];
  for (let i = 0; i < count; i++) {
    const x = baseval;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    baseval += 86400000;
  }
  return series;
}
export function generateNewPoint(baseval, yrange) {
  const newDate = baseval + 86400000;
  const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  return [newDate, y];
}
export const getRealTimeChartOptions = data => ({
  series: [{
    data: data.slice()
  }],
  chart: {
    id: 'realtime',
    height: 350,
    type: 'line',
    parentHeightOffset: 0,
    animations: {
      enabled: true,
      // easing: 'linear', 
      dynamicAnimation: {
        speed: 2000
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Fast Updating Chart',
    align: 'left',
    style: {
      fontWeight: 600
    }
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    range: 86400000 * 9
  },
  yaxis: {
    max: 100
  },
  legend: {
    show: false
  },
  colors: ['#522c8f']
});
export const getDashedChart = () => ({
  chart: {
    height: 350,
    type: 'line',
    parentHeightOffset: 0,
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [3, 4, 3],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  series: [{
    name: "Session Duration",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
  }, {
    name: "Page Views",
    data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
  }, {
    name: 'Total Visits',
    data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49]
  }],
  title: {
    text: 'Page Statistics',
    align: 'left',
    style: {
      fontWeight: 500
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan']
  },
  tooltip: {
    y: [{
      title: {
        formatter: function (val) {
          return val + " (mins)";
        }
      }
    }, {
      title: {
        formatter: function (val) {
          return val + " per session";
        }
      }
    }, {
      title: {
        formatter: function (val) {
          return val;
        }
      }
    }]
  },
  colors: ["#f59440", "#001b2f", "#287F71"],
  grid: {
    borderColor: '#f1f1f1'
  }
});
var series = {
  "monthDataSeries1": {
    "prices": [8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9340.85],
    "dates": ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017", "29 Nov 2017", "30 Nov 2017", "01 Dec 2017", "04 Dec 2017", "05 Dec 2017", "06 Dec 2017", "07 Dec 2017", "08 Dec 2017"]
  },
  "monthDataSeries2": {
    "prices": [8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9040.85, 8340.7, 8165.5, 8122.9, 8107.85, 8128.0],
    "dates": ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017", "29 Nov 2017", "30 Nov 2017", "01 Dec 2017", "04 Dec 2017", "05 Dec 2017", "06 Dec 2017", "07 Dec 2017", "08 Dec 2017"]
  },
  "monthDataSeries3": {
    "prices": [7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95, 7347.75, 7311.25, 7266.4, 7253.25, 7215.45, 7266.35, 7315.25, 7237.2, 7191.4, 7238.95, 7222.6, 7217.9, 7359.3, 7371.55, 7371.15, 7469.2, 7429.25, 7434.65, 7451.1, 7475.25, 7566.25, 7556.8, 7525.55, 7555.45, 7560.9, 7490.7, 7527.6, 7551.9, 7514.85, 7577.95, 7592.3, 7621.95, 7707.95, 7859.1, 7815.7, 7739.0, 7778.7, 7839.45, 7756.45, 7669.2, 7580.45, 7452.85, 7617.25, 7701.6, 7606.8, 7620.05, 7513.85, 7498.45, 7575.45, 7601.95, 7589.1, 7525.85, 7569.5, 7702.5, 7812.7, 7803.75, 7816.3, 7851.15, 7912.2, 7972.8, 8145.0, 8161.1, 8121.05, 8071.25, 8088.2, 8154.45, 8148.3, 8122.05, 8132.65, 8074.55, 7952.8, 7885.55, 7733.9, 7897.15, 7973.15, 7888.5, 7842.8, 7838.4, 7909.85, 7892.75, 7897.75, 7820.05, 7904.4, 7872.2, 7847.5, 7849.55, 7789.6, 7736.35, 7819.4, 7875.35, 7871.8, 8076.5, 8114.8, 8193.55, 8217.1, 8235.05, 8215.3, 8216.4, 8301.55, 8235.25, 8229.75, 8201.95, 8164.95, 8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2],
    "dates": ["02 Jun 2017", "05 Jun 2017", "06 Jun 2017", "07 Jun 2017", "08 Jun 2017", "09 Jun 2017", "12 Jun 2017", "13 Jun 2017", "14 Jun 2017", "15 Jun 2017", "16 Jun 2017", "19 Jun 2017", "20 Jun 2017", "21 Jun 2017", "22 Jun 2017", "23 Jun 2017", "27 Jun 2017", "28 Jun 2017", "29 Jun 2017", "30 Jun 2017", "03 Jul 2017", "04 Jul 2017", "05 Jul 2017", "06 Jul 2017", "07 Jul 2017", "10 Jul 2017", "11 Jul 2017", "12 Jul 2017", "13 Jul 2017", "14 Jul 2017", "17 Jul 2017", "18 Jul 2017", "19 Jul 2017", "20 Jul 2017", "21 Jul 2017", "24 Jul 2017", "25 Jul 2017", "26 Jul 2017", "27 Jul 2017", "28 Jul 2017", "31 Jul 2017", "01 Aug 2017", "02 Aug 2017", "03 Aug 2017", "04 Aug 2017", "07 Aug 2017", "08 Aug 2017", "09 Aug 2017", "10 Aug 2017", "11 Aug 2017", "14 Aug 2017", "16 Aug 2017", "17 Aug 2017", "18 Aug 2017", "21 Aug 2017", "22 Aug 2017", "23 Aug 2017", "24 Aug 2017", "28 Aug 2017", "29 Aug 2017", "30 Aug 2017", "31 Aug 2017", "01 Sep 2017", "04 Sep 2017", "05 Sep 2017", "06 Sep 2017", "07 Sep 2017", "08 Sep 2017", "11 Sep 2017", "12 Sep 2017", "13 Sep 2017", "14 Sep 2017", "15 Sep 2017", "18 Sep 2017", "19 Sep 2017", "20 Sep 2017", "21 Sep 2017", "22 Sep 2017", "25 Sep 2017", "26 Sep 2017", "27 Sep 2017", "28 Sep 2017", "29 Sep 2017", "03 Oct 2017", "04 Oct 2017", "05 Oct 2017", "06 Oct 2017", "09 Oct 2017", "10 Oct 2017", "11 Oct 2017", "12 Oct 2017", "13 Oct 2017", "16 Oct 2017", "17 Oct 2017", "18 Oct 2017", "19 Oct 2017", "23 Oct 2017", "24 Oct 2017", "25 Oct 2017", "26 Oct 2017", "27 Oct 2017", "30 Oct 2017", "31 Oct 2017", "01 Nov 2017", "02 Nov 2017", "03 Nov 2017", "06 Nov 2017", "07 Nov 2017", "08 Nov 2017", "09 Nov 2017", "10 Nov 2017", "13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017"]
  }
};
export const getAnnotationsChart = () => ({
  series: [{
    data: series.monthDataSeries1.prices
  }],
  chart: {
    height: 350,
    type: 'line',
    id: 'areachart-2',
    parentHeightOffset: 0
  },
  annotations: {
    yaxis: [{
      y: 8200,
      borderColor: '#287F71',
      label: {
        borderColor: '#287F71',
        style: {
          color: '#fff',
          background: '#287F71'
        },
        text: 'Support'
      }
    }, {
      y: 8600,
      y2: 9000,
      borderColor: '#000',
      fillColor: '#f59440',
      opacity: 0.2,
      label: {
        borderColor: '#333',
        style: {
          fontSize: '10px',
          color: '#343a40',
          background: '#f59440'
        },
        text: 'Y-axis range'
      }
    }],
    xaxis: [{
      x: new Date('23 Nov 2017').getTime(),
      strokeDashArray: 0,
      borderColor: '#6b3baa',
      label: {
        borderColor: '#6b3baa',
        style: {
          color: '#fff',
          background: '#6b3baa'
        },
        text: 'Anno Test'
      }
    }, {
      x: new Date('26 Nov 2017').getTime(),
      x2: new Date('28 Nov 2017').getTime(),
      fillColor: '#B3F7CA',
      opacity: 0.4,
      label: {
        borderColor: '#23c093',
        style: {
          fontSize: '10px',
          color: '#fff',
          background: '#23c093'
        },
        offsetY: -10,
        text: 'X-axis range'
      }
    }],
    points: [{
      x: new Date('01 Dec 2017').getTime(),
      y: 8607.55,
      marker: {
        size: 8,
        fillColor: '#fff',
        strokeColor: 'red',
        // radius: 2,
        cssClass: 'apexcharts-custom-class'
      },
      label: {
        borderColor: '#FF4560',
        offsetY: 0,
        style: {
          color: '#fff',
          background: '#FF4560'
        },
        text: 'Point Annotation'
      }
    }, {
      x: new Date('08 Dec 2017').getTime(),
      y: 9340.85,
      marker: {
        size: 0
      },
      image: {
        path: '../../assets/images/instagram.png'
      }
    }]
  },
  colors: ["#287F71"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  grid: {
    padding: {
      right: 30,
      left: 20
    }
  },
  title: {
    text: 'Line with Annotations',
    align: 'left'
  },
  labels: series.monthDataSeries1.dates,
  xaxis: {
    type: 'datetime'
  }
});