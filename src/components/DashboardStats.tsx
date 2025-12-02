import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Flame, Trophy, Clock, CalendarCheck } from 'lucide-react'

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalMinutes: 0,
    currentStreak: 0,
    bestStreak: 0,
    reservationsThisWeek: 0,
    favoriteLocal: 'Aucun pour l’instant'
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('booking_date, slot, location_id, locations!inner(name)')
      .eq('status', 'confirmed')

    if (!bookings || bookings.length === 0) return

    // Minutes étudiées (4h par créneau)
    const totalMinutes = bookings.length * 240

    // Streak actuel
    const dates = [...new Set(bookings.map(b => b.booking_date))].sort().reverse()
    let currentStreak = 0
    let bestStreak = 0
    let tempStreak = 0
    const today = new Date().toISOString().split('T')[0]

    for (let i = 0; i < dates.length; i++) {
      const current = new Date(dates[i])
      const prev = dates[i + 1] ? new Date(dates[i + 1]) : null

      if (!prev || Math.round((current - prev) / (1000 * 60 * 60 * 24)) <= 7) {
        tempStreak++
      } else {
        bestStreak = Math.max(bestStreak, tempStreak)
        tempStreak = 1
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak)
    currentStreak = tempStreak

    // Résas cette semaine
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const thisWeek = bookings.filter(b => new Date(b.booking_date) >= weekAgo).length

    // Local préféré
    const localCount = bookings.reduce((acc: any, b: any) => {
      acc[b.locations.name] = (acc[b.locations.name] || 0) + 1
      return acc
    }, {})
    const favoriteLocal = Object.entries(localCount).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'Aucun'

    setStats({
      totalMinutes,
      currentStreak,
      bestStreak,
      reservationsThisWeek: thisWeek,
      favoriteLocal
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
        <p className="text-3xl font-bold">{Math.floor(stats.totalMinutes / 60)}h</p>
        <p className="text-gray-600">Étudiées</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <Flame className={`w-10 h-10 mx-auto mb-2 ${stats.currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
        <p className="text-3xl font-bold">{stats.currentStreak}</p>
        <p className="text-gray-600">Jours de streak</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <Trophy className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
        <p className="text-3xl font-bold">{stats.bestStreak}</p>
        <p className="text-gray-600">Meilleur streak</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <CalendarCheck className="w-10 h-10 text-green-600 mx-auto mb-2" />
        <p className="text-3xl font-bold">{stats.reservationsThisWeek}</p>
        <p className="text-gray-600">Cette semaine</p>
      </div>
    </div>
  )
}
