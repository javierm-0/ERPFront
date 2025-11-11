import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Empleado {
  id_empleado: number;
  nombre: string;
  apellido: string;
  rut: string;
  estado: "ACTIVO" | "INACTIVO" | string;
  id_departamento?: number;
}

const API = "http://localhost:3000";

export const JefeMisEmpleados_rrhh = () => {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorConexion, setErrorConexion] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        // Opción A: el back deduce el depto del jefe con el token
        const res = await axios.get(`${API}/rrhh/jefes/mis-empleados`);
        // Opción B (alternativa): `${API}/rrhh/empleados?departamento=<id>`
        setEmpleados(res.data);
      } catch (e) {
        console.error(e);
        setErrorConexion(true);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const solicitarBaja = async (id_empleado: number) => {
    const motivo = prompt("Motivo de la solicitud de baja:");
    if (motivo === null) return;
    if (!motivo.trim()) return alert("Debes ingresar un motivo.");

    try {
      await axios.post(`${API}/rrhh/solicitudes-baja`, {
        id_empleado,
        motivo,
      });
      alert("Solicitud enviada y quedó en PENDIENTE.");
    } catch (e) {
      console.error(e);
      alert("No se pudo enviar la solicitud.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Cargando empleados...</p>
      </div>
    );
  }
  if (errorConexion) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">❌ Error de conexión</h2>
        <p className="text-gray-600 mb-4">Verifica el backend o tu red.</p>
        <button onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#e8f3ed] min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-[#1a8a5b]">
        Mis Empleados (por área)
      </h2>

      <button
        onClick={() => navigate("/rrhh/empleado")}
        className="px-3 py-1 rounded hover:!bg-gray-100 active:scale-95 mb-4"
      >
        ← Volver
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#1e8449] bg-[#cde3d6] shadow-lg rounded-md">
          <thead className="bg-[#1a8a5b] text-white">
            <tr>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Nombre</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">RUT</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Estado</th>
              <th className="border-b border-[#1e8449] p-3 text-center font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-700">
                  No hay empleados en tu área.
                </td>
              </tr>
            ) : (
              empleados.map((emp, i) => (
                <tr
                  key={emp.id_empleado}
                  className={`${i % 2 === 0 ? "bg-[#a8bfb2]" : "bg-[#97b5a5]"} hover:bg-[#86ab98] transition-colors duration-200`}
                >
                  <td className="border-b border-[#1e8449] p-3 text-white font-medium">
                    {emp.nombre} {emp.apellido}
                  </td>
                  <td className="border-b border-[#1e8449] p-3 text-white font-medium">{emp.rut}</td>
                  <td className="border-b border-[#1e8449] p-3 text-white font-semibold">{emp.estado}</td>
                  <td className="border-b border-[#1e8449] p-3 text-center">
                    <button
                      onClick={() => solicitarBaja(emp.id_empleado)}
                      disabled={emp.estado === "INACTIVO"}
                      className={`bg-white border px-4 py-2 rounded-md font-semibold transition duration-200
                        ${emp.estado === "INACTIVO"
                          ? "text-gray-400 border-gray-400 cursor-not-allowed"
                          : "text-[#1a8a5b] border-[#1a8a5b] hover:bg-[#2ecc71] hover:text-black active:scale-95"}`}
                    >
                      Solicitar baja
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/rrhh/jefe/solicitudes-baja")}
          className="bg-white text-[#1a8a5b] border border-[#1a8a5b] hover:bg-[#2ecc71] hover:text-black active:scale-95 px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          Ver mis solicitudes de baja
        </button>
      </div>
    </div>
  );
};
