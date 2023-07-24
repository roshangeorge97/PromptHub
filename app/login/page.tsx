import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth";

import LoginForm from "./login-form";

export default async function LoginPage() { 
  const session = await getSession()
  if (session) {
    return redirect('/discover')
  }
  
  return (
    <div className="mx-auto max-w-sm h-[400px] md:h-[600px] flex items-center">
      <LoginForm />
    </div>
  )
}
