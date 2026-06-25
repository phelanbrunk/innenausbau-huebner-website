import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Leistungen from './pages/Leistungen'
import Projekte from './pages/Projekte'
import Team from './pages/Team'
import Kontakt from './pages/Kontakt'
import Impressum from './pages/Impressum'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leistungen" element={<Leistungen />} />
        <Route path="/projekte" element={<Projekte />} />
        <Route path="/team" element={<Team />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </Layout>
  )
}
