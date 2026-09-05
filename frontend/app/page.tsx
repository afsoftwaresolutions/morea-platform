'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  active: boolean;
  imageUrl?: string;
}

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );

        if (!response.ok) {
          throw new Error('Error cargando productos');
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

  }, []);

  const activeProducts = products.filter(
    (product) => product.active
  );

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#3f2f26]">
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#eadccd]"
          aria-label="Abrir menú"
        >
          <div className="flex w-6 flex-col gap-[5px]">
            <span className="h-[2px] w-full bg-[#3f2f26]" />
            <span className="h-[2px] w-4 bg-[#3f2f26]" />
            <span className="h-[2px] w-full bg-[#3f2f26]" />
          </div>
        </button>

        <h1 className="text-2xl font-semibold tracking-[0.25em]">MOREA</h1>

        <button className="text-2xl" aria-label="Carrito">
          🛒
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[#fffaf3] p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#a35f48]">
                  Belleza natural
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[0.25em] text-[#3f2f26]">
                  MOREA
                </h2>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2e4d4] text-2xl text-[#6e4432] transition hover:bg-[#e5cdb8]"
                aria-label="Cerrar menú"
              >
                ×
              </button>
            </div>

            <nav className="mt-12 flex flex-col">
              {[
                ['Inicio', '#inicio'],
                ['Productos', '#productos'],
                ['Nosotros', '#nosotros'],
                ['Contacto', '#contacto'],
                ['Carrito', '#carrito'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[#eadccd] py-5 text-lg text-[#4b382e] transition hover:pl-2 hover:text-[#a35f48]"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="absolute bottom-8 left-8 right-8 border-t border-[#dfcdbd] pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#a35f48]">
                Síguenos
              </p>

              <div className="mt-4 flex gap-5 text-sm text-[#5f4b40]">
                <a href="#" className="hover:text-[#a35f48]">
                  Instagram
                </a>

                <a href="#" className="hover:text-[#a35f48]">
                  WhatsApp
                </a>
              </div>

              <p className="mt-6 text-xs text-[#9a877c]">
                Morea by Tatiana López
              </p>
            </div>
          </aside>
        </div>
      )}

      <section
        id="inicio"
        className="grid min-h-[80vh] items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-10 lg:px-20"
      >
        <div>
          <p className="mb-4 uppercase tracking-[0.3em] text-[#a35f48]">
            Belleza natural
          </p>

          <h2 className="max-w-xl text-5xl font-semibold leading-tight md:text-6xl">
            Broncea tu piel de forma natural
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#6d5a50]">
            Descubre el poder del café y de ingredientes seleccionados para
            realzar tu piel con un bronceado cálido, uniforme y natural.
          </p>

          <button className="mt-8 rounded-full bg-[#9a5c43] px-8 py-4 text-white transition hover:bg-[#7e4936]">
            Comprar ahora
          </button>
        </div>

        
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#dfc2a4] shadow-lg md:min-h-[520px]">
          {activeProducts[0]?.imageUrl ? (
            <Image
              src={activeProducts[0].imageUrl}
              alt={activeProducts[0].name}
              fill
              loading="eager"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center">
              <p className="text-[#7e4936]">Imagen principal Morea</p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {activeProducts[0] && (
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <p className="text-sm uppercase tracking-[0.25em]">
                Producto destacado
              </p>

              <h3 className="mt-2 text-3xl font-semibold">
                {activeProducts[0].name}
              </h3>

              <p className="mt-2 text-lg">
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  maximumFractionDigits: 0,
                }).format(Number(activeProducts[0].price))}
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="productos" className="bg-[#fffaf3] px-6 py-20 md:px-10 lg:px-20">
        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.3em] text-[#a35f48]">
            Nuestros productos
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Hechos para resaltar tu belleza
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {loading && (
            <p className="col-span-full text-center text-[#6d5a50]">
              Cargando productos...
            </p>
          )}

          {!loading && products.length === 0 && (
            <p className="col-span-full text-center text-[#6d5a50]">
              No hay productos disponibles.
            </p>
          )}

          {products
            .filter((product) => product.active)
            .map((product, index) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[2rem] bg-[#f2e4d4] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-80 overflow-hidden bg-[#d7b394]">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[#6e4432]">
                        Imagen no disponible
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-[#6d5a50]">
                    {product.description}
                  </p>

                  <p className="mt-5 text-xl font-semibold">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      maximumFractionDigits: 0,
                    }).format(Number(product.price))}
                  </p>

                  <p className="mt-2 text-sm text-[#7c685d]">
                    {product.stock > 0
                      ? `${product.stock} disponibles`
                      : 'Agotado'}
                  </p>

                  <button
                    disabled={product.stock === 0}
                    className="mt-5 w-full rounded-full bg-[#9a5c43] py-3 text-white transition hover:bg-[#7e4936] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Ver producto
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 lg:px-20">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <p className="text-4xl">☕</p>
            <h3 className="mt-4 text-xl font-semibold">Café natural</h3>
            <p className="mt-2 text-[#6d5a50]">
              Inspirado en ingredientes naturales y en el cuidado consciente.
            </p>
          </div>

          <div>
            <p className="text-4xl">🌿</p>
            <h3 className="mt-4 text-xl font-semibold">
              Ingredientes seleccionados
            </h3>
            <p className="mt-2 text-[#6d5a50]">
              Pensados para complementar tu rutina de cuidado corporal.
            </p>
          </div>

          <div>
            <p className="text-4xl">✨</p>
            <h3 className="mt-4 text-xl font-semibold">Acabado uniforme</h3>
            <p className="mt-2 text-[#6d5a50]">
              Una experiencia pensada para resaltar naturalmente tu piel.
            </p>
          </div>
        </div>
      </section>

      <section
        id="nosotros"
        className="bg-[#c77d62] px-6 py-20 text-white md:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="uppercase tracking-[0.3em]">Sobre Morea</p>

          <h2 className="mt-4 text-4xl font-semibold">
            Belleza auténtica y consciente
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/90">
            Morea nace para crear productos que acompañen momentos de cuidado,
            confianza y conexión con la belleza natural.
          </p>
        </div>
      </section>

      <footer
        id="contacto"
        className="bg-[#3f2f26] px-6 py-10 text-center text-[#f7f1e8]"
      >
        <p className="text-xl font-semibold tracking-[0.2em]">MOREA</p>

        <p className="mt-4 text-sm text-[#d8c7b8]">
          Morea by Tatiana López
        </p>
      </footer>
    </main>
  );
}