import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import AssistantGPT from './components/AssistantGPT';
import ZendropCart from './components/ZendropCart';
import SecurityMonitor from './components/security/SecurityMonitor';
import { monitoring } from './utils/monitoring';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/HomePage'));
const Boutique = lazy(() => import('./pages/BoutiquePage'));
const Dashboard = lazy(() => import('./pages/DashboardPage'));
const Actualites = lazy(() => import('./pages/ActualitesPage'));
const Emplois = lazy(() => import('./pages/EmploisPage'));
const Jeux = lazy(() => import('./pages/JeuxPage'));
const Analytics = lazy(() => import('./pages/AnalyticsPage'));
const Communaute = lazy(() => import('./pages/CommunautePage'));
const Formation = lazy(() => import('./pages/FormationPage'));
const Partenaires = lazy(() => import('./pages/PartenairesPage'));
const Login = lazy(() => import('./pages/LoginPage'));

// Nouveaux onglets Trading
const Trading = lazy(() => import('./pages/TradingPage'));
const Swap = lazy(() => import('./pages/SwapPage'));
const Portfolio = lazy(() => import('./pages/PortfolioPage'));
const Signals = lazy(() => import('./pages/SignalsPage'));
const CopyTrading = lazy(() => import('./pages/CopyTradingPage'));
const Backtesting = lazy(() => import('./pages/BacktestingPage'));
const Admin = lazy(() => import('./pages/AdminPage'));

// Zendrop Page
const Zendrop = lazy(() => import('./pages/ZendropPage'));

// Admin components
const ApiDocumentation = lazy(() => import('./components/admin/ApiDocumentation'));
const RoleManagement = lazy(() => import('./components/admin/RoleManagement'));
const SystemMonitor = lazy(() => import('./components/admin/SystemMonitor'));
const ExtensionMarketplace = lazy(() => import('./components/admin/ExtensionMarketplace'));

function App() {
  useEffect(() => {
    // Log page view for monitoring
    const logPageView = () => {
      monitoring.logEvent('page_view', {
        path: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date()
      });
    };
    
    // Log initial page view
    logPageView();
    
    // Set up navigation listener
    const handleNavigation = () => {
      logPageView();
    };
    
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/emplois" element={<Emplois />} />
            <Route path="/jeux" element={<Jeux />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/communaute" element={<Communaute />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/login" element={<Login />} />
            
            {/* Onglets Trading */}
            <Route path="/trading" element={<Trading />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/copy-trading" element={<CopyTrading />} />
            <Route path="/backtesting" element={<Backtesting />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/api-docs" element={<ApiDocumentation />} />
            <Route path="/admin/roles" element={<RoleManagement />} />
            <Route path="/admin/system" element={<SystemMonitor />} />
            <Route path="/admin/extensions" element={<ExtensionMarketplace />} />
            
            {/* Zendrop Page */}
            <Route path="/zendrop" element={<Zendrop />} />
          </Routes>
        </Suspense>
        
        {/* Assistant GPT flottant */}
        <AssistantGPT />
        
        {/* Panier Zendrop */}
        <ZendropCart marginPercentage={30} />
        
        {/* Security Monitor */}
        <SecurityMonitor />
      </Layout>
    </Router>
  );
}

export default App;