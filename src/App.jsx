
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import TimeEntry from '@/components/TimeEntry';
import Dashboard from '@/components/Dashboard';
import TimeHistory from '@/components/TimeHistory';
import { Timer } from 'lucide-react';

function App() {
  const [entries, setEntries] = useState([]);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('timeEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries(prev => [...prev, entry]);
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const exportData = () => {
    if (entries.length === 0) {
      toast({
        title: "Sem dados",
        description: "Não há registos para exportar.",
        variant: "destructive"
      });
      return;
    }

    const csvContent = [
      ['Data', 'Horas', 'Descrição'],
      ...entries.map(entry => [
        new Date(entry.date).toLocaleDateString('pt-PT'),
        entry.hours,
        `"${entry.description.replace(/"/g, '""')}"`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registo_horas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Exportação concluída!",
      description: "Os dados foram exportados com sucesso.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Sistema de Registo de Horas - Controla o teu Tempo</title>
        <meta name="description" content="Sistema simples e eficiente para registar horas de trabalho com dashboard completo e exportação de dados." />
      </Helmet>
      
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Registo de Horas
              </h1>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Controla o teu tempo de trabalho de forma simples e eficiente
            </p>
          </motion.div>

          {/* Dashboard */}
          <Dashboard entries={entries} />

          {/* Time Entry Form */}
          <div className="mb-8">
            <TimeEntry onAddEntry={addEntry} />
          </div>

          {/* Time History */}
          <TimeHistory 
            entries={entries} 
            onDeleteEntry={deleteEntry}
            onExportData={exportData}
          />
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default App;
