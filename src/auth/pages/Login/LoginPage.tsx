import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Apple, Google, Meta } from "@/auth/components/Icons"
import { CustomLogo } from "@/components/custom/CustomLogo"

export function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <CustomLogo />
                <p className="text-balance text-muted-foreground mt-1">Inicia sesión en tu cuenta de Acme Inc</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required placeholder="Contraseña" />
              </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">O continúa con</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  <Apple />
                  <span className="sr-only">Iniciar sesión con Apple</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <Google />
                  <span className="sr-only">Iniciar sesión con Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <Meta />
                  <span className="sr-only">Iniciar sesión con Meta</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link to="/auth/register" className="underline underline-offset-4"> Registrate </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Imagen"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al hacer clic en continuar, aceptas nuestros <a href="#">Términos del Servicio</a> y la <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  )
}