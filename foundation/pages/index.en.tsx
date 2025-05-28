import React from 'react';
import Image from 'next/image';

export default function FoundationManifestoEN() {
  return (
    <main className='bg-gradient-to-b from-white via-green-50 to-white min-h-screen text-gray-900 px-6 py-12 font-sans'>
      <div className='max-w-5xl mx-auto space-y-16'>
        <section>
          <h1 className='text-5xl font-extrabold mb-4 text-green-800'>
            🌿 GrowHardware Foundation
          </h1>
          <p className='text-lg text-gray-700 max-w-3xl'>
            A free network of human and technological collaboration to drive the
            future of intelligent cultivation networks. Our mission is to create
            a free, fair, and replicable infrastructure so that any community
            can design, automate, and understand their own productive
            environments.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🧬 Fractal Philosophy
          </h2>
          <p className='text-gray-800'>
            Inspired by natural patterns, GrowHardware proposes an architecture
            that replicates at any scale: from an ESP32 controlling a single
            grow to a Raspberry Pi orchestrating multiple nodes in a rural
            cooperative. Each unit is both a part and a whole. Where there was
            hierarchy, now there is distributed autonomy.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🌐 Living Medullas
          </h2>
          <p className='text-gray-800'>
            Water, light, air, temperature, humidity. These are our "medullas":
            vital concepts translated into sensors, data, and automation. By
            abstracting them as living system components, we create a universal
            language that any community can adopt and evolve.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🌱 Growers who code, coders who grow
          </h2>
          <p className='text-gray-800'>
            GrowHardware is born at the intersection of knowledge. People who
            grow plants learn electronics. Software engineers learn to grow.
            Here, knowledge has no owner: it is exchanged, nurtured, and blooms.
            This fusion is the living root of our technology. Whether you're
            from code or cultivation—this is your place.
          </p>
          <div className='pt-6'>
            <Image
              src='/community-hands-code-plant.png'
              alt='Illustration of hands growing with code and plant'
              width={800}
              height={500}
              className='rounded-xl shadow-lg mx-auto'
            />
          </div>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🔗 Community Intelligence
          </h2>
          <p className='text-gray-800'>
            GrowHardware connects not only sensors, but communities. Our
            platform promotes data traceability, real process control, and
            collective improvement. The AI is trained with open data from
            multiple nodes: a popular intelligence that evolves with the people.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            ⚖️ A Foundation, not a Corporation
          </h2>
          <p className='text-gray-800'>
            The GrowHardware Foundation is the custodian of protocols, licenses,
            and ethical guidelines behind the project. We don't seek to
            monopolize or control: we release code, document learnings, and give
            every improvement back to the community.
          </p>
        </section>

        <section>
          <h2 className='text-3xl font-semibold text-green-700'>
            🕸️ Ethical Comparison
          </h2>
          <div className='overflow-x-auto mt-4'>
            <table className='table-auto w-full border text-sm border-gray-300'>
              <thead className='bg-green-100'>
                <tr>
                  <th className='border px-3 py-2'>Project</th>
                  <th className='border px-3 py-2'>Approach</th>
                  <th className='border px-3 py-2'>Our Ethical Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border px-3 py-2'>FarmBot</td>
                  <td className='border px-3 py-2'>
                    Hardware-based automation
                  </td>
                  <td className='border px-3 py-2'>
                    Closed and expensive model. We open up, share, and lower the
                    entry barrier.
                  </td>
                </tr>
                <tr>
                  <td className='border px-3 py-2'>OpenAg</td>
                  <td className='border px-3 py-2'>
                    Controlled academic experimentation
                  </td>
                  <td className='border px-3 py-2'>
                    Lab-built, not born from community needs. GrowHardware grows
                    from real cultivation.
                  </td>
                </tr>
                <tr>
                  <td className='border px-3 py-2'>Open Source Ecology</td>
                  <td className='border px-3 py-2'>
                    Network of open physical tools
                  </td>
                  <td className='border px-3 py-2'>
                    We focus on living systems, live data, and intelligent
                    environmental control.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-green-700'>
            📢 Join the Living Revolution
          </h2>
          <p className='text-gray-800'>
            If your community cultivates, builds, educates, or imagines a more
            autonomous and fair future—GrowHardware is for you. You can
            contribute with code, ideas, data, or seeds. This is not just a
            software stack. It’s a cultural project.
          </p>
        </section>

        <footer className='text-center text-sm text-gray-500 pt-16'>
          GrowHardware Foundation • Free to grow with you 🌍
        </footer>
      </div>
    </main>
  );
}
