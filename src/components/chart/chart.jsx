import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import "./chart.sass"


const Chart = ({ chartData }) => {

    const fixedChartData = chartData.map(({ date: name, ...rest }) => ({ name, ...rest }))

    return (
        <LineChart
            width={500}
            height={300}
            data={fixedChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            {chartData.length && (
                <>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="kilojoules" stroke="#82ca9d" />
                </>
            )}
        </LineChart>
    )
}

export default Chart
