import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./chart.sass"


const Chart = ({ chartData }) => {
    const dates = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d.toISOString().slice(0,10);
    })

    const fixedChartData = chartData.map(({ date: name, ...rest }) => ({ name, ...rest }))

    return (
        <LineChart
            width={500}
            height={300}
            data={fixedChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="kilojoules" stroke="#82ca9d" />
         </LineChart>
    )
}

export default Chart
