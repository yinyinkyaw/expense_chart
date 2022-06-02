import React, {useEffect, useState} from 'react';
import "./App.css"
import ExpandData from "./data.json";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ExpressChart = () => {

    const [totalExpand, setTotalExpand] = useState(0);
    const expandData = ExpandData.filter((data)=> data.amount);

    console.log("expand data::",expandData);

    const options = {
        chart: {
            type:"column"
        },
        title: {
            text:"",
        },
        xAxis: {
            text:"",
        },
        yAxis:{
            text: "",
        },
        series:[
            {
                data: expandData,
            }
        ]
    }

    useEffect(()=>{
        const data = ExpandData;
        let totalAmount = 0;
        for(let i = 0; i < data.length; i++){
            totalAmount += data[i].amount;
        }
        setTotalExpand(totalAmount);
    },[]);

    return (
        <div className="express-chart-component-container">
            <div className="express-chart-my-balance-container">
                <div className="express-chart-my-balance-left-side">
                    <span>My Balance</span>
                    <label>$921.48</label>
                </div>
                <div className="express-chart-my-balance-right-side">

                </div>
            </div>
            <div className="express-chart-weekly-spend-chart-container">
                <label>Spending - Last 7 days</label>
                <div className="express-chart-weekly-spend-chart">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div className="express-chart-weekly-spend--total-info">
                    <div>
                        <label>${totalExpand}</label>
                        <span>Total this month</span>
                    </div>
                    <div>
                        <span>+2.4%</span>
                        <span>from last month</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpressChart;