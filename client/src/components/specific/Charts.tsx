import React from 'react'
import {Line, Doughnut} from "react-chartjs-2";
import { ArcElement, CategoryScale, Chart as ChartJs, Filler, Legend, LinearScale, LineElement, plugins, PointElement, scales, Tooltip } from 'chart.js';
import { getLast7Days } from '../../lib/feature';

ChartJs.register(Tooltip, CategoryScale,LinearScale,LineElement, PointElement, Filler, ArcElement, Legend)

const labels = getLast7Days();
const LineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 15,
                font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    weight: '500'
                },
                color: '#e5e7eb',
                boxWidth: window.innerWidth < 768 ? 8 : 12,
                boxHeight: window.innerWidth < 768 ? 8 : 12
            }
        },
        title: {
            display: false,
        },
        tooltip: {
            backgroundColor: '#1f2937',
            titleColor: '#f9fafb',
            bodyColor: '#d1d5db',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            displayColors: true,
            intersect: false,
            mode: 'index',
            titleFont: {
                size: window.innerWidth < 768 ? 11 : 12
            },
            bodyFont: {
                size: window.innerWidth < 768 ? 10 : 11
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index'
    },
    scales: {
        x: {
            grid: {
                display: true,
                color: '#374151',
                drawBorder: false
            },
            ticks: {
                color: '#9ca3af',
                font: {
                    size: window.innerWidth < 768 ? 9 : 11,
                    weight: '400'
                },
                padding: 6,
                maxRotation: window.innerWidth < 768 ? 45 : 0,
                minRotation: window.innerWidth < 768 ? 45 : 0
            },
            border: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: true,
                color: '#374151',
                drawBorder: false
            },
            ticks: {
                color: '#9ca3af',
                font: {
                    size: window.innerWidth < 768 ? 9 : 11,
                    weight: '400'
                },
                padding: window.innerWidth < 768 ? 6 : 12,
                maxTicksLimit: window.innerWidth < 768 ? 6 : 10
            },
            border: {
                display: false
            }
        },
    },
    elements: {
        line: {
            tension: 0.4,
            borderWidth: window.innerWidth < 768 ? 2 : 2.5
        },
        point: {
            radius: window.innerWidth < 768 ? 3 : 4,
            hoverRadius: window.innerWidth < 768 ? 5 : 6,
            borderWidth: 2,
            hoverBorderWidth: 3
        }
    }
};

const LineChart = ({value=[]}) => {
    const data = {
        labels, // The logic is written inside lib/features
        datasets:[
            {
            data: value,
            label:"Total Chats",
            fill: false,
            backgroundColor:"#3b82f6",
            borderColor:"#3b82f6",
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#3b82f6",
            pointHoverBackgroundColor: "#3b82f6",
            pointHoverBorderColor: "#ffffff"
        },
    ]
    };
  return <Line data={data} options={LineChartOptions}/>
}

const DoughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: {
                    size: window.innerWidth < 768 ? 11 : 13,
                    weight: '600'
                },
                color: '#e5e7eb',
                boxWidth: window.innerWidth < 768 ? 10 : 14,
                boxHeight: window.innerWidth < 768 ? 10 : 14,
                textAlign: 'center'
            }
        },
        title: {
            display: false,
        },
        tooltip: {
            backgroundColor: '#1f2937',
            titleColor: '#f9fafb',
            bodyColor: '#d1d5db',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 16,
            displayColors: true,
            titleFont: {
                size: window.innerWidth < 768 ? 12 : 14,
                weight: '600'
            },
            bodyFont: {
                size: window.innerWidth < 768 ? 11 : 12,
                weight: '500'
            },
            callbacks: {
                label: function(context) {
                    const label = context.label || '';
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                }
            }
        }
    },
    cutout: '75%',
    borderWidth: 3,
    spacing: 2,
    elements: {
        arc: {
            borderWidth: 3,
            hoverBorderWidth: 4
        }
    },
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200,
        easing: 'easeOutQuart'
    }
};

const DoughnutChart = ({value=[], labels=[]}) => {
    // Modern gradient-inspired colors for the two segments
    const backgroundColors = [
        '#10b981', // Emerald green for first segment
        '#3b82f6'  // Blue for second segment
    ];
    
    const borderColors = [
        '#059669', // Darker emerald for border
        '#2563eb'  // Darker blue for border
    ];
    
    const hoverBackgroundColors = [
        '#34d399', // Lighter emerald on hover
        '#60a5fa'  // Lighter blue on hover
    ];

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Total Chats vs Group Chats",
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                hoverBackgroundColor: hoverBackgroundColors,
                hoverBorderColor: borderColors,
                borderWidth: 3,
                hoverBorderWidth: 4,
                offset: [4, 4] // Slight separation between segments
            },
        ],
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-full">
                <Doughnut data={data} options={DoughnutChartOptions} />
                
              
            </div>
            
            {/* Custom legend with statistics */}
            <div className="mt-6 w-full max-w-sm">
                <div className="grid grid-cols-2 gap-4">
                    {labels.map((label, index) => {
                        const total = value.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? Math.round((value[index] / total) * 100) : 0;
                        
                        return (
                            <div 
                                key={index}
                                className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm"
                            >
                                <div 
                                    className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg"
                                    style={{ backgroundColor: backgroundColors[index] }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                        {label}
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-gray-400">
                                            {value[index] || 0}
                                        </span>
                                        <span className="text-xs font-semibold text-gray-300">
                                            {percentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export {LineChart, DoughnutChart}