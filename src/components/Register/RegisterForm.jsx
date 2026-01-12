import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import eyeOpen from '../../assets/icons/eye-open.svg';
import eyeClosed from '../../assets/icons/eye-closed.svg';
import API_BASE_URL from '../../config/api';


const RegisterForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    tipoIdentificacion: 'CC',
    identificacion: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Enviar datos al backend
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('Registro exitoso:', data);
        // Redirigir a la página de éxito
        navigate('/success', { 
          state: { 
            email: formData.email,
            message: data.message 
          } 
        });
      } else {
        // Mostrar errores de validación
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map(err => err.message).join('\n');
          alert('Revisa por favor los datos ingresados:\n' + errorMessages);
        } else {
          alert(data.message || 'Error al registrar usuario');
        }
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error al conectar con el servidor. Por favor verifica que el backend esté funcionando.');
    }
  };

  return (
    <div className="register-form-wrapper">
      <div className="register-header">
        <h1 className="register-title">
          Registrarse con <span className="brand-segura">SEGURA</span>
          <span className="brand-mente">-MENTE</span>
        </h1>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            placeholder="Escribe tu nombre de usuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="identificacion">Documento de identificación</label>
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              placeholder="Escribe tu identificación"
              value={formData.identificacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group form-group-select">
            <select
              id="tipoIdentificacion"
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleChange}
              required
            >
              <option value="CC">CC</option>
              <option value="CE">CE</option>
            </select>
          </div>
        </div>

        <div className="form-row-date-phone">
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Escribe tu teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            placeholder="Escribe tu dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Escribe tu correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Crea una contraseña</label>
          <p className="password-hint">
            De mínimo 8 caracteres y deben incluir símbolos, al menos una mayúscula y al menos un número
          </p>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Crea una contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Mostrar u ocultar contraseña"
            >
              <img 
                src={showPassword ? eyeOpen : eyeClosed} 
                alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              />
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirma tu contraseña</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label="Mostrar u ocultar confirmación de contraseña"
            >
              <img 
                src={showConfirmPassword ? eyeOpen : eyeClosed} 
                alt={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              />
            </button>
          </div>
        </div>

        <button type="submit" className="submit-buttonR">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;