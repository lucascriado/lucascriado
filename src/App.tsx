import { useEffect, useState } from 'react'
import './App.css'

type Projeto = {
  name: string
  language: string | null
  description: string
  url: string
  fork?: boolean
  externo?: boolean
}

const PRODUTOS: Projeto[] = [
  {
    name: 'ticketboard.app',
    language: 'JavaScript',
    description: 'Painel do organizador para eventos da Sympla: participantes, ingressos e check-in.',
    url: 'https://ticketboard.app',
    externo: true,
  },
  {
    name: 'nonia.app',
    language: 'TypeScript',
    description: 'Gestão ministerial: membros, visitantes, células, ministérios e agenda.',
    url: 'https://nonia.app',
    externo: true,
  },
]

// Lista embutida: a página continua completa se a API do GitHub não responder.
const REPOS: Projeto[] = [
  { name: 'vr-ticket-for-whatsapp', language: 'JavaScript', description: 'Bot que consulta saldo e extrato do Ticket Restaurante pelo WhatsApp, com OAuth2 no Azure B2C e reauth via Puppeteer.', url: 'https://github.com/lucascriado/vr-ticket-for-whatsapp' },
  { name: 'javaday', language: 'HTML', description: '', url: 'https://github.com/lucascriado/javaday' },
  { name: 'nonia', language: 'TypeScript', description: '', url: 'https://github.com/lucascriado/nonia' },
  { name: 'whatsapp-socket', language: 'TypeScript', description: 'API de WhatsApp sobre o Baileys, em Node.js.', url: 'https://github.com/lucascriado/whatsapp-socket' },
  { name: 'totvs-fontes', language: 'xBase', description: 'Funções, rotinas e fontes para Protheus: API, ExecAuto, queries e pontos de entrada.', url: 'https://github.com/lucascriado/totvs-fontes' },
  { name: 'valinor', language: 'CSS', description: 'Projeto em Angular consumindo uma API de investimentos.', url: 'https://github.com/lucascriado/valinor', fork: true },
  { name: 'answers-and-comments', language: 'JavaScript', description: 'Simulação de post de comentários em ReactJS.', url: 'https://github.com/lucascriado/answers-and-comments' },
  { name: 'rockeseat-ignite-node', language: 'JavaScript', description: 'Exercícios do curso Ignite.', url: 'https://github.com/lucascriado/rockeseat-ignite-node' },
  { name: 'rocketseat-treineme', language: 'CSS', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-treineme' },
  { name: 'rocketseat-rocketsect', language: 'CSS', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-rocketsect' },
  { name: 'rocketseat-responsiveness', language: 'CSS', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-responsiveness' },
  { name: 'rocketseat-recipe', language: 'HTML', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-recipe' },
  { name: 'rocketseat-forms', language: 'CSS', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-forms' },
  { name: 'rocketseat-moveisparavoce', language: 'HTML', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-moveisparavoce' },
  { name: 'rocketseat-flutuar', language: 'CSS', description: 'Landing page dos cursos da Rocketseat.', url: 'https://github.com/lucascriado/rocketseat-flutuar' },
  { name: 'lucascriado', language: 'TypeScript', description: 'Esta página.', url: 'https://github.com/lucascriado/lucascriado' },
]

const CORES: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  xBase: '#403a40',
  Shell: '#89e051',
  Dockerfile: '#384d54',
}

function Item({ projeto }: { projeto: Projeto }) {
  return (
    <a className={`item${projeto.externo ? ' item-live' : ''}`} href={projeto.url} rel="noopener">
      <div className="item-top">
        <span className="item-name">{projeto.name}</span>
        <span className="item-meta">
          {projeto.fork && <span className="tag">fork</span>}
          {projeto.language && (
            <>
              <span
                className="dot"
                style={CORES[projeto.language] ? { background: CORES[projeto.language] } : undefined}
              />
              <span>{projeto.language}</span>
            </>
          )}
        </span>
      </div>
      {projeto.description && <p className="item-desc">{projeto.description}</p>}
    </a>
  )
}

function App() {
  const [repos, setRepos] = useState<Projeto[]>(REPOS)

  // Atualiza com o que o GitHub tem agora; se falhar, a lista embutida fica.
  useEffect(() => {
    const controlador = new AbortController()

    fetch('https://api.github.com/users/lucascriado/repos?per_page=100&sort=pushed', {
      signal: controlador.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((dados) => {
        if (!Array.isArray(dados) || dados.length === 0) return
        setRepos(
          dados.map((r) => ({
            name: r.name,
            language: r.language,
            description: (r.description ?? '').replace(/^\W+\s*/, ''),
            url: r.html_url,
            fork: r.fork,
          })),
        )
      })
      .catch(() => {
        /* mantém a lista embutida */
      })

    return () => controlador.abort()
  }, [])

  return (
    <div className="wrap">
      <header>
        <h1>lucascriado</h1>
        <p className="tagline">
          Desenvolvedor. Construo produtos pequenos e ferramentas que resolvem problemas meus — e
          às vezes os de outras pessoas.
        </p>
        <nav className="links">
          <a href="https://github.com/lucascriado">github</a>
          <a href="mailto:lucascriado33@gmail.com">e-mail</a>
        </nav>
      </header>

      <section>
        <h2>Produtos</h2>
        <div className="list">
          {PRODUTOS.map((p) => (
            <Item key={p.name} projeto={p} />
          ))}
        </div>
      </section>

      <section>
        <h2>Repositórios</h2>
        <div className="list">
          {repos.map((r) => (
            <Item key={r.name} projeto={r} />
          ))}
        </div>
      </section>

      <footer>lucascriado.com · {new Date().getFullYear()}</footer>
    </div>
  )
}

export default App
