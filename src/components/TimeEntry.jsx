
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TimeEntry = ({ onAddEntry }) => {
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!hours || !description) {
      toast({
        title: "Erro",
        description: "Por favor, preenche todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insere um número válido de horas.",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: Date.now(),
      hours: hoursNum,
      description,
      date,
      timestamp: new Date().toISOString()
    };

    onAddEntry(entry);
    
    // Reset form
    setHours('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);

    toast({
      title: "Sucesso!",
      description: "Registo de horas adicionado com sucesso.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Clock className="w-6 h-6" />
            Registar Horas de Trabalho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-white">Horas Trabalhadas *</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="Ex: 8.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Descrição do Trabalho *</Label>
              <Textarea
                id="description"
                placeholder="Descreve o trabalho realizado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Registo
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TimeEntry;
