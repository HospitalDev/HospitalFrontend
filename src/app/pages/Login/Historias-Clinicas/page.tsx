'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'  // Importa el hook useRouter
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Sun, Moon, ArrowLeft } from 'lucide-react'

export default function HealthcareLogin() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeRole, setActiveRole] = useState<Role>('patient')
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter();  // Instancia de useRouter

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  type Role = 'patient' | 'doctor' | 'admin';

  const roleContent: Record<Role, {
    title: string;
    description: string;
    fields: { name: string; label: string; type: string }[];
  }> = {
    patient: {
      title: "Patient Login",
      description: "Access your health records and appointments",
      fields: [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" }
      ]
    },
    doctor: {
      title: "Doctor Portal",
      description: "Manage your patients and schedule",
      fields: [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" }
      ]
    },
    admin: {
      title: "Admin Dashboard",
      description: "Oversee system operations and user management",
      fields: [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" }
      ]
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Redirigir según el rol activo
    if (activeRole === 'patient') {
      router.push('/pages/HistoriasClinicas/Doctor')  
    } else if (activeRole === 'doctor') {
      router.push('/pages/HistoriasClinicas/Doctor')
    } else if (activeRole === 'admin') {
      router.push('/admin/dashboard')
    }
  }

  const renderLoginForm = (role: Role) => (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <CardTitle>{roleContent[role].title}</CardTitle>
        <CardDescription>{roleContent[role].description}</CardDescription>
        {roleContent[role].fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input id={field.name} type={field.type} required />
          </div>
        ))}
      </div>
      <Button className="w-full mt-4" type="submit">
        Login
      </Button>
    </form>
  )

  const renderDoctorRegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardTitle>Doctor Registration</CardTitle>
      <CardDescription>Create your doctor account to join our healthcare platform</CardDescription>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombres">First Name</Label>
          <Input id="nombres" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellidos">Last Name</Label>
          <Input id="apellidos" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fecha_nacimiento">Date of Birth</Label>
          <Input id="fecha_nacimiento" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genero">Gender</Label>
          <Select>
            <SelectTrigger id="genero">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ciudad">City</Label>
          <Input id="ciudad" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pais_nacimiento">Country of Birth</Label>
          <Input id="pais_nacimiento" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="especializacion">Specialization</Label>
          <Input id="especializacion" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="correo">Email</Label>
          <Input id="correo" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Phone</Label>
          <Input id="telefono" type="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="foto">Profile Photo</Label>
        <Input id="foto" type="file" accept="image/*" />
      </div>
      <Button className="w-full" type="submit">
        Register
      </Button>
    </form>
  )

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Card className="w-full max-w-4xl backdrop-blur-md bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Healthcare Portal</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <CardDescription>
            {isRegistering ? "Create your doctor account" : "Select your role to access the system"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!isRegistering ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Tabs defaultValue="patient" className="w-full" onValueChange={(value) => setActiveRole(value as Role)}>
                  <TabsList className="grid w-full grid-cols-3">
                    {Object.keys(roleContent).map((role) => (
                      <TabsTrigger key={role} value={role}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </motion.div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRole}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value={activeRole} className="mt-4">
                        {renderLoginForm(activeRole)}
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderDoctorRegistrationForm()}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          {isRegistering ? (
            <Button variant="ghost" className="w-full" onClick={() => setIsRegistering(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
            </Button>
          ) : (
            <Button variant="link" className="w-full" onClick={() => setIsRegistering(true)}>
              New doctor? Create an account
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
