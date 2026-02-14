import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Database, Shield, Zap } from 'lucide-react';

// Mensagens de engenharia social para diferentes contextos
const loadingMessages = {
  default: [
    'Processando requisição...',
    'Carregando dados...',
    'Preparando visualização...',
    'Quase pronto...',
    'Finalizando...',
  ],
  auth: [
    'Validando credenciais...',
    'Verificando permissões...',
    'Estabelecendo sessão segura...',
    'Autenticando usuário...',
    'Sincronizando dados...',
  ],
  data: [
    'Consultando banco de dados...',
    'Processando registros...',
    'Agregando métricas...',
    'Calculando estatísticas...',
    'Preparando relatório...',
  ],
  save: [
    'Validando campos...',
    'Preparando dados...',
    'Salvando alterações...',
    'Sincronizando com servidor...',
    'Confirmando gravação...',
  ],
};

type LoadingContext = keyof typeof loadingMessages;

interface LoadingModalProps {
  open: boolean;
  context?: LoadingContext;
  customMessage?: string;
}

export function LoadingModal({
  open,
  context = 'default',
  customMessage,
}: LoadingModalProps) {
  const [messageIndex, setMessageIndex] = React.useState(0);
  const messages = loadingMessages[context] || loadingMessages.default;

  React.useEffect(() => {
    if (!open) {
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [open, messages.length]);

  const getIcon = () => {
    switch (context) {
      case 'auth':
        return <Shield className="h-6 w-6" />;
      case 'data':
        return <Database className="h-6 w-6" />;
      case 'save':
        return <Zap className="h-6 w-6" />;
      default:
        return <Loader2 className="h-6 w-6" />;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-2xl min-w-[300px]"
          >
            {/* Animated Icon */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                {getIcon()}
              </motion.div>

              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            </div>

            {/* Message */}
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={customMessage || messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {customMessage || messages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Animated dots */}
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}