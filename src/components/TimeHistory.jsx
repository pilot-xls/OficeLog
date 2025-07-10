
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Download, Trash2, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TimeHistory = ({ entries, onDeleteEntry, onExportData }) => {
  const { toast } = useToast();

  const handleDelete = (id) => {
    onDeleteEntry(id);
    toast({
      title: "Registo eliminado",
      description: "O registo foi removido com sucesso.",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 gradient-text">
              <History className="w-6 h-6" />
              Histórico de Registos
            </CardTitle>
            {entries.length > 0 && (
              <Button
                onClick={onExportData}
                className="export-button"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto text-white/30 mb-4" />
              <p className="text-white/60 text-lg">Ainda não há registos</p>
              <p className="text-white/40 text-sm">Adiciona o teu primeiro registo de horas acima</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sortedEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="time-card group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-semibold text-lg">
                          {entry.hours}h
                        </span>
                        <span className="text-white/60 text-sm">
                          {formatDate(entry.date)}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TimeHistory;
