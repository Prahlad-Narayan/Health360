import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

// Registering required Chart.js elements
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

// Doughnutchart component definition
const Doughnutchart = () => {
    // Data for the Doughnut chart
    const data = {
        labels: ['Calories consumed', 'Calories remaining'],
        datasets: [{
            label: 'Food tracker',
            data: [1560, 440],
            backgroundColor: ['black', 'white'],
            borderColor: ['black', 'white']
        }]
    };

    // Options for the Doughnut chart
    const options = {};

    // Rendering the Doughnut chart using the Doughnut component from react-chartjs-2
    return (
        <Doughnut data={data} options={options} />
    );
}

// Exporting the Doughnutchart component
export default Doughnutchart;
