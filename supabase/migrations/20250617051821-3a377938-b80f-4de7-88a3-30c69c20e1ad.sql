
-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  login_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  product_key TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de produtos adquiridos pelos usuários
CREATE TABLE public.user_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_key TEXT NOT NULL,
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_key)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para products (público para leitura)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Políticas RLS para user_products
CREATE POLICY "Users can view own products" ON public.user_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products" ON public.user_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Inserir os produtos padrão
INSERT INTO public.products (product_key, name, description) VALUES
  ('guia-instalacao', 'Guia de Instalação', 'Guia completo de instalação para todos os sistemas'),
  ('pack-sensis', 'Pack de Sensis', 'Configurações avançadas de sensibilidade'),
  ('pack-metodos', 'Pack de Métodos', 'Métodos profissionais de gaming e estratégias'),
  ('painel-xit', 'Painel Xit Antiban', 'Sistema avançado de proteção anti-ban'),
  ('verificado-ff', 'Verificado Free Fire', 'Ferramentas de melhoria verificadas para Free Fire');

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, login_expires_at)
  VALUES (
    NEW.id,
    NEW.email,
    NOW() + INTERVAL '30 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
