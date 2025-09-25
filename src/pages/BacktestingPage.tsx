import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TestTube, 
  Play, 
  Settings, 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  DollarSign,
  Target,
  Download,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const BacktestingPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('1');
  const [timeframe, setTimeframe] = useState('1d');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [initialCapital, setInitialCapital] = useState(10000);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    document.title = 'Backtesting - IKABAY CARAÏBEEN';
  }, []);

  const strategies = [
    {
      id: '1',
      name: 'Moving Average Crossover',
      description: 'Stratégie basée sur le croisement des moyennes mobiles (MA) courtes et longues',
      parameters: [
        { name: 'shortMA', label: 'MA Courte', value: 9, min: 2, max: 50 },
        { name: 'longMA', label: 'MA Longue', value: 21, min: 5, max: 200 }
      ]
    },
    {
      id: '2',
      name: 'RSI Overbought/Oversold',
      description: 'Stratégie basée sur les conditions de surachat et survente du RSI',
      parameters: [
        { name: 'rsiPeriod', label: 'Période RSI', value: 14, min: 2, max: 30 },
        { name: 'overbought', label: 'Surachat', value: 70, min: 50, max: 90 },
        { name: 'oversold', label: 'Survente', value: 30, min: 10, max: 50 }
      ]
    },
    {
      id: '3',
      name: 'MACD Divergence',
      description: 'Stratégie basée sur les divergences du MACD et de la ligne de signal',
      parameters: [
        { name: 'fastEMA', label: 'EMA Rapide', value: 12, min: 5, max: 30 },
        { name: 'slowEMA', label: 'EMA Lente', value: 26, min: 10, max: 50 },
        { name: 'signalPeriod', label: 'Période Signal', value: 9, min: 2, max: 20 }
      ]
    },
    {
      id: '4',
      name: 'Bollinger Bands Breakout',
      description: 'Stratégie basée sur les cassures des bandes de Bollinger',
      parameters: [
        { name: 'period', label: 'Période', value: 20, min: 10, max: 50 },
        { name: 'stdDev', label: 'Écart-type', value: 2, min: 1, max: 4, step: 0.1 }
      ]
    }
  ];

  const timeframes = [
    { id: '15m', name: '15 minutes' },
    { id: '1h', name: '1 heure' },
    { id: '4h', name: '4 heures' },
    { id: '1d', name: '1 jour' },
    { id: '1w', name: '1 semaine' }
  ];

  const pairs = [
    { id: 'BTC/USDT', name: 'BTC/USDT' },
    { id: 'ETH/USDT', name: 'ETH/USDT' },
    { id: 'SOL/USDT', name: 'SOL/USDT' },
    { id: 'ADA/USDT', name: 'ADA/USDT' },
    { id: 'BNB/USDT', name: 'BNB/USDT' }
  ];

  const selectedStrategyData = strategies.find(s => s.id === selectedStrategy);

  const runBacktest = () => {
    setIsRunning(true);
    
    // Simulation d'un backtest
    setTimeout(() => {
      setResults({
        totalTrades: 124,
        winningTrades: 87,
        losingTrades: 37,
        winRate: 70.16,
        profitFactor: 2.34,
        netProfit: 4567.89,
        netProfitPercent: 45.68,
        maxDrawdown: 12.34,
        sharpeRatio: 1.87,
        averageWin: 123.45,
        averageLoss: 52.67,
        largestWin: 567.89,
        largestLoss: 234.56,
        trades: [
          { date: '2023-02-15', type: 'BUY', entry: 24500, exit: 26780, profit: 9.31, duration: '3d 4h' },
          { date: '2023-03-10', type: 'SELL', entry: 27800, exit: 25400, profit: 8.63, duration: '2d 7h' },
          { date: '2023-04-05', type: 'BUY', entry: 26100, exit: 28900, profit: 10.73, duration: '5d 2h' },
          { date: '2023-05-20', type: 'BUY', entry: 29200, exit: 27800, profit: -4.79, duration: '1d 8h' },
          { date: '2023-06-12', type: 'SELL', entry: 30500, exit: 28100, profit: 7.87, duration: '3d 12h' }
        ],
        equity: [10000, 10450, 11200, 10900, 11500, 12300, 11800, 12700, 13400, 14100, 14568],
        dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      });
      setIsRunning(false);
    }, 2000);
  };

  const saveStrategy = () => {
    // Simulation de sauvegarde
    console.log('Stratégie sauvegardée');
  };

  const exportResults = () => {
    // Simulation d'export
    console.log('Résultats exportés');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Backtesting
              </h1>
              <p className="text-gray-600">
                Testez vos stratégies de trading sur des données historiques
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveStrategy}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runBacktest}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-caribbean-gradient text-white rounded-xl hover:shadow-caribbean transition-all duration-300 disabled:opacity-50"
              >
                {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Exécution...' : 'Lancer Backtest'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Strategy Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <TestTube className="w-5 h-5 mr-2 text-caribbean-600" />
                Stratégie
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner une stratégie
                  </label>
                  <select
                    value={selectedStrategy}
                    onChange={(e) => setSelectedStrategy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  >
                    {strategies.map((strategy) => (
                      <option key={strategy.id} value={strategy.id}>
                        {strategy.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedStrategyData && (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">{selectedStrategyData.description}</p>
                    
                    <div className="space-y-3">
                      {selectedStrategyData.parameters.map((param) => (
                        <div key={param.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {param.label} ({param.value})
                          </label>
                          <input
                            type="range"
                            min={param.min}
                            max={param.max}
                            step={param.step || 1}
                            value={param.value}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{param.min}</span>
                            <span>{param.max}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Backtest Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                Paramètres
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paire
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  >
                    {pairs.map((pair) => (
                      <option key={pair.id} value={pair.id}>
                        {pair.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeframe
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  >
                    {timeframes.map((tf) => (
                      <option key={tf.id} value={tf.id}>
                        {tf.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capital Initial (€)
                  </label>
                  <input
                    type="number"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-600" />
                Paramètres Avancés
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Frais de Trading</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue="0.1"
                      step="0.01"
                      min="0"
                      max="1"
                      className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Slippage</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue="0.05"
                      step="0.01"
                      min="0"
                      max="1"
                      className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Taille Position</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue="10"
                      step="1"
                      min="1"
                      max="100"
                      className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Stop Loss</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue="5"
                      step="0.5"
                      min="0.5"
                      max="20"
                      className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Take Profit</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue="10"
                      step="0.5"
                      min="0.5"
                      max="50"
                      className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {!results ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
                <TestTube className="w-16 h-16 text-caribbean-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Tester Votre Stratégie</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Configurez votre stratégie et lancez le backtest pour voir comment elle aurait performé sur des données historiques.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={runBacktest}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-6 py-3 bg-caribbean-gradient text-white rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 mx-auto disabled:opacity-50"
                >
                  {isRunning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                  <span>{isRunning ? 'Exécution...' : 'Lancer Backtest'}</span>
                </motion.button>
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Résultats du Backtest</h3>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={exportResults}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Exporter</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Profit Net</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-green-600">€{results.netProfit.toFixed(2)}</span>
                        <span className="text-sm text-green-600">({results.netProfitPercent.toFixed(2)}%)</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                      <p className="text-xl font-bold text-blue-600">{results.winRate.toFixed(2)}%</p>
                      <p className="text-xs text-gray-500">{results.winningTrades}/{results.totalTrades} trades</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Profit Factor</p>
                      <p className="text-xl font-bold text-purple-600">{results.profitFactor.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Max Drawdown</p>
                      <p className="text-xl font-bold text-red-600">-{results.maxDrawdown.toFixed(2)}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Sharpe Ratio</p>
                      <p className="font-bold text-gray-900">{results.sharpeRatio.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Gain Moyen</p>
                      <p className="font-bold text-green-600">€{results.averageWin.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Perte Moyenne</p>
                      <p className="font-bold text-red-600">-€{results.averageLoss.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Trades</p>
                      <p className="font-bold text-gray-900">{results.totalTrades}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Equity Curve */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Courbe d'Équité</h3>
                  
                  {/* Simplified Chart Visualization */}
                  <div className="h-64 flex items-end space-x-2 p-4 bg-gray-50 rounded-xl">
                    {results.equity.map((value: number, index: number) => (
                      <div
                        key={index}
                        className="flex-1 bg-caribbean-gradient rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ 
                          height: `${(value / Math.max(...results.equity)) * 100}%`,
                          minHeight: '20px'
                        }}
                        title={`${results.dates[index]}: €${value.toLocaleString()}`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 mt-4">
                    {results.dates.map((date: string, index: number) => (
                      index % 3 === 0 && <span key={index}>{date}</span>
                    ))}
                  </div>
                </motion.div>

                {/* Trade List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Liste des Trades</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Entrée</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Sortie</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Profit</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.trades.map((trade: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{trade.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                trade.type === 'BUY' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {trade.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-700">${trade.entry.toLocaleString()}</td>
                            <td className="py-3 px-4 text-gray-700">${trade.exit.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className={`font-medium ${
                                trade.profit >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {trade.profit >= 0 ? '+' : ''}{trade.profit}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-700">{trade.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BacktestingPage;