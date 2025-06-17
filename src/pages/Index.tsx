
import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // Mock user data - in real implementation, this would come from Supabase
  const [userAccess] = useState({
    "guia-instalacao": true,
    "pack-sensis": false,
    "pack-metodos": true,
    "painel-xit": false,
    "verificado-ff": false
  });

  const modules = [
    {
      id: "guia-instalacao",
      title: "Guia de Instalação",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Complete installation guide for all systems"
    },
    {
      id: "pack-sensis",
      title: "Pack de Sensis",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=300&fit=crop",
      description: "Advanced sensitivity configurations"
    },
    {
      id: "pack-metodos",
      title: "Pack de Métodos",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      description: "Professional gaming methods and strategies"
    },
    {
      id: "painel-xit",
      title: "Painel Xit Antiban",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Advanced anti-ban protection system"
    },
    {
      id: "verificado-ff",
      title: "Verificado Free Fire",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=300&fit=crop",
      description: "Verified Free Fire enhancement tools"
    }
  ];

  const handleCardClick = (moduleId: string, hasAccess: boolean) => {
    if (hasAccess) {
      // In real implementation, navigate to module content
      console.log(`Accessing module: ${moduleId}`);
      alert(`Accessing ${moduleId} content...`);
    } else {
      // In real implementation, redirect to checkout
      console.log(`Redirecting to checkout for: ${moduleId}`);
      alert(`Redirecting to checkout for ${moduleId}...`);
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
              <p className="text-gray-400 text-sm mt-1">Professional Gaming Hub</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2">
              <p className="text-red-400 text-sm font-medium">MEMBER ACCESS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to the <span className="text-red-500">Elite Zone</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Access your premium gaming modules and take your skills to the next level
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const hasAccess = userAccess[module.id as keyof typeof userAccess];
            
            return (
              <Card 
                key={module.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-900/80 border-2 ${
                  hasAccess 
                    ? 'border-red-500/50 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/20' 
                    : 'border-gray-700/50 hover:border-gray-600'
                } backdrop-blur-sm overflow-hidden`}
                onClick={() => handleCardClick(module.id, hasAccess)}
              >
                <div className="relative">
                  <img 
                    src={module.image}
                    alt={module.title}
                    className={`w-full h-48 object-cover transition-all duration-300 ${
                      hasAccess ? 'group-hover:scale-110' : 'opacity-60 grayscale'
                    }`}
                  />
                  
                  {/* Access Status Overlay */}
                  <div className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm ${
                    hasAccess 
                      ? 'bg-green-500/20 border border-green-400/50' 
                      : 'bg-red-500/20 border border-red-400/50'
                  }`}>
                    {hasAccess ? (
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
                      hasAccess ? 'text-white group-hover:text-red-400' : 'text-gray-400'
                    }`}>
                      {module.title}
                    </h3>
                  </div>
                  
                  <p className={`text-sm leading-relaxed ${
                    hasAccess ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {module.description}
                  </p>

                  {/* Status Badge */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hasAccess 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {hasAccess ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                    
                    {!hasAccess && (
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                        Click to purchase
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
              Need Help?
            </h3>
            <p className="text-gray-300 text-sm">
              Contact our support team for assistance with module access or technical issues.
            </p>
            <div className="mt-4">
              <span className="inline-block bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm font-medium">
                24/7 Premium Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
