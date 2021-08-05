import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import * as actionCreators from '../../../store/actionCreators'

import './Dashboard.css'

const Dashboard = (props) => {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const metrics = useSelector(state => state.admin.metrics)
    // console.log(data)

    
    const dispatch = useDispatch()


    const metricsFilter = metrics.map(el => el.fields)
    // console.log(metricsFilter)
    // const date = moment(new Date().toISOString()).format("YYYY-DD-MM")

    // const metricsSort = metricsFilter.sort((a,b) => moment(a['A-Month'])-moment(b['A-Month']))


    let keysArray = []

    keysArray = Object.keys(metricsFilter[0] || []).sort()     
     
    const graph1 = metrics.map(el => el.fields[keysArray[0]] )
    const graph2 = metrics.map(el => el.fields[keysArray[1]] )
    const graph3 = metrics.map(el => el.fields[keysArray[2]] )
    const graph4 = metrics.map(el => el.fields[keysArray[3]] )
    const graph5 = metrics.map(el => el.fields[keysArray[4]] )
    const graph6 = metrics.map(el => el.fields[keysArray[5]] )
    const graph7 = metrics.map(el => el.fields[keysArray[6]] )
    const graph8 = metrics.map(el => el.fields[keysArray[7]] )

    const mon = metrics.map(el => el.fields['A-Month'] )


    let months = []

    // graph1.sort((a,b) => moment(a)-moment(b))

    for(let month of graph1) {
        months.push(moment(month).format("MMM"))
    }

//     keysArray.sort(function(a,b) {
//     return b.split(" ").length - a.split(" ").length;
// })
    
    // console.log(months,graph2)
    

    const line_graph1 = {
        labels: months,
        datasets: [
            {
                label: keysArray[1] && keysArray[1].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph2
            }
        ]
    }

    const line_graph2 = {
        labels: months,
        datasets: [
            {
                label: keysArray[2] && keysArray[2].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph3
            }
        ]
    }

    const line_graph3 = {
        labels: months,
        datasets: [
            {
                label: keysArray[3] && keysArray[3].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph4
            }
        ]
    }

    const line_graph4 = {
        labels: months,
        datasets: [
            {
                label: keysArray[4] && keysArray[4].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph5
            }
        ]
    }

    const line_graph5 = {
        labels: months,
        datasets: [
            {
                label: keysArray[5] && keysArray[5].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph6
            }
        ]
    }

    const line_graph6 = {
        labels: months,
        datasets: [
            {
                label: keysArray[6] && keysArray[6].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph7
            }
        ]
    }

    const line_graph7 = {
        labels: months,
        datasets: [
            {
                label: keysArray[7] && keysArray[7].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph8
            }
        ]
    }


        


    return (
        <div className="dashboard">
                    {line_graph1.datasets[0].data[0] === undefined ? null : <div className="revenue">
                        <h3>{keysArray[1] && keysArray[1].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph1}
                            width={100}
                            height={30}
                        />
                    </div>}

                    {line_graph2.datasets[0].data[0] === undefined ? null : <div className="revenue">
                        <h3>{keysArray[2] && keysArray[2].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph2}
                            width={100}
                            height={30}
                        />
                    </div>}
                    {line_graph3.datasets[0].data[0] === undefined ? null : <div className="revenue">
                        <h3>{keysArray[3] && keysArray[3].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph3}
                            width={100}
                            height={30}
                        />
                    </div>}

                    {line_graph4.datasets[0].data[0] === undefined ? null : <div className="revenue">
                        <h3>{keysArray[4] && keysArray[4].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph4}
                            width={100}
                            height={30}
                        />
                    </div>}
                    {line_graph5.datasets[0].data[0] === undefined ? null :<div className="revenue">
                        <h3>{keysArray[5] && keysArray[5].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph5}
                            width={100}
                            height={30}
                        />
                    </div>}

                    {line_graph6.datasets[0].data[0] === undefined ? null : <div className="revenue">
                        <h3>{keysArray[6] && keysArray[6].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph6}
                            width={100}
                            height={30}
                        
                        />
                    </div>}

                    {line_graph7.datasets[0].data[0] === undefined ? null : <div className="revenue">
                        <h3>{keysArray[7] && keysArray[7].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph7}
                            width={100}
                            height={30}
                        />
                    </div>}
        </div>
    )
}

export default Dashboard

// options={{
//     maintainAspectRatio: false,
//     responsive: true

// }}