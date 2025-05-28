import React from 'react';
import Image from 'next/image';

export default function FoundationManifesto() {
  return (
    <main className='bg-gradient-to-b from-white via-green-50 to-white min-h-screen text-gray-900 px-6 py-12 font-sans'>
      <div className='max-w-5xl mx-auto space-y-16'>
        <section>
          <h1 className='text-5xl font-extrabold mb-4 text-green-800'>
            🌿 GrowHardware Foundation
          </h1>
          <p className='text-lg text-gray-700 max-w-3xl'>
            Una red libre de colaboración humana y tecnológica para impulsar las
            futuras redes de cultivos inteligentes. Nuestra misión es crear una
            infraestructura libre, justa y replicable para que cualquier
            comunidad pueda diseñar, automatizar y entender sus propios
            ambientes de producción.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🧬 Filosofía Fractal
          </h2>
          <p className='text-gray-800'>
            Inspirados por los patrones de la naturaleza, GrowHardware propone
            una arquitectura que se replica en cualquier escala: desde un ESP32
            controlando un solo cultivo hasta una Raspberry Pi orquestando
            múltiples nodos en una cooperativa rural. Cada unidad es parte y
            todo a la vez. Donde antes había jerarquía, ahora hay autarquía
            distribuida.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🌐 Médulas Vivas
          </h2>
          <p className='text-gray-800'>
            Agua, luz, aire, temperatura, humedad. Estas son nuestras "médulas":
            conceptos vitales que se traducen en sensores, datos y automatismos.
            Al abstraerlas como componentes vivos del sistema, creamos un
            lenguaje universal que cualquier comunidad puede adaptar y mejorar.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🌱 Cultivadores que programan, programadores que cultivan
          </h2>
          <p className='text-gray-800'>
            GrowHardware nace del encuentro entre saberes. Personas que cultivan
            aprendiendo electrónica. Técnicos de software aprendiendo a sembrar.
            Aquí el conocimiento no tiene dueño: se intercambia, se riega,
            florece. Esta fusión es la raíz viva de nuestra tecnología. No
            importa si venís del código o del cultivo: este es tu lugar.
          </p>
          <div className='pt-6'>
            <Image
              src='/community-hands-code-plant.png'
              alt='Ilustración de manos cultivando con código y planta'
              width={800}
              height={500}
              className='rounded-xl shadow-lg mx-auto'
            />
          </div>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🔗 Inteligencia Comunitaria
          </h2>
          <p className='text-gray-800'>
            GrowHardware no sólo conecta sensores, sino también comunidades.
            Nuestra plataforma promueve la trazabilidad de los datos, el control
            real de los procesos y la posibilidad de mejorar de forma colectiva.
            La IA se entrena con los datos abiertos de múltiples nodos: una
            inteligencia popular que evoluciona con la comunidad.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            ⚖️ Una Fundación, no una corporación
          </h2>
          <p className='text-gray-800'>
            La Fundación GrowHardware es la custodio de los protocolos,
            licencias y lineamientos éticos que sostienen el proyecto. No
            buscamos monopolizar ni controlar: liberamos el código, documentamos
            los aprendizajes y devolvemos a la comunidad cada mejora.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🕸️ Comparativa ética
          </h2>
          <div className='overflow-x-auto mt-4'>
            <table className='table-auto w-full border text-sm border-gray-300'>
              <thead className='bg-green-100'>
                <tr>
                  <th className='border px-3 py-2'>Proyecto</th>
                  <th className='border px-3 py-2'>Enfoque</th>
                  <th className='border px-3 py-2'>Nuestra diferencia ética</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border px-3 py-2'>FarmBot</td>
                  <td className='border px-3 py-2'>
                    Automatización con enfoque en hardware
                  </td>
                  <td className='border px-3 py-2'>
                    Modelo cerrado y costoso. Nosotros abrimos, compartimos y
                    bajamos la barrera de entrada.
                  </td>
                </tr>
                <tr>
                  <td className='border px-3 py-2'>OpenAg</td>
                  <td className='border px-3 py-2'>
                    Experimentación controlada académica
                  </td>
                  <td className='border px-3 py-2'>
                    Creado en laboratorio, no desde la necesidad comunitaria.
                    GrowHardware nace desde el cultivo real.
                  </td>
                </tr>
                <tr>
                  <td className='border px-3 py-2'>Open Source Ecology</td>
                  <td className='border px-3 py-2'>
                    Red de herramientas físicas libres
                  </td>
                  <td className='border px-3 py-2'>
                    Nosotros nos enfocamos en sistemas vivos, datos vivos y
                    control ambiental inteligente.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-green-700'>
            📢 Únete a la revolución viviente
          </h2>
          <p className='text-gray-800'>
            Si tu comunidad cultiva, fabrica, educa o imagina un futuro más
            autónomo y justo, GrowHardware es para vos. Podés colaborar con
            código, ideas, datos o sembrando. Este no es solo un stack de
            software. Es un proyecto cultural.
          </p>
        </section>

        <footer className='text-center text-sm text-gray-500 pt-16'>
          Fundación GrowHardware • Libre para crecer con vos 🌍
        </footer>
      </div>
    </main>
  );
}
