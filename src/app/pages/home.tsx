"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { MessageCircle, ArrowRight, HeadphonesIcon, Building2, MonitorSmartphone, Sun, Moon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"

const doctors = [
    { id: 1, name: "Dr. Alex Smith", specialty: "Cardiólogo", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Dra. Emily Johnson", specialty: "Neuróloga", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Dr. Michael Brown", specialty: "Pediatra", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Dr. Alex Smith", specialty: "Cardiólogo", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Dra. Emily Johnson", specialty: "Neuróloga", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Dr. Michael Brown", specialty: "Pediatra", image: "/placeholder.svg?height=100&width=100" },
]

const services = [
    { title: "Registro de Historias Clínicas", description: "Sistema integral para el manejo de historiales médicos de pacientes.", route: "/pages/Login/Historias-Clinicas" },
    { title: "Asignación de Interacción de Salas Hospitalarias", description: "Gestión eficiente de salas y recursos hospitalarios." , route: "" },
    { title: "Planillas de RRHH para Hospitales", description: "Sistema de gestión de recursos humanos especializado para entornos hospitalarios." , route: ""  },
    { title: "Gestión de Inventario Hospitalario", description: "Control y seguimiento de insumos y equipamiento médico." , route: ""  },
]

const reviews = [
    { id: 1, name: "Hospital Central", comment: "El sistema de historias clínicas ha mejorado significativamente nuestra eficiencia.", rating: 5 },
    { id: 2, name: "Clínica San Rafael", comment: "La gestión de salas es ahora mucho más sencilla y efectiva.", rating: 4 },
    { id: 3, name: "Centro Médico Esperanza", comment: "El módulo de RRHH ha simplificado enormemente nuestros procesos administrativos.", rating: 5 },
]

export default function Component() {
    const [activeSection, setActiveSection] = useState('home')
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedModule, setSelectedModule] = useState('')
    const router = useRouter()

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

    const handleModuleSelection = (route: string) => {
        setIsModalOpen(false) 
        router.push(route)
       
        
      }

    const renderSection = () => {
        switch (activeSection) {
            case 'doctor':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <Card key={doctor.id} className="backdrop-blur-md bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20">
                                <CardContent className="p-6">
                                    <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-center mb-2">{doctor.name}</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            case 'services':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <Card key={index} className="backdrop-blur-md bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            case 'review':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <Card key={review.id} className="backdrop-blur-md bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-2">{review.comment}</p>
                                    <div className="flex items-center">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            default:
                return (
                    <div className="text-center">
                        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
                            👋 Bienvenido a Healthcare
                        </div>
                        <h1 className="text-4xl font-bold mb-4">
                            Para clínicas privadas<br />
                            y centros médicos
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            La buena salud es un estado de bienestar mental, físico y social<br />
                            ¡y no solo significa la ausencia de enfermedad!
                        </p>
                        <div className="flex justify-center space-x-4">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white rounded-full">
                    Comenzar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[475px] bg-white bg-opacity-20 ">
                  <DialogHeader>
                    <DialogTitle>Elige un modulo</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {services.map((service, index) => (
                      <Button
                      key={index}
                      onClick={() => handleModuleSelection(service.route)}
                      className="justify-start text-left"
                    >
                      {service.title}
                    </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
        
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="flex-grow backdrop-blur-md bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20">
                <header className="flex justify-between items-center p-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">H</span>
                        </div>
                        <span className="font-bold text-xl">Salud</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <button onClick={() => setActiveSection('home')} className={`font-medium ${activeSection === 'home' ? 'text-blue-600' : ''}`}>Inicio</button>
                        <button onClick={() => setActiveSection('doctor')} className={`font-medium ${activeSection === 'doctor' ? 'text-blue-600' : ''}`}>Doctores</button>
                        <button onClick={() => setActiveSection('services')} className={`font-medium ${activeSection === 'services' ? 'text-blue-600' : ''}`}>Servicios</button>
                        <button onClick={() => setActiveSection('review')} className={`font-medium ${activeSection === 'review' ? 'text-blue-600' : ''}`}>Opiniones</button>
                    </nav>
                    <div className="flex items-center space-x-4">
                        
                        <Button onClick={toggleDarkMode} variant="ghost" className="p-2">
                            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                        </Button>
                    </div>
                </header>
                <main className="p-4">
                    {renderSection()}
                </main>
            </div>
            <footer className="bg-blue-600 text-white py-8 px-4 mt-12 rounded-t-3xl">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
            <p className="text-sm">Ofrecemos soluciones integrales de atención médica para clínicas y hospitales.</p>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
                <li>Gestión de Historias Clínicas</li>
                <li>Gestión de Inventario Hospitalario</li>
                <li>Programación de Pacientes</li>
            </ul>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <p className="text-sm">info@healthapp.com</p>
            <p className="text-sm">+123 456 7890</p>
        </div>
    </div>
</footer>

        </div>
    )
}
