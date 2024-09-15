import { useState } from 'react'
import { Bell, Search, Calendar, Clock, Users, FileText, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

export default function Component() {
  const [currentDate] = useState(new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  
  const citasHoy = [
    { hora: '09:00', paciente: 'María García', tipo: 'Consulta General' },
    { hora: '10:30', paciente: 'Juan Pérez', tipo: 'Seguimiento' },
    { hora: '12:00', paciente: 'Ana Martínez', tipo: 'Primera Visita' },
  ]

  const proximasCitas = [
    { fecha: 'Mañana', hora: '11:00', paciente: 'Carlos Rodríguez', tipo: 'Consulta General' },
    { fecha: '15 May', hora: '15:30', paciente: 'Laura Sánchez', tipo: 'Seguimiento' },
    { fecha: '16 May', hora: '10:00', paciente: 'Pedro Gómez', tipo: 'Primera Visita' },
  ]

  const notificaciones = [
    { id: 1, mensaje: 'Resultados de laboratorio disponibles para María García' },
    { id: 2, mensaje: 'Recordatorio: Actualizar historia clínica de Juan Pérez' },
    { id: 3, mensaje: 'Nueva política de higiene implementada en la clínica' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hola Dr. Alejandro!</h1>
          <p className="text-gray-600 text-sm">Es bueno verte de nuevo.</p>
        </div>
       
      </header>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar pacientes, citas, historias clínicas..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Citas completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Citas pendientes hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Próximas citas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Citas de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {citasHoy.map((cita, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{cita.hora} - {cita.paciente}</span>
                  <Badge>{cita.tipo}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notificaciones.map((notificacion) => (
                <li key={notificacion.id} className="flex items-start">
                  <Badge variant="secondary" className="mr-2 mt-1">Nuevo</Badge>
                  <span>{notificacion.mensaje}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Estadísticas Clave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Users className="mr-2" /> Pacientes Atendidos Hoy</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><FileText className="mr-2" /> Historias Actualizadas</span>
                <span className="font-bold">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><TrendingUp className="mr-2" /> Eficiencia de Consultas</span>
                <span className="font-bold">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" />
              Próximas Citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {proximasCitas.map((cita, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{cita.fecha} {cita.hora} - {cita.paciente}</span>
                  <Badge>{cita.tipo}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}