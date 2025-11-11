import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SolicitudBaja {
  id_solicitud: number;
  empleado: { id_empleado: number; nombre: string; apellido: string; rut: string };
  motivo: string;
  estado: "PENDIENTE" | "APROBADA" | "RECHAZADA";
  fecha_solicitud: string;
  comentario_rechazo?: string | null;
}

const API = "http://localhost:3000";

export const JefeSolicitudesBaja_rrhh = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState<SolicitudBaja[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorConexion, setErrorConexion] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        // El back deduce qué jefe eres y retorna solo tus solicitudes
        const res = await axios.get(`${API}/rrhh/jefes/solicitudes-baja`);
        setSolicitudes(res.data);
      } catch (e) {
        console.error(e);
        setErrorConexion(true);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg animate-pulse">Cargando solicitudes...</p>
    </div>
  );
  if (errorConexion) return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-2">❌ Error de conexión</h2>
      <button onClick={() => window.location.reload()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Reintentar</button>
    </div>
  );

  return (
    <div className="p-8 bg-[#e8f3ed] min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-[#1a8a5b]">
        Mis Solicitudes de Baja
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
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Empleado</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Motivo</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Fecha</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Estado</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Comentario rechazo</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-700">No tienes solicitudes.</td></tr>
            ) : solicitudes.map((s, i) => (
              <tr key={s.id_solicitud}
                  className={`${i % 2 === 0 ? "bg-[#a8bfb2]" : "bg-[#97b5a5]"} hover:bg-[#86ab98] transition-colors duration-200`}>
                <td className="border-b border-[#1e8449] p-3 text-white font-medium">
                  {s.empleado.nombre} {s.empleado.apellido} • {s.empleado.rut}
                </td>
                <td className="border-b border-[#1e8449] p-3 text-white">{s.motivo}</td>
                <td className="border-b border-[#1e8449] p-3 text-white">
                  {new Date(s.fecha_solicitud).toLocaleString()}
                </td>
                <td className="border-b border-[#1e8449] p-3 text-white font-semibold">
                  {s.estado}
                </td>
                <td className="border-b border-[#1e8449] p-3 text-white">
                  {s.estado === "RECHAZADA" ? (s.comentario_rechazo || "—") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
