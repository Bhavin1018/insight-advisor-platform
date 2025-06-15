
-- Create user profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'UTC',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  file_name TEXT,
  total_value DECIMAL(15,2) DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  risk_tolerance TEXT CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  investment_goals JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create portfolio_holdings table
CREATE TABLE public.portfolio_holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  company_name TEXT,
  quantity DECIMAL(15,6) NOT NULL DEFAULT 0,
  purchase_price DECIMAL(10,2),
  purchase_date DATE,
  current_price DECIMAL(10,2),
  sector TEXT,
  market_cap BIGINT,
  allocation_percentage DECIMAL(5,2),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create analysis_sessions table
CREATE TABLE public.analysis_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN ('quick', 'comprehensive', 'custom')),
  models_selected TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'error')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  config JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  PRIMARY KEY (id)
);

-- Create analysis_results table
CREATE TABLE public.analysis_results (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.analysis_sessions(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  model_version TEXT DEFAULT '1.0',
  results JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '{}',
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  risk_assessment JSONB DEFAULT '{}',
  execution_time_ms INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create market_data table for caching
CREATE TABLE public.market_data (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  data_type TEXT NOT NULL CHECK (data_type IN ('price', 'fundamentals', 'economic_indicator')),
  data JSONB NOT NULL DEFAULT '{}',
  source TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id),
  UNIQUE(symbol, data_type, source)
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for portfolios
CREATE POLICY "Users can view their own portfolios" 
  ON public.portfolios FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolios" 
  ON public.portfolios FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios" 
  ON public.portfolios FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolios" 
  ON public.portfolios FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for portfolio_holdings
CREATE POLICY "Users can view holdings of their portfolios" 
  ON public.portfolio_holdings FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can create holdings for their portfolios" 
  ON public.portfolio_holdings FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can update holdings of their portfolios" 
  ON public.portfolio_holdings FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can delete holdings of their portfolios" 
  ON public.portfolio_holdings FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM public.portfolios WHERE id = portfolio_id));

-- Create RLS policies for analysis_sessions
CREATE POLICY "Users can view their own analysis sessions" 
  ON public.analysis_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analysis sessions" 
  ON public.analysis_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analysis sessions" 
  ON public.analysis_sessions FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis sessions" 
  ON public.analysis_sessions FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for analysis_results
CREATE POLICY "Users can view results of their analysis sessions" 
  ON public.analysis_results FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM public.analysis_sessions WHERE id = session_id));

CREATE POLICY "System can insert analysis results" 
  ON public.analysis_results FOR INSERT 
  WITH CHECK (true); -- Edge functions will handle this

-- Create RLS policies for market_data (public read access for caching)
CREATE POLICY "Anyone can view market data" 
  ON public.market_data FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "System can manage market data" 
  ON public.market_data FOR ALL 
  USING (true); -- Edge functions will handle this

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_portfolio_holdings_portfolio_id ON public.portfolio_holdings(portfolio_id);
CREATE INDEX idx_portfolio_holdings_symbol ON public.portfolio_holdings(symbol);
CREATE INDEX idx_analysis_sessions_user_id ON public.analysis_sessions(user_id);
CREATE INDEX idx_analysis_sessions_portfolio_id ON public.analysis_sessions(portfolio_id);
CREATE INDEX idx_analysis_results_session_id ON public.analysis_results(session_id);
CREATE INDEX idx_market_data_symbol_type ON public.market_data(symbol, data_type);
CREATE INDEX idx_market_data_expires_at ON public.market_data(expires_at);
