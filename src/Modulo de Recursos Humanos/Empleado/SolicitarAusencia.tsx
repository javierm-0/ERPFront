import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SolicitudAusencia {
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  motivo?: string;
}

const tiposAusencia: string[] = ["VACACIONES", "PERMISO", "ENFERMEDAD", "CAPACITACION"];

export const SolicitarAusencia: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<SolicitudAusencia>({
        tipo: "",
        fechaInicio: "",
        fechaFin: "",
        motivo: "",
    });

    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const { tipo, fechaInicio, fechaFin } = form;

    if (!tipo || !fechaInicio || !fechaFin) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin < inicio) {
      setError("⚠️ La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (inicio < hoy) {
      setError("⚠️ No puedes solicitar una ausencia que comience en el pasado.");
      return;
    }

    try {
      const backUrl = "/de_momento_ni_idea";
      await axios.post(backUrl, form);
      setMensaje("✅ Solicitud enviada correctamente.");
      setForm({ tipo: "", fechaInicio: "", fechaFin: "", motivo: "" });
    } catch (err) {
      console.error(err);
      setError("❌ Error al enviar la solicitud. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] p-6">

      <button
        onClick={() => navigate("/rrhh/empleado")}
        className="px-3 py-1 rounded !bg-[#23272b] hover:!bg-[#3a3f45] active:scale-95 mb-4 !text-[#c7cdd4] "
      >
        ← Volver al panel empleado
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-[#23272b] p-8 rounded-lg shadow-lg w-full max-w-md text-[#c7cdd4]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-[#d5d9de]">
          Solicitar Ausencia
        </h2>

        <div className="h-6 mb-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {mensaje && <p className="text-green-500 text-sm">{mensaje}</p>}
        </div>

        <label className="block mb-3">
          Tipo de ausencia <span className="text-red-600">*</span>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="mt-1 w-full bg-[#1a1d21] border border-[#3a3f45] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a7aeb6]"
          >
            <option value="">Seleccione...</option>
            {tiposAusencia.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-3">
          Fecha de inicio <span className="text-red-600">*</span>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            className="mt-1 w-full bg-[#1a1d21] border border-[#3a3f45] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a7aeb6]"
          />
        </label>

        <label className="block mb-3">
          Fecha de fin <span className="text-red-600">*</span>
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
            className="mt-1 w-full bg-[#1a1d21] border border-[#3a3f45] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a7aeb6]"
          />
        </label>

        <label className="block mb-6">
          Motivo (opcional)
          <textarea
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full bg-[#1a1d21] border border-[#3a3f45] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a7aeb6]"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-tr from-[#c7ccd2] to-[#a7aeb6] text-[#0f1115] font-semibold py-2 rounded-md hover:from-[#d5d9de] hover:to-[#b3bbc3] active:scale-95 transition-all duration-200"
        >
          Solicitar
        </button>
      </form>
    </div>
  );
};
