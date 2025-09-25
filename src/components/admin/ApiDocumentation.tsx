import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';
import { generateApiDocs } from '../../utils/api';

const ApiDocumentation = () => {
  const [apiDocs, setApiDocs] = useState<any>(null);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Generate API documentation
    const docs = generateApiDocs();
    setApiDocs(docs);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const togglePath = (path: string) => {
    setExpandedPath(expandedPath === path ? null : path);
    setExpandedMethod(null);
  };

  const toggleMethod = (method: string) => {
    setExpandedMethod(expandedMethod === method ? null : method);
  };

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'get':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'post':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'put':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delete':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filterPaths = () => {
    if (!apiDocs || !apiDocs.paths) return [];
    
    return Object.entries(apiDocs.paths)
      .filter(([path]) => {
        // Apply search filter
        if (searchTerm && !path.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Apply category filter
        if (filter !== 'all') {
          if (filter === 'auth' && !path.includes('auth')) return false;
          if (filter === 'users' && !path.includes('users')) return false;
          if (filter === 'products' && !path.includes('products')) return false;
          if (filter === 'orders' && !path.includes('orders')) return false;
          if (filter === 'trading' && !path.includes('trading')) return false;
          if (filter === 'swap' && !path.includes('swap')) return false;
          if (filter === 'admin' && !path.includes('admin')) return false;
        }
        
        return true;
      });
  };

  if (!apiDocs) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-caribbean-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Code className="w-6 h-6" />
            <h2 className="text-xl font-bold">API Documentation</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-green-500 px-2 py-1 rounded-full">v{apiDocs.info.version}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setApiDocs(generateApiDocs())}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <p className="text-gray-300 mb-6">{apiDocs.info.description}</p>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search endpoints..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500 appearance-none"
            >
              <option value="all">All Endpoints</option>
              <option value="auth">Authentication</option>
              <option value="users">Users</option>
              <option value="products">Products</option>
              <option value="orders">Orders</option>
              <option value="trading">Trading</option>
              <option value="swap">Swap</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="p-6">
        <div className="space-y-4">
          {filterPaths().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No endpoints found matching your criteria</p>
            </div>
          ) : (
            filterPaths().map(([path, methods]) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Path Header */}
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer ${
                    expandedPath === path ? 'bg-gray-50' : 'bg-white'
                  }`}
                  onClick={() => togglePath(path)}
                >
                  <div className="flex items-center space-x-3">
                    {expandedPath === path ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                    <code className="font-mono text-gray-800 font-medium">{path}</code>
                  </div>
                  <div className="flex items-center space-x-2">
                    {Object.keys(methods).map((method) => (
                      <span
                        key={method}
                        className={`uppercase text-xs font-bold px-2 py-1 rounded border ${getMethodColor(
                          method
                        )}`}
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Methods */}
                {expandedPath === path && (
                  <div className="border-t border-gray-200">
                    {Object.entries(methods).map(([method, details]) => (
                      <div key={method} className="border-b border-gray-200 last:border-b-0">
                        {/* Method Header */}
                        <div
                          className={`flex items-center justify-between p-4 cursor-pointer ${
                            expandedMethod === `${path}-${method}` ? 'bg-gray-50' : 'bg-white'
                          }`}
                          onClick={() => toggleMethod(`${path}-${method}`)}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`uppercase text-xs font-bold px-2 py-1 rounded border ${getMethodColor(
                                method
                              )}`}
                            >
                              {method}
                            </span>
                            <span className="font-medium text-gray-800">
                              {details.summary || 'No description'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {details.security && details.security.length > 0 ? (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                Requires Auth
                              </span>
                            ) : (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Public
                              </span>
                            )}
                            {expandedMethod === `${path}-${method}` ? (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                          </div>
                        </div>

                        {/* Method Details */}
                        {expandedMethod === `${path}-${method}` && (
                          <div className="p-4 bg-gray-50">
                            <div className="space-y-4">
                              {/* Request Example */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                  Request Example
                                </h4>
                                <div className="relative">
                                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                    {`curl -X ${method.toUpperCase()} "${apiDocs.info.title.toLowerCase().replace(/\s+/g, '-')}.com${path}" \\
  -H "Content-Type: application/json" ${
    details.security && details.security.length > 0
      ? '\\\n  -H "Authorization: Bearer YOUR_TOKEN"'
      : ''
  } ${
    method.toLowerCase() !== 'get' && method.toLowerCase() !== 'delete'
      ? '\\\n  -d \'{"example": "data"}\''
      : ''
  }`}
                                  </pre>
                                  <button
                                    onClick={() =>
                                      handleCopy(
                                        `curl -X ${method.toUpperCase()} "${apiDocs.info.title.toLowerCase().replace(/\s+/g, '-')}.com${path}" -H "Content-Type: application/json" ${
                                          details.security && details.security.length > 0
                                            ? '-H "Authorization: Bearer YOUR_TOKEN"'
                                            : ''
                                        } ${
                                          method.toLowerCase() !== 'get' && method.toLowerCase() !== 'delete'
                                            ? '-d \'{"example": "data"}\''
                                            : ''
                                        }`,
                                        `${path}-${method}-curl`
                                      )
                                    }
                                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-700 transition-colors"
                                  >
                                    {copied === `${path}-${method}-curl` ? (
                                      <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-gray-400" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Response Examples */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                  Response Example
                                </h4>
                                <div className="relative">
                                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                    {`{
  "success": true,
  "data": {
    "id": "example-id",
    "name": "Example Name",
    "created_at": "2025-01-01T00:00:00Z"
  }
}`}
                                  </pre>
                                  <button
                                    onClick={() =>
                                      handleCopy(
                                        `{
  "success": true,
  "data": {
    "id": "example-id",
    "name": "Example Name",
    "created_at": "2025-01-01T00:00:00Z"
  }
}`,
                                        `${path}-${method}-response`
                                      )
                                    }
                                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-700 transition-colors"
                                  >
                                    {copied === `${path}-${method}-response` ? (
                                      <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-gray-400" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Response Codes */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                  Response Codes
                                </h4>
                                <div className="space-y-2">
                                  {Object.entries(details.responses).map(([code, response]) => (
                                    <div
                                      key={code}
                                      className="flex items-center space-x-3 p-2 rounded-lg bg-white border border-gray-200"
                                    >
                                      <span
                                        className={`text-xs font-bold px-2 py-1 rounded ${
                                          code.startsWith('2')
                                            ? 'bg-green-100 text-green-800'
                                            : code.startsWith('4')
                                            ? 'bg-red-100 text-red-800'
                                            : code.startsWith('5')
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                      >
                                        {code}
                                      </span>
                                      <span className="text-gray-700">
                                        {response.description}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600">
          Need more help? Check out our{' '}
          <a
            href="#"
            className="text-caribbean-600 hover:underline flex items-center space-x-1 inline-flex"
          >
            <span>API Reference</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiDocumentation;