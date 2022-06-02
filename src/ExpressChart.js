import { color } from 'highcharts';
import React, {useEffect, useState} from 'react';
import { BarChart, ResponsiveContainer, Bar, XAxis, Tooltip, Cell } from 'recharts';
import "./App.css"
import ExpandData from "./data.json";

const ExpressChart = () => {

    const [totalExpand, setTotalExpand] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(()=>{
        let expandAmount = 0;
        for(let i=0; i< ExpandData.length; i++){
            expandAmount += ExpandData[i].amount;
        };
        setTotalExpand(expandAmount);
        // eslint-disable-next-line
    },[]);

    const CustomizeTooltip = ({payload, label, active}) =>{
    
        return(
            payload.length >= 1 &&
            <div className="expense-chart-customize-tooltip">
                ${payload[0].value}
            </div>
        )
    }

    function hoverBarChart(data, index,payload){
        console.log("index:::",index,payload,data);
        setCurrentIndex(1);

    }

    
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
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ExpandData} >
                            <Bar dataKey={"amount"} onMouseOver={()=>{hoverBarChart()}} onMouseLeave={()=>{setCurrentIndex(ExpandData.length)}} >
                                {
                                    ExpandData.map((_,index)=>
                                        <Cell cursor="pointer" fill={index === currentIndex ? "#ff9b87" :"#EC755D"} key={`cell-${index}`}  />
                                    )
                                }
                            </Bar>
                            <XAxis dataKey="day" axisLine={false} tickLine={false}/>
                            <Tooltip content={<CustomizeTooltip/>} cursor={{fill:'transparent'}} offset={10}/>
                        </BarChart>
                    </ResponsiveContainer>
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