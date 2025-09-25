import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  ArrowRight, 
  Wallet, 
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react";

const WithdrawPanel = () => {
  const [amount, setAmount] = useState<number>(0);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // TRC20 address from environment variable
  const trc20Address = process.env.NEXT_PUBLIC_TRC20_ADDRESS || "TWDiBSMEgsDHVRwEcFNiPVWZVPjXGZ9JiE";
  
  // Simulated available balance
  const availableBalance = 247.89;

  const handleWithdraw = async () => {
    // Reset states
    setError(null);
    setWithdrawSuccess(false);
    
    // Validate amount
    if (!amount || amount <= 0) {
      setError("Veuillez entrer un montant valide");
      return;
    }
    
    if (amount > availableBalance) {
      setError("Montant supérieur au solde disponible");
      return;
    }
    
    // Simulate withdrawal process
    setIsWithdrawing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful withdrawal
      setWithdrawSuccess(true);
      setAmount(0);
    } catch (err) {
      setError("Une erreur est survenue lors du retrait");
      console.error("Withdrawal error:", err);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleMaxAmount = () => {
    setAmount(availableBalance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <Wallet className="w-5 h-5 mr-2 text-orange-600" />
        Retirer vos Gains
      </h3>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Solde disponible</span>
          <span className="font-bold text-gray-900">€{availableBalance.toFixed(2)}</span>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-xl mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Wallet className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Adresse TRC20</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-gray-200 text-sm font-mono text-gray-600 break-all">
            {trc20Address}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Les retraits sont envoyés automatiquement à cette adresse
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {withdrawSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-green-700">Retrait effectué avec succès !</p>
            <p className="text-xs text-green-600 mt-1">
              Le montant sera crédité sur votre wallet TRC20 sous 24h
            </p>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Montant à retirer (€)
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full pl-10 pr-20 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            disabled={isWithdrawing}
          />
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            onClick={handleMaxAmount}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-caribbean-600 font-medium hover:text-caribbean-700"
          >
            MAX
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleWithdraw}
        disabled={isWithdrawing || amount <= 0 || amount > availableBalance}
        className="w-full bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {isWithdrawing ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Traitement en cours...</span>
          </>
        ) : (
          <>
            <ArrowRight className="w-5 h-5" />
            <span>Retirer vers TRC20</span>
          </>
        )}
      </motion.button>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          Les retraits sont traités automatiquement et envoyés vers votre wallet TRC20.
          Un minimum de €50 est requis pour effectuer un retrait.
        </p>
      </div>
    </motion.div>
  );
};

export default WithdrawPanel;