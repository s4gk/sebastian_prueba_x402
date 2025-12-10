"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PaymentForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("0.01");
  const [wallet, setWallet] = useState(
    "0x1234567890abcdef1234567890abcdef12345678"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui esto es una validación basica de wallet, deberiamos usar expresiones regulares o algo para validar que el wallet es valido
    if (!wallet.startsWith("0x") || wallet.length < 42) {
      alert(
        "Por favor, ingresa una dirección de wallet EVM válida (debe empezar con 0x y ser larga)."
      );
      return;
    }

    const params = new URLSearchParams({
      price: `$${amount}`,
      wallet: wallet,
      desc: `Pago por ${amount} USD para la wallet ${wallet.slice(0, 6)}...`,
    }).toString();

    // Aqui se redirige a la ruta protegida con los parámetros.
    router.push(`/premium/checkout?${params}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Tarjeta del formulario */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          💳 Configurar Pago Dinámico
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Monto */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Monto a Enviar (USD)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500">$</span>
              </div>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                className="block w-full rounded-md border-gray-300 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 text-base border text-gray-900"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Campo Wallet */}
          <div>
            <label
              htmlFor="wallet"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Wallet del Comerciante
            </label>
            <input
              id="wallet"
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..."
              required
              className="block w-full rounded-md border-gray-300 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 text-base border text-gray-900"
            />
          </div>

          {/* Botón de Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            🚀 Pagar Ahora y Redirigir
          </button>
        </form>
      </div>
    </div>
  );
}
