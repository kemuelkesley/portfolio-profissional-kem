import React, { useState, useCallback } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FormStatus } from '../types';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!formData.email.trim()) {
      newErrors.email = "O email é obrigatório.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Por favor, insira um email válido.";
    }
    if (!formData.message.trim()) newErrors.message = "A mensagem não pode estar vazia.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus(FormStatus.SUBMITTING);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus(FormStatus.SUCCESS);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after showing success message
      setTimeout(() => setStatus(FormStatus.IDLE), 5000);
    } catch (error) {
      setStatus(FormStatus.ERROR);
    }
  }, [formData]);

  return (
    <div className="w-full max-w-2xl mx-auto relative z-10">
      {/* Glassmorphism Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-2xl font-display font-bold text-white mb-2">Vamos trabalhar juntos?</h3>
        <p className="text-gray-400 mb-8">Preencha o formulário abaixo para discutir projetos ou oportunidades.</p>

        {status === FormStatus.SUCCESS ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h4>
            <p className="text-gray-400 text-center">Obrigado pelo contato. Responderei o mais breve possível.</p>
            <button 
              onClick={() => setStatus(FormStatus.IDLE)}
              className="mt-6 text-vivid-purple hover:text-white transition-colors underline"
            >
              Enviar nova mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Nome Completo</label>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-gray-900/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vivid-purple focus:border-transparent transition-all duration-300`}
                    placeholder="Seu nome"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-vivid-purple to-vivid-pink opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                </div>
                {errors.name && <p className="text-xs text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={12} /> {errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Profissional</label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-gray-900/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vivid-cyan focus:border-transparent transition-all duration-300`}
                    placeholder="exemplo@empresa.com"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-vivid-cyan to-vivid-blue opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                </div>
                 {errors.email && <p className="text-xs text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={12} /> {errors.email}</p>}
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Assunto <span className="text-gray-500 text-xs">(Opcional)</span></label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vivid-pink focus:border-transparent transition-all duration-300"
                placeholder="Proposta de projeto, Freelance..."
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Mensagem</label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-gray-900/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vivid-purple focus:border-transparent transition-all duration-300 resize-none`}
                  placeholder="Olá, gostaria de saber mais sobre..."
                />
              </div>
               {errors.message && <p className="text-xs text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={12} /> {errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === FormStatus.SUBMITTING}
              className="w-full py-4 bg-gradient-to-r from-vivid-purple via-fuchsia-500 to-vivid-pink rounded-lg font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === FormStatus.SUBMITTING ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  Enviar Mensagem <Send className="w-5 h-5" />
                </>
              )}
            </button>
            
            {status === FormStatus.ERROR && (
               <p className="text-center text-red-400 text-sm animate-fade-in">Ocorreu um erro ao enviar. Tente novamente.</p>
            )}
          </form>
        )}
      </div>
      
      {/* Decorative Elements behind form */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-vivid-purple/30 rounded-full blur-3xl -z-10 animate-blob" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-vivid-cyan/30 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />
    </div>
  );
};

export default ContactForm;