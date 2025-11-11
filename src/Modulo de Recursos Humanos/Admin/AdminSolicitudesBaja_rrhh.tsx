import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SolicitudBaja {
  id_solicitud: number;
  empleado: { id_empleado: number; nombre: string; apellido: string; rut: string };
  motivo: string;
  estado: "PENDIENTE" | "APROBADA" | "RECHAZADA";
  fecha_solicitud: string;
}

const API = "http://localhost:3000";

export const AdminSolicitudesBaja_rrhh = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState<SolicitudBaja[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/rrhh/solicitudes-baja?estado=PENDIENTE`);
    setSolicitudes(res.data);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, []);

  const aprobar = async (id_solicitud: number) => {
    if (!confirm("¿Aprobar esta solicitud y dar de baja al empleado?")) return;
    await axios.put(`${API}/rrhh/solicitudes-baja/${id_solicitud}/aprobar`);
    await cargar();
  };

  const rechazar = async (id_solicitud: number) => {
    const comentario = prompt("Comentario de rechazo:");
    if (comentario === null) return;
    await axios.put(`${API}/rrhh/solicitudes-baja/${id_solicitud}/rechazar`, { comentario });
    await cargar();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg animate-pulse">Cargando solicitudes...</p>
    </div>
  );

  return (
    <div className="p-8 bg-[#e8f3ed] min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-[#1a8a5b]">Solicitudes de Baja (Pendientes)</h2>

      <button
        onClick={() => navigate("/rrhh/admin")}
        className="px-3 py-1 rounded hover:!bg-gray-100 active:scale-95 mb-4"
      >
        ← Volver al panel admin
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#1e8449] bg-[#cde3d6] shadow-lg rounded-md">
          <thead className="bg-[#1a8a5b] text-white">
            <tr>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Empleado</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Motivo</th>
              <th className="border-b border-[#1e8449] p-3 text-left font-medium">Fecha</th>
              <th className="border-b border-[#1e8449] p-3 text-center font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-700">No hay pendientes.</td></tr>
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
                <td className="border-b border-[#1e8449] p-3 text-center space-x-2">
                  <button
                    onClick={() => aprobar(s.id_solicitud)}
                    className="bg-white text-[#1a8a5b] border border-[#1a8a5b] hover:bg-[#2ecc71] hover:text-black active:scale-95 px-4 py-2 rounded-md font-semibold transition duration-200"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => rechazar(s.id_solicitud)}
                    className="bg-white text-red-600 border border-red-600 hover:bg-red-500 hover:text-white active:scale-95 px-4 py-2 rounded-md font-semibold transition duration-200"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
