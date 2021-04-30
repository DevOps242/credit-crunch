import React from 'react';
import { Line } from 'react-chartjs-2';

import classes from './Chart.module.css'


const chart = props => {

    const getData = (index) => {
        const preData = []
        props.data.forEach(item=>{
            preData.push(item[index])
        })
        return preData;
    }

    
    const dataValue = getData(1);
    const dataDates = getData(4);
    
    const chartData = {
        labels: dataDates,
        datasets: [
            {
                label: props.chartType,
                data: dataValue,
                pointBackgroundColor: props.mainColor,
                steppedLine: false,
                borderColor: props.mainColor,
                fill: false,
                lineTension: 0
            },
        ]
    }
    
    // static defaultProps = {

    // }

    return (
        <React.Fragment>
            <div className={classes.Chart}>
                <Line 
                    
                    data={chartData}
                    width={50}
                    height={17}
                    options={ {
                        // maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: props.chartType,
                            fontSize: 18
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        scales:{
                            yAxes: [{
                                ticks: {
                                    callback: function(value, index, values) {
                                        return '$' + value;
                                    }
                                }
                            }]
                        }
                    } }
                />
            </div>
        </React.Fragment>
    )
}


export default React.memo(chart);