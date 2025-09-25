"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap,
  BarChart3
} from "lucide-react";

const PerformanceMetrics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-caribbean-gradient rounded-2xl p-6 text-white"
    >
      <h3 className="text-lg font-bold mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        Performance
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="opacity-90">Gain Total:</span>
          <span className="text-xl font-bold">€2,847.32</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="opacity-90">ROI:</span>
          <span className="text-xl font-bold">+87.2%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="opacity-90">Meilleur Asset:</span>
          <span className="text-xl font-bold">SOL (+45%)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="opacity-90">Trades Gagnants:</span>
          <span className="text-xl font-bold">89%</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/20 rounded-xl">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-4 h-4" />
          <span className="font-medium">Objectif Mensuel</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-90">€15,000</span>
          <span className="text-sm font-bold">85.6%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: '85.6%' }}></div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Swaps</span>
          </div>
          <p className="text-2xl font-bold">47</p>
          <p className="text-sm opacity-80">ce mois</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium">Commission</span>
          </div>
          <p className="text-2xl font-bold">€845.67</p>
          <p className="text-sm opacity-80">ce mois</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;