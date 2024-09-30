import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Container } from '@mui/material';
import {
    Chart, 
    LinearScale, 
    CategoryScale, 
    ArcElement, 
    PointElement, 
    LineElement, 
    Tooltip, 
    Legend
  } from 'chart.js';
  
  // Register the components
  Chart.register(LinearScale, CategoryScale, ArcElement, PointElement, LineElement, Tooltip, Legend);

function NearMissPage() {
    const [scatterData, setScatterData] = useState({});
    const [pieData, setPieData] = useState({});
    const [lineData, setLineData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching Near Miss data...");
        fetchNeoData();
    }, []);

    let chartInstance = null;

    const renderChart = (ctx, data, config) => {
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(ctx, {
            type: 'bar', 
            data: data,
            options: config,
        });
    };

    const fetchNeoData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/near-miss');
            

            console.log("Full API Response:", response.data);
            

            const neoObject = response.data.near_earth_objects;
            

            const neoData = Object.values(neoObject).flat(); 
            console.log("Fetched NEO data: ", neoData);
    
            if (neoData.length === 0) {
                console.error("No NEO data found.");
                setError("No near miss data available");
                setLoading(false);
                return;
            }
    

            const scatter = neoData.map(neo => {
                const closeApproach = neo.close_approach_data?.[0];
                if (closeApproach?.relative_velocity) {
                    return {
                        x: neo.estimated_diameter?.meters?.estimated_diameter_max || 0,
                        y: closeApproach.relative_velocity.kilometers_per_hour || 0,
                    };
                } else {
                    console.warn(`Missing close approach data for NEO: ${neo.name}`);
                    return null;
                }
            }).filter(item => item !== null);  
    
            setScatterData({
                datasets: [{
                    label: 'NEO Size vs Velocity',
                    data: scatter,
                    backgroundColor: 'rgba(75,192,192,1)',
                }],
            });
    

            const hazardousCount = neoData.filter(neo => neo.is_potentially_hazardous_asteroid).length;
            const nonHazardousCount = neoData.length - hazardousCount;
    
            setPieData({
                labels: ['Hazardous', 'Non-Hazardous'],
                datasets: [{
                    data: [hazardousCount, nonHazardousCount],
                    backgroundColor: ['rgba(255,99,132,1)', 'rgba(75,192,192,1)'],
                }],
            });
    

            const distances = neoData.map(neo => {
                const closeApproach = neo.close_approach_data?.[0];
                return closeApproach ? closeApproach.miss_distance?.kilometers || 0 : null;
            }).filter(item => item !== null);
    
            const labels = neoData.map(neo => neo.name);
    
            setLineData({
                labels: labels,
                datasets: [{
                    label: 'Distance from Earth (km)',
                    data: distances,
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                }],
            });
    
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Near Miss data: ", error);
            setError('Error fetching NEO data');
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <h1>Earth's Near Miss Data</h1>

            <h2>Object Size vs Speed</h2>
            <Scatter data={scatterData} />

            <h2>Hazards</h2>
            <Pie data={pieData} />

            <h2>Near Miss Distances</h2>
            <Line data={lineData} />
        </Container>
    );
}

export default NearMissPage;