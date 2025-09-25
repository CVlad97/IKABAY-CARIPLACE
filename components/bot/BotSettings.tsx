"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Save, 
  AlertCircle
} from "lucide-react";

const BotSettings = () => {
  const [capital, setCapital] = useState(1000);
  const [stopLoss, setStopLoss] = useState(5);
  const [takeProfit, setTakeProfit] = useState(10);
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Paramètres sauvegardés avec succès!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-gray-600" />
        Paramètres du Bot
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capital de Trading (€)
          </label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stop Loss (%)
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(parseFloat(e.target.value))}
            step="0.1"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Take Profit (%)
          </label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
            step="0.1"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-caribbean-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        disabled={saving}
        className="w-full mt-6 bg-caribbean-gradient text-white py-3 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Sauvegarde...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Sauvegarder les Paramètres</span>
          </>
        )}
      </motion.button>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Avertissement</h4>
            <p className="text-sm text-yellow-700">
              Le trading comporte des risques. Ne tradez que ce que vous pouvez vous permettre de perdre.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BotSettings;