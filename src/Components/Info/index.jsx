import "./styles.css";

export default function Info() {
  return (
    <>
      <section id="about" className="info">
        <div className="logo">
          <img src="/logo_fabrica.png" alt="Logo Fábrica de Testadores" />
        </div>
        <div className="text-content">
          <p>
            O projeto "Fábrica de Testadores" da UECE é uma iniciativa focada na
            capacitação de alunos e profissionais em testes de software com
            ênfase em segurança e qualidade de software. Ele visa reunir
            recursos da literatura, desenvolver materiais didáticos e oferecer
            palestras e minicursos abertos à comunidade.
          </p>
          <p>
            O objetivo é garantir a confiabilidade, o desempenho e a satisfação
            do usuário, ao mesmo tempo que reduz riscos e custos. As técnicas de
            teste de software incluem verificação e validação. Ambos são
            componentes essenciais do processo de teste, contribuindo para a
            qualidade geral e o sucesso do software.
          </p>
          <p>
            Alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU,
            especialmente as metas 4.3 e 4.4, o projeto busca promover a igualdade
            de acesso à educação técnica, profissional e superior de qualidade,
            garantindo oportunidades a preços acessíveis para todos. Além disso,
            visa ampliar o número de jovens e adultos com competências técnicas e
            profissionais relevantes, contribuindo para o emprego, o trabalho decente
            e o empreendedorismo até 2030.
          </p>
        </div>
      </section>
    </>
  );
}
