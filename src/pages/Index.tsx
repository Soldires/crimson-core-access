
import { useAuth } from '@/hooks/useAuth';
import { Lock, Unlock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { hasProduct } = useAuth();
  const { toast } = useToast();

  const modules = [
    {
      id: "guia-instalacao",
      title: "Guia de Instalação",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Guia completo de instalação para todos os sistemas"
    },
    {
      id: "pack-sensis",
      title: "Pack de Sensis",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=300&fit=crop",
      description: "Configurações avançadas de sensibilidade"
    },
    {
      id: "pack-metodos",
      title: "Pack de Métodos",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      description: "Métodos profissionais de gaming e estratégias"
    },
    {
      id: "painel-xit",
      title: "Painel Xit Antiban",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Sistema avançado de proteção anti-ban"
    },
    {
      id: "verificado-ff",
      title: "Verificado Free Fire",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=300&fit=crop",
      description: "Ferramentas de melhoria verificadas para Free Fire"
    }
  ];

  const handleCardClick = (moduleId: string, userHasAccess: boolean) => {
    if (userHasAccess) {
      console.log(`Acessando módulo: ${moduleId}`);
      toast({
        title: "Acesso Liberado",
        description: `Acessando conteúdo do ${moduleId}...`,
      });
    } else {
      console.log(`Redirecionando para checkout: ${moduleId}`);
      toast({
        title: "Produto Não Adquirido",
        description: `Redirecionando para o checkout do ${moduleId}...`,
        variant: "destructive",
      });
      // Aqui você redirecionaria para o checkout
      // window.location.href = `/checkout/${moduleId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                <span className="text-red-500">CYBER</span>GAMING
              </h1>
              <p className="text-gray-400 text-sm mt-1">Hub Profissional de Gaming</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2">
              <p className="text-red-400 text-sm font-medium">ACESSO DE MEMBRO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bem-vindo à <span className="text-red-500">Zona Elite</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Acesse seus módulos premium de gaming e leve suas habilidades ao próximo nível
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const userHasAccess = hasProduct(module.id);
            
            return (
              <Card 
                key={module.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-900/80 border-2 ${
                  userHasAccess 
                    ? 'border-red-500/50 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/20' 
                    : 'border-gray-700/50 hover:border-gray-600'
                } backdrop-blur-sm overflow-hidden`}
                onClick={() => handleCardClick(module.id, userHasAccess)}
              >
                <div className="relative">
                  <img 
                    src={module.image}
                    alt={module.title}
                    className={`w-full h-48 object-cover transition-all duration-300 ${
                      userHasAccess ? 'group-hover:scale-110' : 'opacity-60 grayscale'
                    }`}
                  />
                  
                  {/* Access Status Overlay */}
                  <div className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm ${
                    userHasAccess 
                      ? 'bg-green-500/20 border border-green-400/50' 
                      : 'bg-red-500/20 border border-red-400/50'
                  }`}>
                    {userHasAccess ? (
                      <Unlock className="w-5 h-5 text-green-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-bold transition-colors ${
                      userHasAccess ? 'text-white group-hover:text-red-400' : 'text-gray-400'
                    }`}>
                      {module.title}
                    </h3>
                  </div>
                  
                  <p className={`text-sm leading-relaxed ${
                    userHasAccess ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {module.description}
                  </p>

                  {/* Status Badge */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      userHasAccess 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {userHasAccess ? 'DESBLOQUEADO' : 'BLOQUEADO'}
                    </span>
                    
                    {!userHasAccess && (
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                        Clique para adquirir
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900/50 border border-red-900/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              Precisa de Ajuda?
            </h3>
            <p className="text-gray-300 text-sm">
              Entre em contato com nossa equipe de suporte para assistência com acesso aos módulos ou questões técnicas.
            </p>
            <div className="mt-4">
              <span className="inline-block bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm font-medium">
                Suporte Premium 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
