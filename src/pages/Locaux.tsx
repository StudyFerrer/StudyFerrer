import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const locaux = [
  { id: 1, name: 'Local Reclus',       capacity: 8,  type: 'Calme absolu',          color: 'blue' },
  { id: 2, name: 'Local Pi y Margall', capacity: 10, type: 'Travail en groupe',     color: 'green' },
  { id: 3, name: 'Local Paul Robin',   capacity: 14, type: 'Grande salle polyvalente', color: 'purple' },
  { id: 4, name: 'Local Faure',        capacity: 16, type: 'QG – Espace principal', color: 'orange' },
]

export default function Locaux() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const reserver = (id: number, name: string) => {
    navigate('/reservation', { state: { localId: id, localName: name } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Choisis ton local</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {locaux.map(local => (
            <div
              key={local.id}
              onClick={() => setSelectedId(local.id)}
              className={`bg-white rounded-3xl p-8 shadow-xl cursor-pointer transition-all ${
                selectedId === local.id ? 'ring-4 ring-blue-400' : ''
              }`}
            >
              <h2 className="text-2xl font-bold mb-3">{local.name}</h2>
              <p className="text-gray-600 mb-4">{local.type}</p>
              <p className="text-lg font-medium">{local.capacity} places</p>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  reserver(local.id, local.name)
                }}
                className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Réserver ce local
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-10 text-blue-600 font-medium"
        >
          ← Retour
        </button>
      </div>
    </div>
  )
}
