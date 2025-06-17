
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Clock, Package } from 'lucide-react';

export const AppSidebar = () => {
  const { profile, userProducts, signOut, getTimeUntilExpiry } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    signOut();
  };

  return (
    <>
      <Sidebar className="bg-gray-900 border-r border-red-900/30">
        <SidebarHeader className="p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">
              <span className="text-red-500">CYBER</span>GAMING
            </h2>
            <p className="text-gray-400 text-sm">Área de Membros</p>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4">
          {/* User Info Card */}
          <div className="bg-gray-800/50 border border-red-900/30 rounded-lg p-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-red-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-white truncate">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Expira em</p>
                  <p className="text-sm text-white">{getTimeUntilExpiry()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-red-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Produtos</p>
                  <p className="text-sm text-white">{userProducts.length} adquirido(s)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products List */}
          {userProducts.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Seus Produtos</h3>
              <div className="space-y-1">
                {userProducts.map((product) => (
                  <div
                    key={product.product_key}
                    className="text-xs text-gray-300 bg-green-500/10 border border-green-500/20 rounded px-2 py-1"
                  >
                    {product.product_key}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SidebarContent>

        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setShowLogoutModal(true)}
                className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="bg-gray-900 border-red-900/30 text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Saída</DialogTitle>
            <DialogDescription className="text-gray-400">
              Você deseja mesmo sair da área de membros?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
