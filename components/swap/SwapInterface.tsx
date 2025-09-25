"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ArrowUpDown, 
  Settings, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";
import { useWallet } from "@/lib/wallet-provider";

const SwapInterface = () => {
  const [isSwapping, setIsSwapping] = useState(false);
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('SOL');
  const [amount, setAmount] = useState('100');
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const { connected, publicKey } = useWallet();

  const tokens = [
    { symbol: 'USDT', name: 'Tether USD', balance: '2,847.32' },
    { symbol: 'SOL', name: 'Solana', balance: '12.45' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.0234' },
    { symbol: 'ETH', name: 'Ethereum', balance: '0.89' }
  ];

  const handleSwap = async () => {
    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }
    
    setIsSwapping(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      alert(`Swap successful: ${amount} ${fromToken} → ${(parseFloat(amount) * 0.0234).toFixed(4)} ${toToken}`);
    } catch (error) {
      console.error('Error during swap:', error);
    } finally {
      setIsSwapping(false);
    }
  };

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
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
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      {!connected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Wallet non connecté</h4>
            <p className="text-sm text-yellow-700">
              Veuillez connecter votre wallet pour effectuer des swaps.
            </p>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-xl p-4 mb-6"
        >
          <h4 className="font-medium text-gray-900 mb-4">Paramètres de Swap</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slippage (%)
              </label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSlippage('0.1')}
                  className={`px-3 py-1 rounded-lg text-sm ${slippage === '0.1' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  0.1%
                </button>
                <button 
                  onClick={() => setSlippage('0.5')}
                  className={`px-3 py-1 rounded-lg text-sm ${slippage === '0.5' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  0.5%
                </button>
                <button 
                  onClick={() => setSlippage('1.0')}
                  className={`px-3 py-1 rounded-lg text-sm ${slippage === '1.0' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  1.0%
                </button>
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-full px-3 py-1 border border-gray-200 rounded-lg text-sm"
                    step="0.1"
                    min="0.1"
                    max="5"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Commission IKABAY: 10%</span>
              </div>
              <div className="text-sm text-gray-600">
                Wallet: {publicKey ? `${publicKey.toString().substring(0, 4)}...${publicKey.toString().substring(publicKey.toString().length - 4)}` : 'Non connecté'}
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
              ~{(parseFloat(amount || '0') * 0.0234).toFixed(4)}
            </div>
          </div>
        </div>

        {/* Commission Info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Commission IKABAY</h4>
              <p className="text-sm text-blue-700">
                Une commission de 10% sera automatiquement envoyée vers notre wallet TRC20.
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Wallet: TWDiBSMEgsDHVRwEcFNiPVWZVPjXGZ9JiE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSwap}
        disabled={isSwapping || !amount || parseFloat(amount) <= 0 || !connected}
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

      {/* Rate Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        1 {fromToken} ≈ {fromToken === 'USDT' ? '0.0234' : fromToken === 'SOL' ? '42.74' : fromToken === 'BTC' ? '43478' : '0.00023'} {toToken}
      </div>
    </motion.div>
  );
};

export default SwapInterface;