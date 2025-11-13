import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import { Login_rrhh } from './Modulo de Recursos Humanos/Login_rrhh'
import { HomeAdmin_rrhh } from './Modulo de Recursos Humanos/Admin/HomeAdmin_rrhh'
import { HomeEmpleado_rrhh } from './Modulo de Recursos Humanos/Empleado/HomeEmpleado_rrhh'
import { GestionEmpleados_rrhh } from "./Modulo de Recursos Humanos/Admin/GestionEmpleados_rrhh"
import { EstadoEmpleados_rrhh } from "./Modulo de Recursos Humanos/Admin/EstadoEmpleados_rrhh"
import { NuevoEmpleado_rrhh } from './Modulo de Recursos Humanos/Admin/NuevoEmpleado_rrhh'
import { AsignarRol } from './Modulo de Recursos Humanos/Admin/AsignarRol'
import { ListarEmpleados } from './Modulo de Recursos Humanos/Admin/ListarEmpleados'
import { ProtectedRoute } from './Modulo de Recursos Humanos/ProtectedRoute'
import Unauthorized from './Modulo de Recursos Humanos/Unauthorized'
import { ListarEmpleadosSinCuenta } from './Modulo de Recursos Humanos/Admin/ListarEmpleadosSinCuenta'
import { SolicitarAusencia } from './Modulo de Recursos Humanos/Empleado/SolicitarAusencia'
import { JefeMisEmpleados_rrhh } from './Modulo de Recursos Humanos/Empleado/JefeMisEmpleados_rrhh';
import { JefeSolicitarBaja_rrhh } from './Modulo de Recursos Humanos/Empleado/JefeSolicitarBaja_rrhh';
import { AdminSolicitudesBaja_rrhh } from './Modulo de Recursos Humanos/Admin/AdminSolicitudesBaja_rrhh';
import { VerEstadoSolicitudes } from './Modulo de Recursos Humanos/Empleado/VerEstadoSolicitudes'


function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* Acá añadan sus rutas con el url correspondiente */}

          <Route path="/rrhh/" element={<Login_rrhh/>}></Route>
          <Route path="/rrhh/empleado/" element={
            <ProtectedRoute>
              <HomeEmpleado_rrhh/>
            </ProtectedRoute>
          }></Route>

          <Route path="/rrhh/empleado/solicitarAusencia" element={
            <ProtectedRoute>
              <SolicitarAusencia />
            </ProtectedRoute>
          }></Route>
          <Route path="rrhh/empleado/estadoSolicitud" element={
            <ProtectedRoute>
              <VerEstadoSolicitudes />
            </ProtectedRoute>
          }></Route>


          <Route path="/rrhh/admin/" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <HomeAdmin_rrhh/>
            </ProtectedRoute>
            }></Route>

          <Route path="/rrhh/admin/elegirEmpleado/" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <ListarEmpleados />
            </ProtectedRoute>
            }></Route>
          <Route path="/rrhh/admin/gestion-empleados" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <GestionEmpleados_rrhh />
            </ProtectedRoute>
            } />
          <Route path="/rrhh/admin/gestion-empleados/nuevo-empleado" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <NuevoEmpleado_rrhh />
            </ProtectedRoute>
            } />
          <Route path="/rrhh/admin/estado-empleados" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <EstadoEmpleados_rrhh />
            </ProtectedRoute>
            } />

          <Route path="/rrhh/admin/elegirEmpleado/asignarRol/:idEmpleado" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <AsignarRol />
            </ProtectedRoute>
            }></Route>

          <Route path="rrhh/admin/crearCuentaDeTrabajo" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <ListarEmpleadosSinCuenta />
            </ProtectedRoute>
          }></Route>

          <Route path="/rrhh/jefe/mis-empleados/:idDepto" element={
            <ProtectedRoute requiredRoles={['JEFE_DEPARTAMENTO']}>
              <JefeMisEmpleados_rrhh />
            </ProtectedRoute>
          } />

          <Route path="/rrhh/jefe/solicitar-baja/:idEmpleado" element={
            <ProtectedRoute requiredRoles={['JEFE_DEPARTAMENTO']}>
              <JefeSolicitarBaja_rrhh />
            </ProtectedRoute>
          } />

          <Route path="/rrhh/admin/solicitudes-baja" element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <AdminSolicitudesBaja_rrhh />
            </ProtectedRoute>
          } />
          
          <Route path='/unauthorized' element={
            <Unauthorized />
          }></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
