export default function FAQ() {
  const faqs = [
    { q: "Qui peut réserver ?", a: "Tous les étudiants HEFF avec une adresse @stu.he-ferrer.eu" },
    { q: "Quand les réservations ouvrent-elles ?", a: "Tous les jours à 20h00 pour le lendemain" },
    { q: "Combien de créneaux par jour ?", a: "1 seul créneau par jour et par étudiant" },
    { q: "Peut-on manger dans les salles ?", a: "Non, mais boire de l’eau ou du café est autorisé" },
    { q: "Comment annuler une réservation ?", a: "Sur « Mes Réservations » → bouton rouge (au moins 2h avant)" },
    { q: "Que faire si la salle est occupée ?", a: "Prends une photo + clique sur « Signaler un problème » dans le menu" },
    { q: "Y a-t-il du matériel (tableau, prises…)", a: "Oui dans Local Paul Robin & Faure. Local Reclus = calme absolu" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">FAQ & Règles</h1>

        <div className="space-y-6">
          {faqs.map((item, i) => (
            <details key={i} className="bg-white rounded-2xl shadow-lg">
              <summary className="px-8 py-6 text-xl font-semibold cursor-pointer hover:bg-gray-50 transition">
                {item.q}
              </summary>
              <div className="px-8 pb-8 pt-2 text-lg text-gray-700">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-12 text-blue-600 font-medium text-xl"
        >
          ← Retour
        </button>
      </div>
    </div>
  )
}
