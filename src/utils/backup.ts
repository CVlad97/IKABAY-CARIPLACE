import { supabase } from './supabase';
import { monitoring } from './monitoring';

// Backup system for IKABAY
class BackupSystem {
  private static instance: BackupSystem;
  private backupSchedule: NodeJS.Timeout | null = null;
  private backupInProgress: boolean = false;
  private lastBackupTime: Date | null = null;
  private backupHistory: any[] = [];
  
  // Singleton pattern
  public static getInstance(): BackupSystem {
    if (!BackupSystem.instance) {
      BackupSystem.instance = new BackupSystem();
    }
    return BackupSystem.instance;
  }
  
  // Initialize backup system
  public initialize(): void {
    // Load backup history
    this.loadBackupHistory();
    
    // Schedule daily backups
    this.scheduleBackups();
    
    console.log('Backup system initialized');
  }
  
  // Schedule automatic backups
  public scheduleBackups(intervalHours: number = 24): void {
    if (this.backupSchedule) {
      clearInterval(this.backupSchedule);
    }
    
    // Schedule backup every X hours
    this.backupSchedule = setInterval(() => {
      this.createBackup();
    }, intervalHours * 60 * 60 * 1000);
    
    console.log(`Automatic backups scheduled every ${intervalHours} hours`);
  }
  
  // Create a backup
  public async createBackup(description: string = 'Automatic backup'): Promise<any> {
    if (this.backupInProgress) {
      console.log('Backup already in progress');
      return null;
    }
    
    try {
      this.backupInProgress = true;
      
      // Log backup start
      monitoring.logEvent('backup_started', {
        description,
        timestamp: new Date(),
      });
      
      // Get data to backup
      const backupData = await this.collectBackupData();
      
      // Generate backup ID
      const backupId = `backup_${Date.now()}`;
      
      // Create backup record
      const { data, error } = await supabase
        .from('backups')
        .insert({
          id: backupId,
          description,
          data: backupData,
          created_at: new Date(),
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update backup history
      this.lastBackupTime = new Date();
      this.backupHistory.push({
        id: backupId,
        description,
        timestamp: this.lastBackupTime,
        size: JSON.stringify(backupData).length,
      });
      
      // Save backup history
      this.saveBackupHistory();
      
      // Log backup completion
      monitoring.logEvent('backup_completed', {
        backupId,
        description,
        timestamp: new Date(),
        size: JSON.stringify(backupData).length,
      });
      
      console.log(`Backup created: ${backupId}`);
      return data;
    } catch (error) {
      // Log backup failure
      monitoring.logCriticalEvent('backup_failed', {
        description,
        error: error.toString(),
        timestamp: new Date(),
      });
      
      console.error('Backup failed:', error);
      throw error;
    } finally {
      this.backupInProgress = false;
    }
  }
  
  // Restore from backup
  public async restoreBackup(backupId: string): Promise<boolean> {
    try {
      // Log restore start
      monitoring.logEvent('restore_started', {
        backupId,
        timestamp: new Date(),
      });
      
      // Get backup data
      const { data, error } = await supabase
        .from('backups')
        .select('data')
        .eq('id', backupId)
        .single();
        
      if (error) throw error;
      if (!data) throw new Error('Backup not found');
      
      // Restore data
      await this.restoreBackupData(data.data);
      
      // Log restore completion
      monitoring.logEvent('restore_completed', {
        backupId,
        timestamp: new Date(),
      });
      
      console.log(`Backup restored: ${backupId}`);
      return true;
    } catch (error) {
      // Log restore failure
      monitoring.logCriticalEvent('restore_failed', {
        backupId,
        error: error.toString(),
        timestamp: new Date(),
      });
      
      console.error('Restore failed:', error);
      return false;
    }
  }
  
  // Get backup history
  public getBackupHistory(): any[] {
    return [...this.backupHistory];
  }
  
  // Get last backup time
  public getLastBackupTime(): Date | null {
    return this.lastBackupTime;
  }
  
  // Private methods
  private async collectBackupData(): Promise<any> {
    // Collect data from all relevant tables
    const tables = [
      'users',
      'products',
      'orders',
      'order_items',
      'crypto_wallets',
      'transactions',
      'shopping_carts',
      'sales',
      'profit_transactions',
    ];
    
    const backupData: any = {};
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(10000); // Limit to prevent huge backups
          
        if (error) throw error;
        
        backupData[table] = data;
      } catch (error) {
        console.error(`Error backing up table ${table}:`, error);
        backupData[table] = { error: error.toString() };
      }
    }
    
    return backupData;
  }
  
  private async restoreBackupData(backupData: any): Promise<void> {
    // Restore data to all tables
    for (const [table, data] of Object.entries(backupData)) {
      if (Array.isArray(data) && data.length > 0) {
        try {
          // Clear existing data
          await supabase.from(table).delete().neq('id', 'dummy');
          
          // Insert backup data
          const { error } = await supabase.from(table).insert(data);
          
          if (error) throw error;
        } catch (error) {
          console.error(`Error restoring table ${table}:`, error);
          throw error;
        }
      }
    }
  }
  
  private loadBackupHistory(): void {
    try {
      const savedHistory = localStorage.getItem('ikabay_backup_history');
      if (savedHistory) {
        this.backupHistory = JSON.parse(savedHistory);
        
        // Set last backup time
        if (this.backupHistory.length > 0) {
          this.lastBackupTime = new Date(this.backupHistory[this.backupHistory.length - 1].timestamp);
        }
      }
    } catch (error) {
      console.error('Error loading backup history:', error);
    }
  }
  
  private saveBackupHistory(): void {
    try {
      // Keep only last 100 entries
      if (this.backupHistory.length > 100) {
        this.backupHistory = this.backupHistory.slice(-100);
      }
      
      localStorage.setItem('ikabay_backup_history', JSON.stringify(this.backupHistory));
    } catch (error) {
      console.error('Error saving backup history:', error);
    }
  }
}

// Export singleton instance
export const backupSystem = BackupSystem.getInstance();

// Initialize backup system
backupSystem.initialize();

// React hook for backup functionality
export const useBackup = () => {
  const [backupHistory, setBackupHistory] = useState([]);
  const [lastBackupTime, setLastBackupTime] = useState<Date | null>(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  useEffect(() => {
    // Load initial state
    setBackupHistory(backupSystem.getBackupHistory());
    setLastBackupTime(backupSystem.getLastBackupTime());
    
    // Refresh every minute
    const interval = setInterval(() => {
      setBackupHistory(backupSystem.getBackupHistory());
      setLastBackupTime(backupSystem.getLastBackupTime());
    }, 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const createBackup = async (description: string) => {
    try {
      setIsCreatingBackup(true);
      await backupSystem.createBackup(description);
      setBackupHistory(backupSystem.getBackupHistory());
      setLastBackupTime(backupSystem.getLastBackupTime());
      return true;
    } catch (error) {
      console.error('Error creating backup:', error);
      return false;
    } finally {
      setIsCreatingBackup(false);
    }
  };
  
  const restoreBackup = async (backupId: string) => {
    try {
      setIsRestoring(true);
      const success = await backupSystem.restoreBackup(backupId);
      return success;
    } catch (error) {
      console.error('Error restoring backup:', error);
      return false;
    } finally {
      setIsRestoring(false);
    }
  };
  
  return {
    backupHistory,
    lastBackupTime,
    isCreatingBackup,
    isRestoring,
    createBackup,
    restoreBackup,
  };
};

export default backupSystem;