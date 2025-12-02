import { Calendar, CheckCircle, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardStats from '../components/DashboardStats'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">StudyFerrer</h1>
          <p className="text-gray-600">Réservation de salles d’étude – HEFF</p>
        </div>

        {/* Les 3 gros blocs */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div onClick={() => navigate('/locaux')} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
            <Calendar className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nouvelle Réservation</h2>
            <p className="text-gray-600 mb-4">Réserver une salle pour demain</p>
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Ouverture à 20:00
            </div>
            <p className="text-blue-600 font-semibold text-right text-xl">→</p>
          </div>

          <div onClick={() => navigate('/mes-reservations')} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Mes Réservations</h2>
            <p className="text-gray-600 mb-4">Voir mes créneaux passés et futurs</p>
            <p className="text-blue-600 font-semibold text-right text-xl">→</p>
          </div>

          <div onClick={() => navigate('/faq')} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
            <HelpCircle className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">FAQ & Règles</h2>
            <p className="text-gray-600 mb-4">Tout savoir sur le fonctionnement</p>
            <p className="text-blue-600 font-semibold text-right text-xl">→</p>
          </div>
        </div>

        {/* Stats en dessous */}
        <h2 className="text-3xl font-bold text-center mb-8">Tes statistiques</h2>
        <DashboardStats />
      </div>
    </div>
  )
}
