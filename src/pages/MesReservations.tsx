import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import toast from 'react-hot-toast'

export default function MesReservations() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        booking_date,
        slot,
        status,
        location_id,
        locations (name)
      `)
      .order('booking_date', { ascending: false })

    })

    if (error) {
      toast.error('Erreur de chargement')
    } else {
      setBookings(data || [])
    }
    setLoading(false)
  }

  const annuler = async (id: number) => {
    if (!confirm('Annuler cette réservation ?')) return

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)

    if (error) toast.error('Impossible d’annuler')
    else {
      toast.success('Réservation annulée')
      fetchBookings()
    }
  }

  if (loading) return <div className="text-center p-10 text-xl">Chargement…</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Mes Réservations</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Aucune réservation pour le moment</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{b.locations.name}</h3>
                  <p className="text-lg text-gray-700">
                    {format(new Date(b.booking_date), 'EEEE d MMMM yyyy', { locale: fr })}
                    {' • '}
                    {b.slot === 'matin' && '8h–12h'}
                    {b.slot === 'midi' && '12h–16h'}
                    {b.slot === 'soir' && '16h–20h'}
                  </p>
                  <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${
                    b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {b.status === 'confirmed' && 'Confirmée'}
                    {b.status === 'cancelled' && 'Annulée'}
                  </span>
                </div>

                {b.status === 'confirmed' && new Date(b.booking_date) > new Date() && (
                  <button
                    onClick={() => annuler(b.id)}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
                  >
                    Annuler
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => window.history.back()}
          className="mt-10 text-blue-600 font-medium"
        >
          ← Retour
        </button>
      </div>
    </div>
  )
}
