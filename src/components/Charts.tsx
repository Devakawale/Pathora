import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'
import { trendData, skillData } from '../data/demo'
export function OpportunityChart() {
  return <div className="chart-wrap"><ResponsiveContainer width="100%" height={250}>
    <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
      <defs><linearGradient id="openingsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8B77D" stopOpacity={.35}/><stop offset="95%" stopColor="#E8B77D" stopOpacity={0}/></linearGradient></defs>
      <CartesianGrid stroke="#E4E1D8" strokeDasharray="3 4" vertical={false}/>
      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#777D78', fontSize: 12 }} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#777D78', fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#E4E1D8', fontSize: 12 }} />
      <Area type="monotone" dataKey="openings" name="Job openings" stroke="#243B35" strokeWidth={2.5} fill="url(#openingsFill)" />
      <Area type="monotone" dataKey="seekers" name="Active seekers" stroke="#D97768" strokeWidth={2} fill="transparent" />
    </AreaChart></ResponsiveContainer></div>
}
export function SkillDemandChart() {
  return <div className="chart-wrap"><ResponsiveContainer width="100%" height={240}>
    <BarChart data={skillData} layout="vertical" margin={{ top: 0, right: 16, left: 5, bottom: 0 }}>
      <CartesianGrid stroke="#E4E1D8" strokeDasharray="3 4" horizontal={false}/>
      <XAxis type="number" domain={[0,100]} axisLine={false} tickLine={false} tick={{ fill: '#777D78', fontSize: 11 }}/>
      <YAxis type="category" dataKey="skill" width={118} axisLine={false} tickLine={false} tick={{ fill: '#252A28', fontSize: 11 }}/>
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#E4E1D8', fontSize: 12 }}/>
      <Bar dataKey="demand" name="Demand index" fill="#243B35" radius={[0,5,5,0]} barSize={13}/>
    </BarChart></ResponsiveContainer></div>
}