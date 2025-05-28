import React from 'react';
import Image from 'next/image';

export default function FoundationManifestoPT() {
  return (
    <main className='bg-gradient-to-b from-white via-green-50 to-white min-h-screen text-gray-900 px-6 py-12 font-sans'>
      <div className='max-w-5xl mx-auto space-y-16'>
        <section>
          <h1 className='text-5xl font-extrabold mb-4 text-green-800'>
            🌿 Fundação GrowHardware
          </h1>
          <p className='text-lg text-gray-700 max-w-3xl'>
            Uma rede livre de colaboração humana e tecnológica para impulsionar
            o futuro das redes de cultivo inteligente. Nossa missão é criar uma
            infraestrutura livre, justa e replicável para que qualquer
            comunidade possa projetar, automatizar e compreender seus próprios
            ambientes produtivos.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🧬 Filosofia Fractal
          </h2>
          <p className='text-gray-800'>
            Inspirada nos padrões da natureza, a GrowHardware propõe uma
            arquitetura que se replica em qualquer escala: desde um ESP32
            controlando um único cultivo até um Raspberry Pi orquestrando vários
            nós em uma cooperativa rural. Cada unidade é parte e todo ao mesmo
            tempo. Onde havia hierarquia, agora há autonomia distribuída.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🌐 Medulas Vivas
          </h2>
          <p className='text-gray-800'>
            Água, luz, ar, temperatura, umidade. Estas são nossas "medulas":
            conceitos vitais traduzidos em sensores, dados e automação. Ao
            abstraí-los como componentes vivos do sistema, criamos uma linguagem
            universal que qualquer comunidade pode adotar e evoluir.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🌱 Cultivadores que programam, programadores que cultivam
          </h2>
          <p className='text-gray-800'>
            A GrowHardware nasce no cruzamento de saberes. Pessoas que cultivam
            aprendendo eletrônica. Técnicos de software aprendendo a plantar.
            Aqui o conhecimento não tem dono: se compartilha, se rega, floresce.
            Essa fusão é a raiz viva da nossa tecnologia. Seja do código ou da
            terra—este é o seu lugar.
          </p>
          <div className='pt-6'>
            <Image
              src='/community-hands-code-plant.png'
              alt='Ilustração de mãos cultivando com código e planta'
              width={800}
              height={500}
              className='rounded-xl shadow-lg mx-auto'
            />
          </div>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🔗 Inteligência Comunitária
          </h2>
          <p className='text-gray-800'>
            A GrowHardware conecta não apenas sensores, mas também comunidades.
            Nossa plataforma promove a rastreabilidade dos dados, o controle
            real dos processos e a melhoria coletiva. A IA é treinada com dados
            abertos de múltiplos nós: uma inteligência popular que evolui com as
            pessoas.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            ⚖️ Uma Fundação, não uma Corporação
          </h2>
          <p className='text-gray-800'>
            A Fundação GrowHardware é a guardiã dos protocolos, licenças e
            diretrizes éticas que sustentam o projeto. Não buscamos monopolizar
            ou controlar: liberamos o código, documentamos os aprendizados e
            devolvemos cada melhoria à comunidade.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🕸️ Comparativo Ético
          </h2>
          <div className='overflow-x-auto mt-4'>
            <table className='table-auto w-full border text-sm border-gray-300'>
              <thead className='bg-green-100'>
                <tr>
                  <th className='border px-3 py-2'>Projeto</th>
                  <th className='border px-3 py-2'>Abordagem</th>
                  <th className='border px-3 py-2'>Nossa Diferença Ética</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border px-3 py-2'>FarmBot</td>
                  <td className='border px-3 py-2'>
                    Automação com foco em hardware
                  </td>
                  <td className='border px-3 py-2'>
                    Modelo fechado e caro. Nós abrimos, compartilhamos e
                    reduzimos a barreira de entrada.
                  </td>
                </tr>
                <tr>
                  <td className='border px-3 py-2'>OpenAg</td>
                  <td className='border px-3 py-2'>
                    Experimentação acadêmica controlada
                  </td>
                  <td className='border px-3 py-2'>
                    Criado em laboratório, não a partir de necessidades reais.
                    GrowHardware nasce do cultivo real.
                  </td>
                </tr>
                <tr>
                  <td className='border px-3 py-2'>Open Source Ecology</td>
                  <td className='border px-3 py-2'>
                    Rede de ferramentas físicas livres
                  </td>
                  <td className='border px-3 py-2'>
                    Focamos em sistemas vivos, dados vivos e controle ambiental
                    inteligente.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-green-700'>
            📢 Junte-se à revolução viva
          </h2>
          <p className='text-gray-800'>
            Se sua comunidade cultiva, fabrica, educa ou imagina um futuro mais
            autônomo e justo, a GrowHardware é para você. Você pode colaborar
            com código, ideias, dados ou sementes. Este não é apenas um stack de
            software. É um projeto cultural.
          </p>
        </section>

        <footer className='text-center text-sm text-gray-500 pt-16'>
          Fundação GrowHardware • Livre para crescer com você 🌍
        </footer>
      </div>
    </main>
  );
}
