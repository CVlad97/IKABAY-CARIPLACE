'use client'

import { useState } from 'react'
import { requireAuth } from '@/lib/auth'
import Papa from 'papaparse'
import { Upload, FileText, Check, X } from 'lucide-react'

export default function ImportPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    
    Papa.parse(selectedFile, {
      header: true,
      preview: 10,
      complete: (results) => {
        setPreview(results.data)
      },
      error: (error) => {
        console.error('Erreur parsing CSV:', error)
        alert('Erreur lors de la lecture du fichier CSV')
      }
    })
  }

  const handleImport = async () => {
    if (!file) return

    setImporting(true)
    setResult(null)

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const response = await fetch('/api/import/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rows: results.data })
          })

          const data = await response.json()
          setResult(data)
        } catch (error) {
          console.error('Erreur import:', error)
          setResult({ error: 'Erreur lors de l\'import' })
        } finally {
          setImporting(false)
        }
      },
      error: (error) => {
        console.error('Erreur parsing:', error)
        setResult({ error: 'Erreur lors de la lecture du fichier' })
        setImporting(false)
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-caribbean-dark mb-2">
            Import CSV Produits
          </h1>
          <p className="text-gray-600">
            Importez vos produits en masse via un fichier CSV
          </p>
        </div>

        {/* Format attendu */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-caribbean-dark mb-4">
            Format CSV attendu
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-gray-600 mb-2">Headers requis:</div>
            <div>slug,title,price,image,description,tag,category,stock</div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>slug:</strong> identifiant unique (ex: epices-colombo)</p>
            <p><strong>title:</strong> nom du produit</p>
            <p><strong>price:</strong> prix en euros (ex: 12.90)</p>
            <p><strong>image:</strong> URL de l'image</p>
            <p><strong>description:</strong> description du produit</p>
            <p><strong>tag:</strong> local ou import</p>
            <p><strong>category:</strong> epicerie, cosmetique, mode, etc.</p>
            <p><strong>stock:</strong> quantité disponible</p>
          </div>
        </div>

        {/* Upload */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-caribbean-dark mb-4">
            Sélectionner le fichier CSV
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="btn btn-primary cursor-pointer"
            >
              <FileText size={20} />
              Choisir un fichier CSV
            </label>
            {file && (
              <p className="mt-4 text-sm text-gray-600">
                Fichier sélectionné: {file.name}
              </p>
            )}
          </div>
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div className="card p-6 mb-8">
            <h2 className="text-lg font-semibold text-caribbean-dark mb-4">
              Aperçu (10 premières lignes)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {Object.keys(preview[0] || {}).map(key => (
                      <th key={key} className="text-left py-2 px-3 font-medium">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, index) => (
                    <tr key={index} className="border-b">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="py-2 px-3 max-w-xs truncate">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <button
                onClick={handleImport}
                disabled={importing}
                className="btn btn-primary"
              >
                {importing ? 'Import en cours...' : 'Importer les produits'}
              </button>
            </div>
          </div>
        )}

        {/* Résultat */}
        {result && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-caribbean-dark mb-4">
              Résultat de l'import
            </h2>
            
            {result.error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <X size={20} />
                  <span className="font-semibold">Erreur</span>
                </div>
                <p>{result.error}</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={20} />
                  <span className="font-semibold">Import réussi</span>
                </div>
                <div className="space-y-1">
                  <p>✅ {result.inserted || 0} produits ajoutés</p>
                  <p>🔄 {result.updated || 0} produits mis à jour</p>
                  {result.errors && result.errors.length > 0 && (
                    <p>❌ {result.errors.length} erreurs</p>
                  )}
                </div>
                
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-4">
                    <details>
                      <summary className="cursor-pointer font-medium">
                        Voir les erreurs
                      </summary>
                      <div className="mt-2 space-y-1">
                        {result.errors.map((error, index) => (
                          <p key={index} className="text-sm">
                            Ligne {error.row}: {error.message}
                          </p>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}