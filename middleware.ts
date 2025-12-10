import { paymentMiddleware } from "x402-next";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Obtener los valores dinámicos de los parámetros de búsqueda (Search Params)
  const searchParams = request.nextUrl.searchParams;

  const price = searchParams.get("price");
  const wallet = searchParams.get("wallet");
  const description = searchParams.get("desc");

  // Validar que tenemos los datos necesarios
  if (!price || !wallet || !description) {
    console.log("Datos de pago incompletos. Redirigiendo a /pago-config");
    return NextResponse.redirect(new URL("/pago-config", request.url));
  }

  // Tipado de Seguridad: El tipo 'wallet' debe ser una dirección EVM.
  const merchantWallet = wallet as `0x${string}`;

  // Devolver la función paymentMiddleware configurada con los valores dinámicos
  return paymentMiddleware(
    merchantWallet,
    {
      [request.nextUrl.pathname]: {
        price: price,
        network: "base",
        config: {
          description: description,
        },
      },
    },
    {
      url: "https://facilitator.ultravioletadao.xyz",
    }
  )(request);
}

export const config = {
  // Solo se activa cuando se accede a /premium/checkout, por ejemplo
  matcher: ["/premium/checkout"],
};
