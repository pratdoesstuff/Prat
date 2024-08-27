import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Color palette
const COLORS = ['#4A2C2A', '#967259', '#D2A979', '#ECCEB2', '#634832'];

// Mock data generator
const generateData = () => {
  const pageViews = Math.floor(Math.random() * 1000) + 500;
  const uniqueVisitors = Math.floor(pageViews * (0.6 + Math.random() * 0.2));
  const bounceRate = Math.floor(Math.random() * 30) + 20;
  const avgTimeOnSite = Math.floor(Math.random() * 180) + 60;
  const conversionRate = (Math.random() * 5 + 1).toFixed(2);

  return {
    pageViews,
    uniqueVisitors,
    bounceRate,
    avgTimeOnSite,
    conversionRate,
    pageViewsData: [
      { name: 'Home', views: Math.floor(Math.random() * 300) + 100 },
      { name: 'About', views: Math.floor(Math.random() * 200) + 50 },
      { name: 'Portfolio', views: Math.floor(Math.random() * 250) + 75 },
      { name: 'Blog', views: Math.floor(Math.random() * 150) + 25 },
      { name: 'Contact', views: Math.floor(Math.random() * 100) + 10 },
    ],
    userFlowData: [
      { name: 'Home → About', value: Math.floor(Math.random() * 100) + 20 },
      { name: 'Home → Portfolio', value: Math.floor(Math.random() * 150) + 30 },
      { name: 'Portfolio → Contact', value: Math.floor(Math.random() * 80) + 10 },
      { name: 'Blog → Portfolio', value: Math.floor(Math.random() * 70) + 5 },
      { name: 'About → Contact', value: Math.floor(Math.random() * 60) + 15 },
    ],
    deviceData: [
      { name: 'Desktop', value: Math.floor(Math.random() * 60) + 30 },
      { name: 'Mobile', value: Math.floor(Math.random() * 30) + 20 },
      { name: 'Tablet', value: Math.floor(Math.random() * 10) + 5 },
    ],
    emotionData: [
      { name: 'Satisfied', value: Math.floor(Math.random() * 70) + 20 },
      { name: 'Neutral', value: Math.floor(Math.random() * 20) + 5 },
      { name: 'Unsatisfied', value: Math.floor(Math.random() * 10) + 5 },
    ],
  };
};

const Dashboard = () => {
  const [data, setData] = useState(generateData());
  const [activeTab, setActiveTab] = useState('pageViews');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#ECCEB2', padding: '10px', border: '1px solid #967259' }}>
          <p style={{ color: '#4A2C2A', fontWeight: 'bold' }}>{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '24px', background: 'linear-gradient(to bottom right, #D2A979, #967259)', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#4A2C2A' }}>
        Analytics Dashboard
      </h1>
      <div style={{ marginBottom: '24px', backgroundColor: '#ECCEB2', padding: '16px', borderRadius: '8px', border: '1px solid #967259' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A2C2A' }}>Note: This dashboard is currently simulating fake data</h2>
        <p style={{ color: '#634832' }}>The data shown here is generated randomly for demonstration purposes.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#967259', padding: '16px', borderRadius: '8px', color: '#ECCEB2' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Page Views</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.pageViews}</p>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>Unique Visitors: {data.uniqueVisitors}</p>
        </div>
        <div style={{ backgroundColor: '#967259', padding: '16px', borderRadius: '8px', color: '#ECCEB2' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Avg. Time on Site</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.avgTimeOnSite}s</p>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>Bounce Rate: {data.bounceRate}%</p>
        </div>
        <div style={{ backgroundColor: '#967259', padding: '16px', borderRadius: '8px', color: '#ECCEB2' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Conversion Rate</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.conversionRate}%</p>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>Of total visitors</p>
        </div>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', backgroundColor: '#ECCEB2', borderRadius: '8px 8px 0 0' }}>
          {['Page Views', 'User Flow', 'Devices', 'User Satisfaction'].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(['pageViews', 'userFlow', 'devices', 'emotions'][index])}
              style={{
                padding: '12px',
                backgroundColor: activeTab === ['pageViews', 'userFlow', 'devices', 'emotions'][index] ? '#967259' : 'transparent',
                color: activeTab === ['pageViews', 'userFlow', 'devices', 'emotions'][index] ? '#ECCEB2' : '#4A2C2A',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#ECCEB2', padding: '24px', borderRadius: '0 0 8px 8px' }}>
          {activeTab === 'pageViews' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A2C2A', marginBottom: '16px' }}>Page Views Distribution</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.pageViewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#967259" />
                    <XAxis dataKey="name" tick={{fill: '#4A2C2A'}} />
                    <YAxis tick={{fill: '#4A2C2A'}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="views" fill="#634832" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === 'userFlow' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A2C2A', marginBottom: '16px' }}>User Navigation Paths</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.userFlowData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.userFlowData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === 'devices' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A2C2A', marginBottom: '16px' }}>Device Usage</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === 'emotions' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4A2C2A', marginBottom: '16px' }}>User Satisfaction Levels</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.emotionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#967259" />
                    <XAxis dataKey="name" tick={{fill: '#4A2C2A'}} />
                    <YAxis tick={{fill: '#4A2C2A'}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="value" fill="#634832" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


ReactDOM.render(<Dashboard />, document.getElementById('root'));