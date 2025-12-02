import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function CharteModal({ onAccept }: { onAccept: () => void }) {
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    if (!accepted) return toast.error('Tu dois accepter la charte pour continuer')

    setLoading(true)
    const { error } = await supabase
      .from('profiles')
      .update({ charte_acceptee: true, charte_date: new Date() })
      .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error) {
      toast.error('Erreur, réessaie')
    } else {
      toast.success('Charte acceptée ! Bienvenue sur StudyFerrer')
      onAccept()
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-screen overflow-y-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Charte StudyFerrer</h2>

        <div className="space-y-4 text-gray-700 mb-8">
          <p className="text-lg">En utilisant StudyFerrer, tu t’engages à :</p>
          <ul className="list-disc pl-8 space-y-3 text-lg">
            <li>Respecter le calme dans les locaux « calme » (Reclus)</li>
            <li>Laisser la salle propre après utilisation</li>
            <li>Arriver à l’heure et libérer la salle à la fin du créneau</li>
            <li>Annuler ta réservation si tu ne viens pas (minimum 2h avant)</li>
            <li>Ne pas manger dans les locaux (boire ok)</li>
            <li>Signaler tout problème via le bouton prévu</li>
          </ul>
          <p className="font-bold text-xl mt-6">Merci de faire vivre ce projet avec respect !</p>
        </div>

        <label className="flex items-center gap-4 mb-8 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-8 h-8 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xl">J’accepte la charte StudyFerrer</span>
        </label>

        <button
          onClick={handleAccept}
          disabled={loading || !accepted}
          className={`w-full py-5 rounded-xl text-white text-xl font-bold transition ${
            accepted && !loading
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Enregistrement...' : 'Continuer'}
        </button>
      </div>
    </div>
  )
}
