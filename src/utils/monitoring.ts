import { supabase } from './supabase';

// Monitoring and alerting system
class MonitoringSystem {
  private static instance: MonitoringSystem;
  private alertSubscribers: Function[] = [];
  private errorThreshold: number = 5;
  private errorCount: number = 0;
  private lastErrorTime: number = 0;
  private isMonitoring: boolean = false;
  
  // Singleton pattern
  public static getInstance(): MonitoringSystem {
    if (!MonitoringSystem.instance) {
      MonitoringSystem.instance = new MonitoringSystem();
    }
    return MonitoringSystem.instance;
  }
  
  // Start monitoring
  public startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log('Monitoring system started');
    
    // Monitor global errors
    window.addEventListener('error', this.handleGlobalError.bind(this));
    
    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    
    // Monitor network requests
    this.monitorNetworkRequests();
    
    // Monitor performance
    this.monitorPerformance();
    
    // Heartbeat to check system health
    this.startHeartbeat();
  }
  
  // Stop monitoring
  public stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    console.log('Monitoring system stopped');
    
    window.removeEventListener('error', this.handleGlobalError.bind(this));
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
  }
  
  // Subscribe to alerts
  public subscribeToAlerts(callback: Function): void {
    this.alertSubscribers.push(callback);
  }
  
  // Unsubscribe from alerts
  public unsubscribeFromAlerts(callback: Function): void {
    this.alertSubscribers = this.alertSubscribers.filter(cb => cb !== callback);
  }
  
  // Log event to database
  public async logEvent(eventType: string, eventData: any): Promise<void> {
    try {
      await supabase
        .from('monitoring_logs')
        .insert({
          event_type: eventType,
          event_data: eventData,
          user_id: await this.getCurrentUserId(),
          timestamp: new Date()
        });
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }
  
  // Log critical event and trigger alerts
  public async logCriticalEvent(eventType: string, eventData: any): Promise<void> {
    try {
      // Log to database
      await this.logEvent(eventType, eventData);
      
      // Trigger alerts
      this.triggerAlert({
        type: 'critical',
        message: `Critical event: ${eventType}`,
        data: eventData,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error logging critical event:', error);
    }
  }
  
  // Private methods
  private async getCurrentUserId(): Promise<string | null> {
    try {
      const { data } = await supabase.auth.getSession();
      return data?.session?.user?.id || null;
    } catch (error) {
      return null;
    }
  }
  
  private handleGlobalError(event: ErrorEvent): void {
    this.errorCount++;
    this.lastErrorTime = Date.now();
    
    this.logEvent('error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack
    });
    
    // Check if error threshold is exceeded
    if (this.errorCount >= this.errorThreshold) {
      this.logCriticalEvent('error_threshold_exceeded', {
        count: this.errorCount,
        timeframe: '5 minutes'
      });
      
      // Reset error count
      this.errorCount = 0;
    }
  }
  
  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    this.logEvent('unhandled_rejection', {
      reason: event.reason?.toString(),
      stack: event.reason?.stack
    });
  }
  
  private monitorNetworkRequests(): void {
    const originalFetch = window.fetch;
    
    window.fetch = async (input, init) => {
      const startTime = performance.now();
      let response;
      
      try {
        response = await originalFetch(input, init);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log slow requests (> 2 seconds)
        if (duration > 2000) {
          this.logEvent('slow_request', {
            url: typeof input === 'string' ? input : input.url,
            duration,
            method: init?.method || 'GET'
          });
        }
        
        // Log failed requests
        if (!response.ok) {
          this.logEvent('failed_request', {
            url: typeof input === 'string' ? input : input.url,
            status: response.status,
            statusText: response.statusText,
            method: init?.method || 'GET'
          });
        }
        
        return response;
      } catch (error) {
        this.logEvent('network_error', {
          url: typeof input === 'string' ? input : input.url,
          error: error.toString(),
          method: init?.method || 'GET'
        });
        throw error;
      }
    };
  }
  
  private monitorPerformance(): void {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domLoadTime = perfData.domComplete - perfData.domLoading;
        
        this.logEvent('page_performance', {
          page: window.location.pathname,
          pageLoadTime,
          domLoadTime,
          userAgent: navigator.userAgent
        });
        
        // Log slow page loads (> 3 seconds)
        if (pageLoadTime > 3000) {
          this.logEvent('slow_page_load', {
            page: window.location.pathname,
            pageLoadTime,
            domLoadTime
          });
        }
      }, 0);
    });
    
    // Monitor memory usage
    if (performance.memory) {
      setInterval(() => {
        const memoryInfo = performance.memory;
        
        // Log high memory usage (> 80% of limit)
        if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.8) {
          this.logCriticalEvent('high_memory_usage', {
            usedJSHeapSize: memoryInfo.usedJSHeapSize,
            jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
            percentage: (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100
          });
        }
      }, 60000); // Check every minute
    }
  }
  
  private startHeartbeat(): void {
    setInterval(async () => {
      try {
        // Check database connection
        const { data, error } = await supabase.from('monitoring_logs').select('count').limit(1);
        
        if (error) {
          this.logCriticalEvent('database_connection_error', {
            error: error.toString()
          });
        }
        
        // Log heartbeat
        this.logEvent('heartbeat', {
          status: error ? 'error' : 'ok',
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Heartbeat error:', error);
      }
    }, 300000); // Every 5 minutes
  }
  
  private triggerAlert(alert: any): void {
    // Notify all subscribers
    this.alertSubscribers.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Error in alert subscriber:', error);
      }
    });
    
    // In a real app, you might also send alerts via:
    // - Email
    // - SMS
    // - Push notifications
    // - Slack/Discord webhooks
    // - PagerDuty/OpsGenie
    
    console.warn('ALERT:', alert);
  }
}

// Export singleton instance
export const monitoring = MonitoringSystem.getInstance();

// Start monitoring when module is imported
monitoring.startMonitoring();

// Alert component for UI
export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    const handleAlert = (alert) => {
      setAlerts(prev => [...prev, alert]);
      
      // Auto-dismiss after 10 seconds
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a !== alert));
      }, 10000);
    };
    
    monitoring.subscribeToAlerts(handleAlert);
    
    return () => {
      monitoring.unsubscribeFromAlerts(handleAlert);
    };
  }, []);
  
  return { alerts, clearAlert: (alert) => setAlerts(prev => prev.filter(a => a !== alert)) };
};

// Export monitoring functions
export const logEvent = (eventType, eventData) => monitoring.logEvent(eventType, eventData);
export const logCriticalEvent = (eventType, eventData) => monitoring.logCriticalEvent(eventType, eventData);