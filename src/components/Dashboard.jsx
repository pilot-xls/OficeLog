
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Clock, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = ({ entries }) => {
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalDays = new Set(entries.map(entry => entry.date)).size;
  const averageHoursPerDay = totalDays > 0 ? (totalHours / totalDays).toFixed(1) : 0;
  const thisWeekHours = entries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return entryDate >= weekAgo && entryDate <= today;
    })
    .reduce((sum, entry) => sum + entry.hours, 0);

  const stats = [
    {
      title: "Total de Horas",
      value: totalHours.toFixed(1),
      icon: Clock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Dias Trabalhados",
      value: totalDays,
      icon: Calendar,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Média por Dia",
      value: averageHoursPerDay,
      icon: BarChart3,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Esta Semana",
      value: thisWeekHours.toFixed(1),
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-effect border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stat.value}
                {stat.title.includes('Horas') && <span className="text-sm text-white/60 ml-1">h</span>}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Dashboard;
