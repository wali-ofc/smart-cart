import roket from "@/assets/images/rocket.png";
import smallImg from "@/assets/images/small/img-4.jpg";
import type { ApexOptions } from "apexcharts";

export const getSimpleRadialbarChart = (): ApexOptions => ({
    series: [70],
    chart: {
        height: 350,
        type: 'radialBar',
        parentHeightOffset: 0,
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
            }
        },
    },
    colors: ["#2786f1"],
    labels: ['Cricket'],
})
export const getMultipleRadialbarChart = (): ApexOptions => ({
    series: [44, 55, 67, 83],
    chart: {
        height: 350,
        type: 'radialBar',
        parentHeightOffset: 0,
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    // formatter: function (w) {
                    //     return 249
                    // }
                }
            },
        }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
})

export const getCustomAngleCircleRadialbarChart = (): ApexOptions => ({
    series: [76, 67, 61, 90],
    chart: {
        height: 350,
        type: 'radialBar',
        parentHeightOffset: 0,
    },
    plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: false,
                }
            },
            barLabels: {
                enabled: true,
                useSeriesColors: true,
                // margin: 8,
                fontSize: '16px',
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
            },
        }
    },
    colors: ['#2786f1', '#963b68', '#ec344c', '#f59440'],
    labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
})

export const getGradientRadialbarChart = (): ApexOptions => ({
    series: [64],
    chart: {
        height: 350,
        type: 'radialBar',
        parentHeightOffset: 0,
        toolbar: {
            show: true
        }
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
                margin: 0,
                size: '70%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front'
            },
            track: {
                strokeWidth: '67%',
                margin: 0 // margin is in pixels
            },

            dataLabels: {
                show: true,
                name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                },
                value: {
                    // formatter: function (val: any) {
                    //     return parseInt(val);
                    // },
                    color: '#111',
                    fontSize: '36px',
                    show: true,
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    },
    stroke: {
        lineCap: 'round'
    },
    labels: ['Percent'],
})

export const getRadialbarswithImageChart = (): ApexOptions => ({
    series: [67],
    chart: {
        height: 335,
        type: 'radialBar',
        parentHeightOffset: 0,
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: '65%',
                image: roket,
                imageWidth: 56,
                imageHeight: 56,
                imageClipped: false
            },
            dataLabels: {
                name: {
                    show: false,
                    color: '#fff'
                },
                value: {
                    show: true,
                    color: '#333',
                    offsetY: 65,
                    fontSize: '22px'
                }
            }
        }
    },
    fill: {
        type: 'image',
        image: {
            src: smallImg,
        }
    },
    stroke: {
        lineCap: 'round'
    },
    labels: ['Volatility'],

})

export const getStrokedGaugeChart = (): ApexOptions => ({
    series: [67],
    chart: {
        height: 350,
        type: 'radialBar',
        parentHeightOffset: 0,
        offsetY: -10
    },
    colors: ["#2786f1"],
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: '16px',
                    color: undefined,
                    offsetY: 120
                },
                value: {
                    offsetY: 76,
                    fontSize: '22px',
                    color: undefined,
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
    labels: ['Median Ratio'],
})

export const getSemiCircleGaugeChart = (): ApexOptions => ({
    series: [76],
    chart: {
        type: 'radialBar',
        height: 350,
        offsetY: -20,
        parentHeightOffset: 0,
        sparkline: {
            enabled: true
        }
    },
    colors: ["#4a5a6b"],
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    color: '#999',
                    opacity: 1,
                    blur: 2
                }
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    offsetY: -2,
                    fontSize: '22px'
                }
            }
        }
    },
    grid: {
        padding: {
            top: -10
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
        },
    },
    labels: ['Average Results'],
})