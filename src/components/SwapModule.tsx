import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowUpDown, 
  Settings, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface SwapModuleProps {
  className?: string;
}

const SwapModule: React.FC<SwapModuleProps> = ({ className = '' }) => {
  const [isSwapping, setIsSwapping] = useState(false);
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('SOL');
  const [amount, setAmount] = useState('100');
  const [slippage, setSlippage] = useState('0.5');

  const tokens = [
    { symbol: 'USDT', name: 'Tether USD', balance: '2,847.32' },
    { symbol: 'SOL', name: 'Solana', balance: '12.45' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.0234' },
    { symbol: 'ETH', name: 'Ethereum', balance: '0.89' }
  ];

  const handleSwap = async () => {
    setIsSwapping(true);
    
    try {
      // Appel à l'API de swap
      const response = await fetch('/api/swap', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromToken,
          toToken,
          amount: parseFloat(amount),
          slippage: parseFloat(slippage)
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Afficher une notification de succès
        console.log('Swap réussi:', result);
      } else {
        // Afficher une erreur
        console.error('Erreur de swap:', result.error);
      }
    } catch (error) {
      console.error('Erreur lors du swap:', error);
    } finally {
      setIsSwapping(false);
    }
  };

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const recentSwaps = [
    {
      id: 1,
      from: 'USDT',
      to: 'SOL',
      amount: '100 USDT → 2.34 SOL',
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: 2,
      from: 'SOL',
      to: 'USDT',
      amount: '1.5 SOL → 64.20 USDT',
      time: '2h ago',
      status: 'completed'
    },
    {
      id: 3,
      from: 'USDT',
      to: 'BTC',
      amount: '500 USDT → 0.0115 BTC',
      time: '1d ago',
      status: 'completed'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Swap Automatique</h3>
            <p className="text-sm text-gray-500">Échanges via Jupiter API</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Swap Interface */}
      <div className="space-y-4 mb-6">
        {/* From Token */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">De</label>
            <span className="text-sm text-gray-500">
              Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium"
            >
              {tokens.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-right text-xl font-semibold outline-none"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={swapTokens}
            className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <ArrowUpDown className="w-5 h-5" />
          </motion.button>
        </div>

        {/* To Token */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Vers</label>
            <span className="text-sm text-gray-500">
              Balance: {tokens.find(t => t.symbol === toToken)?.balance}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium"
            >
              {tokens.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <div className="flex-1 text-right text-xl font-semibold text-gray-400">
              ~{(parseFloat(amount) * 0.0234).toFixed(4)}
            </div>
          </div>
        </div>

        {/* Slippage Settings */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Slippage Tolerance:</span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-16 px-2 py-1 border border-gray-200 rounded text-center"
              step="0.1"
              min="0.1"
              max="5"
            />
            <span className="text-gray-500">%</span>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSwap}
        disabled={isSwapping || !amount || parseFloat(amount) <= 0}
        className="w-full bg-purple-gradient text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
      >
        {isSwapping ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Swap en cours...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>Effectuer le Swap</span>
          </>
        )}
      </motion.button>

      {/* Recent Swaps */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Swaps Récents</h4>
        <div className="space-y-3">
          {recentSwaps.map((swap) => (
            <div key={swap.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ArrowUpDown className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{swap.amount}</p>
                  <p className="text-xs text-gray-500">{swap.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">Réussi</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-lg font-bold text-purple-600">47</span>
          </div>
          <p className="text-xs text-purple-600">Swaps ce mois</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-600">99.2%</span>
          </div>
          <p className="text-xs text-green-600">Taux de réussite</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SwapModule;