import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line } from 'recharts';

const aiSubfields = [
  { name: 'وكلاء AI', value: 9.5, salary: 240, risk: 'منخفض', color: '#27ae60' },
  { name: 'سلامة AI', value: 9.0, salary: 310, risk: 'منخفض جداً', color: '#2ecc71' },
  { name: 'MLOps', value: 8.5, salary: 182, risk: 'متوسط', color: '#3498db' },
  { name: 'NLP/LLMs', value: 8.0, salary: 195, risk: 'متوسط-عالي', color: '#9b59b6' },
  { name: 'رؤية حاسوبية', value: 7.5, salary: 180, risk: 'متوسط', color: '#e74c3c' },
  { name: 'AI للعلوم', value: 7.0, salary: 202, risk: 'منخفض', color: '#f39c12' },
];

const geoData = [
  { name: '🇺🇸 أمريكا', aiPremium: 17.7, jobs: 7000, growth: 33 },
  { name: '🇸🇦 السعودية', aiPremium: 25, jobs: 350, growth: 45 },
  { name: '🇦🇪 الإمارات', aiPremium: 22, jobs: 280, growth: 40 },
  { name: '🇨🇳 الصين', aiPremium: 15, jobs: 5000, growth: 28 },
  { name: '🇮🇳 الهند', aiPremium: 20, jobs: 2300, growth: 52 },
];

const timelineData = [
  { year: '2025', quantum: 5, ai: 85, blockchain: 40 },
  { year: '2027', quantum: 15, ai: 92, blockchain: 55 },
  { year: '2029', quantum: 35, ai: 95, blockchain: 70 },
  { year: '2031', quantum: 60, ai: 97, blockchain: 82 },
  { year: '2033', quantum: 80, ai: 98, blockchain: 90 },
  { year: '2035', quantum: 95, ai: 99, blockchain: 95 },
];

const blockchainData = [
  { name: 'هندسة ZK', value: 35, salary: '$180-250K' },
  { name: 'ترميز RWA', value: 30, salary: '$150-200K' },
  { name: 'تدقيق العقود', value: 20, salary: '$150-220K' },
  { name: 'DeFi', value: 15, salary: '$140-180K' },
];

const COLORS = ['#1a5276', '#2980b9', '#27ae60', '#f39c12', '#e74c3c', '#9b59b6'];

export default function TechRoadmap() {
  const [activeTab, setActiveTab] = useState('overview');

  const StatCard = ({ title, value, subtitle, color }) => (
    <div style={{
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      borderRadius: '16px',
      padding: '24px',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '8px' }}>{title}</div>
      {subtitle && <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>{subtitle}</div>}
    </div>
  );

  const SkillBar = ({ name, value, maxValue = 10 }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', direction: 'rtl' }}>
        <span style={{ fontWeight: '500' }}>{name}</span>
        <span style={{ color: '#2980b9', fontWeight: 'bold' }}>{value}/10</span>
      </div>
      <div style={{ background: '#ecf0f1', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
        <div style={{
          width: `${(value / maxValue) * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)`,
          borderRadius: '10px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'ai', label: 'الذكاء الاصطناعي' },
    { id: 'quantum', label: 'الحوسبة الكمية' },
    { id: 'blockchain', label: 'البلوكتشين' },
    { id: 'geo', label: 'الفرص الجغرافية' },
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      direction: 'rtl', 
      background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          color: '#1a5276', 
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>
          خارطة طريق المهارات التقنية
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '16px' }}>2025 - 2035</p>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px', 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '25px',
              background: activeTab === tab.id ? '#1a5276' : '#ecf0f1',
              color: activeTab === tab.id ? 'white' : '#2c3e50',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '30px' }}>
            <StatCard title="حجم سوق الكم" value="$97B" subtitle="بحلول 2035" color="#1a5276" />
            <StatCard title="وظائف كمية" value="250K" subtitle="بحلول 2030" color="#27ae60" />
            <StatCard title="سوق RWA" value="$16T" subtitle="بحلول 2030" color="#2980b9" />
            <StatCard title="نمو AI" value="+40%" subtitle="حتى 2027" color="#f39c12" />
          </div>

          {/* Timeline Chart */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h3 style={{ color: '#1a5276', marginBottom: '20px', textAlign: 'center' }}>تطور الطلب على المهارات</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ecf0f1" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ai" stroke="#27ae60" strokeWidth={3} name="AI" dot={{ fill: '#27ae60' }} />
                <Line type="monotone" dataKey="quantum" stroke="#1a5276" strokeWidth={3} name="الكم" dot={{ fill: '#1a5276' }} />
                <Line type="monotone" dataKey="blockchain" stroke="#f39c12" strokeWidth={3} name="بلوكتشين" dot={{ fill: '#f39c12' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Box */}
          <div style={{ background: 'linear-gradient(135deg, #1a5276 0%, #2980b9 100%)', borderRadius: '16px', padding: '24px', color: 'white' }}>
            <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>🎯 الأولوية الفورية</h3>
            <p style={{ textAlign: 'center', lineHeight: '1.8' }}>
              أفضل استثمار ROI اليوم: <strong>وكلاء الذكاء الاصطناعي</strong>
              <br />
              قابل للتطبيق فوراً • رواتب $200-280K • مخاطر تسليع منخفضة
            </p>
          </div>
        </div>
      )}

      {/* AI Tab */}
      {activeTab === 'ai' && (
        <div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h3 style={{ color: '#1a5276', marginBottom: '20px', textAlign: 'center' }}>تصنيف مجالات AI حسب القيمة المهنية</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={aiSubfields} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ecf0f1" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => [`${value}/10`, 'القيمة']} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {aiSubfields.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Bars */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h3 style={{ color: '#1a5276', marginBottom: '20px', textAlign: 'center' }}>التقييم التفصيلي</h3>
            {aiSubfields.map(skill => (
              <SkillBar key={skill.name} name={skill.name} value={skill.value} />
            ))}
          </div>

          {/* AI Skills List */}
          <div style={{ background: '#e8f8f5', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ color: '#27ae60', marginBottom: '16px' }}>🔧 المهارات الأساسية لوكلاء AI</h4>
            <ul style={{ lineHeight: '2', paddingRight: '20px' }}>
              <li>LangChain, LlamaIndex - أطر تنسيق النماذج</li>
              <li>تصميم أنظمة الوكلاء المتعددة</li>
              <li>هندسة RAG وقواعد البيانات المتجهة</li>
              <li>Model Context Protocol (MCP)</li>
            </ul>
          </div>
        </div>
      )}

      {/* Quantum Tab */}
      {activeTab === 'quantum' && (
        <div>
          {/* Quantum Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <StatCard title="حجم السوق 2035" value="$97B" color="#1a5276" />
            <StatCard title="وظائف 2030" value="250K" color="#27ae60" />
            <StatCard title="نسبة الطلب/العرض" value="3:1" color="#f39c12" />
          </div>

          {/* Timeline Table */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h3 style={{ color: '#1a5276', marginBottom: '20px', textAlign: 'center' }}>الجدول الزمني للاستثمار</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1a5276', color: 'white' }}>
                  <th style={{ padding: '12px', borderRadius: '8px 0 0 0' }}>الفترة</th>
                  <th style={{ padding: '12px', borderRadius: '0 8px 0 0' }}>التوصيات</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#e8f8f5' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>2025-2027</td>
                  <td style={{ padding: '12px' }}>تعلم الأساسيات، شهادة Qiskit، خوارزميات كمية</td>
                </tr>
                <tr style={{ background: '#fef9e7' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>2028-2030</td>
                  <td style={{ padding: '12px' }}>المهارات الكمية تصبح قيّمة على نطاق واسع</td>
                </tr>
                <tr style={{ background: '#ebf5fb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>2031-2035</td>
                  <td style={{ padding: '12px' }}>اعتماد تجاري كامل، متطلب أساسي</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Frameworks */}
          <div style={{ background: '#1a5276', borderRadius: '16px', padding: '20px', color: 'white' }}>
            <h4 style={{ marginBottom: '16px' }}>🛠️ الأطر الأساسية</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['IBM Qiskit', 'Google Cirq', 'Xanadu PennyLane'].map(fw => (
                <span key={fw} style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>{fw}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Tab */}
      {activeTab === 'blockchain' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            {/* Pie Chart */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#1a5276', marginBottom: '10px', textAlign: 'center', fontSize: '16px' }}>توزيع التخصصات</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={blockchainData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name}) => name}>
                    {blockchainData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Salary Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {blockchainData.map((item, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500' }}>{item.name}</span>
                  <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{item.salary}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <StatCard title="سوق RWA" value="$16T" subtitle="بحلول 2030" color="#2980b9" />
            <StatCard title="خسائر الاختراقات 2024" value="$2.2B" subtitle="فرصة للتدقيق الأمني" color="#e74c3c" />
          </div>
        </div>
      )}

      {/* Geographic Tab */}
      {activeTab === 'geo' && (
        <div>
          {/* Growth Chart */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h3 style={{ color: '#1a5276', marginBottom: '20px', textAlign: 'center' }}>معدل نمو التوظيف في AI (%)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={geoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ecf0f1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="growth" fill="#27ae60" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Region Cards */}
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #1a5276 0%, #2980b9 100%)', borderRadius: '16px', padding: '20px', color: 'white' }}>
              <h4>🇸🇦🇦🇪 منطقة الخليج</h4>
              <p style={{ marginTop: '8px', opacity: 0.9 }}>رواتب معفاة من الضرائب • SAR 300-400K لمهندسي AI</p>
              <p style={{ marginTop: '4px', opacity: 0.9 }}>$100B مشروع Transcendence • 700+ شركة Web3 في دبي</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', borderRadius: '16px', padding: '20px', color: 'white' }}>
              <h4>🇮🇳 الهند</h4>
              <p style={{ marginTop: '8px', opacity: 0.9 }}>أسرع نمو توظيف AI عالمياً (52%)</p>
              <p style={{ marginTop: '4px', opacity: 0.9 }}>2.3 مليون فرصة عمل AI بحلول 2027</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', borderRadius: '16px', padding: '20px', color: 'white' }}>
              <h4>🇨🇳 الصين</h4>
              <p style={{ marginTop: '8px', opacity: 0.9 }}>نظام بيئي مستقل • رقائق Huawei Ascend</p>
              <p style={{ marginTop: '4px', opacity: 0.9 }}>RISC-V • AI كفء الموارد</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
