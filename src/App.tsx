import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import CharteModal from './components/CharteModal'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

function App() {
  const [session, setSession] = useState<any>(null)
  const [showCharte, setShowCharte] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) checkCharte(session.user.id)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) checkCharte(session.user.id)
    })
  }, [])

  const checkCharte = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('charte_acceptee')
      .eq('id', userId)
      .single()
    if (!data?.charte_acceptee) setShowCharte(true)
  }

  if (!session) {
    return <LoginScreen />
  }

  return (
    <>
      <Toaster position="top-center" />
      {showCharte && <CharteModal onAccept={() => setShowCharte(false)} />}
      <Home />
    </>
  )
}

function LoginScreen() {
  // (le code login restreint @stu.he-ferrer.eu – je te le donne au prochain message)
}

export default App
