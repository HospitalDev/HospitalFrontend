"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ChevronLeft, ChevronRight, Calendar, ClipboardList, Home, Users } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

import Dashboard1 from '@/app/pages/HistoriasClinicas/Doctor/Dashboard/page'
import ListPacientes from '@/app/pages/HistoriasClinicas/Doctor/ListarPacientes/page'

// Componentes para las diferentes vistas
function Dashboard() {
  return <Dashboard1/>
}

function RegistrarPaciente() {
  return <div>Formulario para registrar un paciente</div>
}

function ListarPacientes() {
  return <ListPacientes/>
}

function AgendarCitas() {
  return <div>Formulario para agendar una cita</div>
}

const sidebarItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Users, label: "Registrar Paciente" },
  { icon: ClipboardList, label: "Listar Pacientes" },
  { icon: Calendar, label: "Agendar Citas" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nueva cita programada" },
    { id: 2, text: "Recordatorio: Actualizar historial" },
  ])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  const clearNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  // Función que renderiza el contenido en el main según el activeItem
  const renderMainContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />
      case "Registrar Paciente":
        return <RegistrarPaciente />
      case "Listar Pacientes":
        return <ListarPacientes />
      case "Agendar Citas":
        return <AgendarCitas />
      default:
        return <div>Seleccione una opción</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? 240 : 80 }}
        className="bg-white shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-4">
          <AnimatePresence>
            {isExpanded && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold text-primary"
              >
                ClinicApp
              </motion.h1>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-primary transition-colors"
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 ${
                  activeItem === item.label ? "bg-primary/10 text-primary" : "text-gray-600"
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                <item.icon className="h-5 w-5 mr-4" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
              {!isExpanded && (
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </div>
              )}
            </motion.div>
          ))}
        </nav>
      </motion.aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h2 className="text-2xl font-semibold text-gray-800">{activeItem}</h2>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <DropdownMenuItem key={notif.id} onSelect={() => clearNotification(notif.id)}>
                          {notif.text}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled>No hay notificaciones</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Nombre" />
                        <AvatarFallback>DN</AvatarFallback>
                      </Avatar>
                      <span>Dr. Nombre</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configuración</DropdownMenuItem>
                    <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderMainContent()}
        </main>
      </div>
    </div>
  )
}
