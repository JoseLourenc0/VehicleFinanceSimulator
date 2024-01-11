import { Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts"

const RadialBarChart = (props: { title: string, valInPercentage: number, intervals: number[], colors: string[], name: string }) => {

    const findNearestValues = () => {
        const { intervals, valInPercentage } = props
        let lowerValue = null;
        let higherValue = null;

        for (let i = 0; i < intervals.length; i++) {
            if (intervals[i] <= valInPercentage) {
                lowerValue = intervals[i]
            } else if (intervals[i] > valInPercentage) {
                higherValue = intervals[i]
                break
            }
        }

        return {
            lowerValue,
            higherValue,
            lowerIndex: intervals.indexOf(lowerValue!),
            higherIndex: intervals.indexOf(higherValue!)
        }
    }

    const { lowerIndex, higherIndex } = findNearestValues()

    const transitionColor = props.colors[higherIndex]
    const mainColor = props.colors[lowerIndex]

    const options: ApexCharts.ApexOptions = {
        chart: {
            height: 280,
            type: "radialBar",
        },
        series: [67],
        colors: [mainColor],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                    background: '#333',
                    startAngle: -135,
                    endAngle: 135,
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '30px',
                        offsetY: 10,
                        color: '#fff'
                    },
                    value: {
                        fontSize: "30px",
                        show: false
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: [transitionColor],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        },
        labels: [(props.valInPercentage * 1000).toString()]
    }
    return (
        <div id="chart" style={{ maxWidth: '400px' }}>
            <Typography align="center">
                {props.title}
            </Typography>
            <ReactApexChart options={options} series={options.series} type="radialBar" />
        </div>
    )
}
export default RadialBarChart
