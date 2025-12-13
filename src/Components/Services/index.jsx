import React from 'react'
import './Services.css'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'PRPPF/UFC',
      date: '2025',
      description: 'Foi conduzido um teste de segurança autorizado (pentest) no domínio prppg.ufc.br, pertencente à Pró-Reitoria de Pesquisa e Pós-Graduação da Universidade Federal do Ceará (UFC). A atividade ocorreu em colaboração entre os projetos Fábrica de Testadores (UECE) e Fábrica de Testes de Segurança (UFC).'
    },
    {
      id: 2,
      title: 'Mangoo',
      date: '2025',
      description: 'O Mangoo é uma ferramenta de gamificação do GESAD que recompensa o bom desempenho acadêmico com “mangoos”, uma moeda virtual trocável por prêmios. A equipe de testes, mais madura tecnicamente que em projetos anteriores, aplicou principalmente testes funcionais e exploratórios. Porém, enfrentou desafios como a falta de documentação estruturada. Ao final, um relatório consolidado dos testes foi produzido e enviado aos responsáveis pelo sistema.'
    },
    {
      id: 3,
      title: 'Detic',
      date: '2025',
        description: 'Foi realizado um processo de testes funcionais e exploratórios no novo módulo de Atividades Complementares (AC) do sistema acadêmico desenvolvido pelo DETIC/UECE. A atividade foi conduzida pela equipe da Fábrica de Testadores (GESAD/UECE) sob orientação docente, com o objetivo de identificar falhas antes do lançamento oficial da atualização do sistema.'
      },
    {
      id: 4,
      title: 'Chatbot Hospital Veterinario UECE',
      date: '2024',
      description: 'O Chatbot UECE passou por validações realizadas pela equipe de Quality Assurance, que identificou diferentes problemas de funcionamento durante interações via WhatsApp. Entre os achados, destacam-se falhas em respostas de despedida e agradecimento, limitações na lematização que impedem o reconhecimento de sinônimos e variações de intenção, ausência de opções de navegação para retornar ao menu após acessar informações de cirurgias e mensagens genéricas na área de pagamentos, dificultando o entendimento do usuário.'
    },
     {
      id: 5,
      title: 'Bookstation',
      date: '2024',
      description: 'O Bookstation, criado por Andrei Nunes como TCC na UECE, é um gerenciador pessoal de livros que permite registrar obras que o usuário está lendo, quer ler ou abandonou. A Fábrica de Testadores realizou testes ad hoc e exploratórios na ferramenta. Mesmo com a experiência técnica ainda inicial dos alunos, foram identificados e reportados diversos bugs, contribuindo de forma significativa para melhorar o sistema.'
    }
  ]

  return (
    <section className="services-container">
      <div className="services-header">
        <h2>Serviços Executados</h2>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <article key={s.id} className="service-card">
            <div className="service-top">
              <div className="service-icon" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <span className="service-date">{s.date}</span>
              </div>
            </div>

            <p className="service-description">{s.description}</p>

            <div className="service-status">Concluído</div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
