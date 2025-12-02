import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Reservation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { localName } = location.state || {}

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)

  const slots = ['matin (8h-12h)', 'midi (12h-16h)', 'soir (16h-20h)']

  const handleReserve = async () => {
    if (!selectedDate || !selectedSlot) return toast.error('Choisis date et créneau')

    setLoading(true)
    const { error } = await supabase.from('bookings').insert({
      location_id: location.state.localId,
      booking_date: selectedDate,
      slot: selectedSlot.split(' ')[0], // 'matin' / 'midi' / 'soir'
    })

    if (error) {
      toast.error('Erreur de réservation')
    } else {
      toast.success(`Réservation confirmée pour ${localName} le ${selectedDate} ${selectedSlot} !`)
      navigate('/mes-reservations')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Réserver {localName}</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-4 border rounded-xl text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Créneau</label>
            <div className="grid gap-3">
              {slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-4 rounded-xl border-2 text-lg font-medium transition ${
                    selectedSlot === slot
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleReserve}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-blue-700 transition"
          >
            {loading ? 'Réservation...' : 'Confirmer la réservation'}
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-blue-600 font-medium w-full text-center"
        >
          ← Annuler
        </button>
      </div>
    </div>
  )
}
