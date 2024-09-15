import { useState, useMemo } from 'react'
import { Search, Edit, Trash2, UserPlus, MoreVertical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Badge } from "@/app/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

// Definimos el tipo de `Patient` para tipar correctamente los pacientes
interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
  carnet: string;
  occupation: string;
  status: string;
  photo: string;
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterCriteria, setFilterCriteria] = useState<string>('todos')
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'María García', gender: 'Femenino', age: 35, carnet: 'A123456', occupation: 'Ingeniera', status: 'Activo', photo: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Juan Pérez', gender: 'Masculino', age: 42, carnet: 'B789012', occupation: 'Profesor', status: 'Inactivo', photo: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Ana Martínez', gender: 'Femenino', age: 28, carnet: 'C345678', occupation: 'Médica', status: 'En tratamiento', photo: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'Carlos Rodríguez', gender: 'Masculino', age: 50, carnet: 'D901234', occupation: 'Abogado', status: 'Recuperado', photo: '/placeholder.svg?height=40&width=40' },
  ])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (value: string) => {
    setFilterCriteria(value)
  }

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            patient.carnet.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterCriteria === 'todos' || patient.status.toLowerCase() === filterCriteria.toLowerCase()
      return matchesSearch && matchesFilter
    })
  }, [patients, searchTerm, filterCriteria])

  const handleDelete = (id: number) => {
    setPatients(patients.filter(patient => patient.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo': return 'bg-green-100 text-green-800'
      case 'inactivo': return 'bg-red-100 text-red-800'
      case 'en tratamiento': return 'bg-yellow-100 text-yellow-800'
      case 'recuperado': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Paciente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input id="name" placeholder="Nombre completo" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <Input id="age" type="number" placeholder="Edad" />
              <Input id="carnet" placeholder="Número de carnet" />
              <Input id="occupation" placeholder="Ocupación" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="en tratamiento">En tratamiento</SelectItem>
                  <SelectItem value="recuperado">Recuperado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Guardar Paciente</Button>
          </DialogContent>
        </Dialog>
      </header>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar pacientes por nombre o carnet..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="en tratamiento">En tratamiento</SelectItem>
                <SelectItem value="recuperado">Recuperado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Género</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Carnet</TableHead>
                <TableHead>Ocupación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={patient.photo} alt={patient.name} />
                      <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.carnet}</TableCell>
                  <TableCell>{patient.occupation}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(patient.status)} font-semibold`}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Paciente</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Input id="edit-name" defaultValue={patient.name} />
                            <Select defaultValue={patient.gender}>
                              <SelectTrigger>
                                <SelectValue placeholder="Género" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="masculino">Masculino</SelectItem>
                                <SelectItem value="femenino">Femenino</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input id="edit-age" type="number" defaultValue={patient.age} />
                            <Input id="edit-carnet" defaultValue={patient.carnet} />
                            <Input id="edit-occupation" defaultValue={patient.occupation} />
                            <Select defaultValue={patient.status}>
                              <SelectTrigger>
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                                <SelectItem value="en tratamiento">En tratamiento</SelectItem>
                                <SelectItem value="recuperado">Recuperado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">Guardar Cambios</Button>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
