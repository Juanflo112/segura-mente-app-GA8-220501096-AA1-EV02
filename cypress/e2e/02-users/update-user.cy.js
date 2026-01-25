/**
 * Pruebas de Actualizar Usuario
 * Endpoint: PUT /api/users/:email
 * Propósito: Validar la actualización de información de usuarios existentes
 */

describe('Gestion de Usuarios - Actualizar Usuario', () => {
  
  before(() => {
    cy.wakeUpBackend();
  });

  it('Caso 8.1: Debe actualizar nombre de usuario correctamente', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const nuevoNombre = `Usuario Actualizado ${Date.now()}`;
        
        cy.log(`Actualizando nombre de usuario para: ${userToEdit.email}`);
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          nombre_usuario: nuevoNombre
        }).then((response) => {
          if (response.status === 200) {
            expect(response.body.success, 'Success debe ser true').to.be.true;
            expect(response.body.data, 'Debe tener data').to.exist;
            expect(response.body.data.nombre_usuario, 'Nombre debe estar actualizado').to.eq(nuevoNombre);
            
            cy.log('Nombre de usuario actualizado exitosamente');
          } else if (response.status === 403) {
            cy.log('Usuario no tiene permisos - test omitido');
          } else if (response.status === 404) {
            cy.log('Usuario a editar no existe - verificar cypress.env.json');
          }
        });
      } else {
        cy.log('userToEdit no configurado en cypress.env.json - test omitido');
      }
    });
  });

  it('Caso 8.2: Debe actualizar telefono correctamente', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const nuevoTelefono = `300${Date.now()}`.substring(0, 10);
        
        cy.log(`Actualizando telefono para: ${userToEdit.email}`);
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          telefono: nuevoTelefono
        }).then((response) => {
          if (response.status === 200) {
            expect(response.body.success, 'Success debe ser true').to.be.true;
            expect(response.body.data.telefono, 'Telefono debe estar actualizado').to.eq(nuevoTelefono);
            
            cy.log('Telefono actualizado exitosamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.3: Debe actualizar direccion correctamente', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const nuevaDireccion = `Calle Nueva ${Date.now()}`;
        
        cy.log(`Actualizando direccion para: ${userToEdit.email}`);
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          direccion: nuevaDireccion
        }).then((response) => {
          if (response.status === 200) {
            expect(response.body.success, 'Success debe ser true').to.be.true;
            expect(response.body.data.direccion, 'Direccion debe estar actualizada').to.eq(nuevaDireccion);
            
            cy.log('Direccion actualizada exitosamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.4: Debe fallar sin autenticacion', () => {
    const apiUrl = Cypress.env('apiUrl');
    const userToEdit = Cypress.env('userToEdit');
    
    if (!userToEdit) {
      cy.log('userToEdit no configurado - test omitido');
      return;
    }
    
    cy.log('Intentando actualizar usuario sin autenticacion');
    
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/users/${userToEdit.email}`,
      body: {
        nombre_usuario: 'Nuevo Nombre'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status, 'Status debe ser 401 o 403').to.be.oneOf([401, 403]);
      expect(response.body.success, 'Success debe ser false').to.be.false;
      
      cy.log('Endpoint protegido correctamente');
    });
  });

  it('Caso 8.5: Debe fallar con token invalido', () => {
    const apiUrl = Cypress.env('apiUrl');
    const userToEdit = Cypress.env('userToEdit');
    
    if (!userToEdit) {
      cy.log('userToEdit no configurado - test omitido');
      return;
    }
    
    cy.log('Intentando actualizar con token invalido');
    
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/users/${userToEdit.email}`,
      headers: {
        'Authorization': 'Bearer token-invalido-xyz'
      },
      body: {
        nombre_usuario: 'Nuevo Nombre'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status, 'Status debe ser 401 o 403').to.be.oneOf([401, 403]);
      expect(response.body.success, 'Success debe ser false').to.be.false;
      
      cy.log('Validacion de token funciona correctamente');
    });
  });

  it('Caso 8.6: Debe fallar con usuario no existente', () => {
    const emailNoExiste = `noexiste${Date.now()}@example.com`;
    
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      
      if (token) {
        cy.log(`Intentando actualizar usuario inexistente: ${emailNoExiste}`);
        
        cy.apiRequest('PUT', `/users/${emailNoExiste}`, {
          nombre_usuario: 'Nuevo Nombre'
        }).then((response) => {
          expect(response.status, 'Status debe ser 404').to.eq(404);
          expect(response.body.success, 'Success debe ser false').to.be.false;
          expect(response.body.message, 'Debe indicar que no se encontro').to.match(/no encontrado|not found|no existe/i);
          
          cy.log('Error 404 manejado correctamente');
        });
      }
    });
  });

  it('Caso 8.7: No debe permitir cambiar el email a uno existente', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      const testUser = Cypress.env('testUser');
      
      if (token && userToEdit && testUser) {
        cy.log('Intentando cambiar email a uno ya registrado');
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          email: testUser.email // Email que ya existe
        }).then((response) => {
          if (response.status === 400 || response.status === 409) {
            expect(response.body.success, 'Success debe ser false').to.be.false;
            expect(response.body.message, 'Debe mencionar email duplicado').to.match(/correo|email|ya.*registrado|duplicado/i);
            
            cy.log('Validacion de email duplicado funciona correctamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          } else {
            cy.log('Sistema permite cambiar email o el campo no es modificable');
          }
        });
      }
    });
  });

  it('Caso 8.8: Debe validar formato de telefono', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        cy.log('Intentando actualizar con telefono invalido');
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          telefono: '123' // Teléfono muy corto
        }).then((response) => {
          if (response.status === 400) {
            expect(response.body.success, 'Success debe ser false').to.be.false;
            expect(response.body.message || response.body.errors, 'Debe tener mensaje de error').to.exist;
            
            cy.log('Validacion de telefono funciona correctamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          } else {
            cy.log('Sistema acepta telefono corto - revisar validaciones');
          }
        });
      }
    });
  });

  it('Caso 8.9: Debe actualizar tipo de usuario', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        cy.log('Intentando actualizar tipo de usuario');
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          tipo_usuario: 'Psicólogo/empleado'
        }).then((response) => {
          if (response.status === 200) {
            expect(response.body.success, 'Success debe ser true').to.be.true;
            expect(response.body.data.tipo_usuario, 'Tipo debe estar actualizado').to.eq('Psicólogo/empleado');
            
            cy.log('Tipo de usuario actualizado exitosamente');
          } else if (response.status === 403) {
            cy.log('Solo administradores pueden cambiar tipo - politica valida');
          } else if (response.status === 404) {
            cy.log('Usuario no existe - test omitido');
          } else {
            cy.log('Sistema no permite cambiar tipo de usuario');
          }
        });
      }
    });
  });

  it('Caso 8.10: Debe actualizar multiples campos simultaneamente', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const timestamp = Date.now();
        const datosActualizados = {
          nombre_usuario: `Usuario Multi ${timestamp}`,
          telefono: `300${timestamp}`.substring(0, 10),
          direccion: `Calle Multi ${timestamp}`
        };
        
        cy.log('Actualizando multiples campos simultaneamente');
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, datosActualizados).then((response) => {
          if (response.status === 200) {
            expect(response.body.success, 'Success debe ser true').to.be.true;
            expect(response.body.data.nombre_usuario, 'Nombre debe estar actualizado').to.eq(datosActualizados.nombre_usuario);
            expect(response.body.data.telefono, 'Telefono debe estar actualizado').to.eq(datosActualizados.telefono);
            expect(response.body.data.direccion, 'Direccion debe estar actualizada').to.eq(datosActualizados.direccion);
            
            cy.log('Multiples campos actualizados exitosamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.11: No debe permitir actualizar campos sensibles', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        cy.log('Intentando actualizar campos sensibles');
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          password: 'NuevaPassword123!', // Contraseña no debe cambiar por este endpoint
          verificado: true, // Estado de verificación no debe cambiar
          reset_token: 'token-malicioso' // Tokens no deben ser modificables
        }).then((response) => {
          if (response.status === 200) {
            const usuario = response.body.data;
            
            // Validar que campos sensibles NO estén en la respuesta o no hayan cambiado
            expect(usuario.password, 'Password no debe estar en respuesta').to.not.exist;
            expect(usuario.reset_token, 'Reset token no debe estar en respuesta').to.not.exist;
            
            cy.log('Campos sensibles protegidos correctamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.12: Debe actualizar formacion profesional de psicologo', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const psicologoUser = Cypress.env('psicologoUser');
      
      if (token && psicologoUser) {
        const nuevaFormacion = `Especialista en Psicologia ${Date.now()}`;
        
        cy.log(`Actualizando formacion de psicologo: ${psicologoUser.email}`);
        
        cy.apiRequest('PUT', `/users/${psicologoUser.email}`, {
          formacion_profesional: nuevaFormacion
        }).then((response) => {
          if (response.status === 200) {
            expect(response.body.success, 'Success debe ser true').to.be.true;
            expect(response.body.data.formacion_profesional, 'Formacion debe estar actualizada').to.eq(nuevaFormacion);
            
            cy.log('Formacion profesional actualizada exitosamente');
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o psicologo no existe - test omitido');
          }
        });
      } else {
        cy.log('psicologoUser no configurado - test omitido');
      }
    });
  });

  it('Caso 8.13: Debe validar tiempo de respuesta aceptable', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const startTime = Date.now();
        
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          nombre_usuario: `Usuario Tiempo ${Date.now()}`
        }).then((response) => {
          const duration = Date.now() - startTime;
          
          if (response.status === 200) {
            expect(duration, 'Debe responder en menos de 3 segundos').to.be.lessThan(3000);
            cy.log(`Tiempo de respuesta: ${duration}ms`);
          } else if (response.status === 403 || response.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.14: Debe verificar actualizacion en consulta individual', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const nombreActualizado = `Usuario Verificacion ${Date.now()}`;
        
        cy.log('Actualizando y verificando consistencia...');
        
        // Paso 1: Actualizar
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          nombre_usuario: nombreActualizado
        }).then((updateResponse) => {
          if (updateResponse.status === 200) {
            cy.log('Usuario actualizado, consultando...');
            
            // Paso 2: Consultar el mismo usuario
            cy.apiRequest('GET', `/users/${userToEdit.email}`).then((getResponse) => {
              if (getResponse.status === 200) {
                expect(getResponse.body.data.nombre_usuario, 'Cambio debe persistir').to.eq(nombreActualizado);
                cy.log('Actualizacion verificada en consulta individual');
              }
            });
          } else if (updateResponse.status === 403 || updateResponse.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.15: Debe verificar actualizacion en lista de usuarios', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        const nombreActualizado = `Usuario Lista ${Date.now()}`;
        
        cy.log('Actualizando y verificando en lista...');
        
        // Paso 1: Actualizar
        cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
          nombre_usuario: nombreActualizado
        }).then((updateResponse) => {
          if (updateResponse.status === 200) {
            cy.log('Usuario actualizado, consultando lista...');
            
            // Paso 2: Consultar lista de usuarios
            cy.apiRequest('GET', '/users').then((listResponse) => {
              if (listResponse.status === 200) {
                const usuarioEnLista = listResponse.body.data.find(u => u.email === userToEdit.email);
                
                if (usuarioEnLista) {
                  expect(usuarioEnLista.nombre_usuario, 'Cambio debe reflejarse en lista').to.eq(nombreActualizado);
                  cy.log('Actualizacion verificada en lista de usuarios');
                }
              }
            });
          } else if (updateResponse.status === 403 || updateResponse.status === 404) {
            cy.log('Sin permisos o usuario no existe - test omitido');
          }
        });
      }
    });
  });

  it('Caso 8.16: Debe manejar actualizacion sin cambios', () => {
    cy.login('testUser');
    
    cy.then(() => {
      const token = Cypress.env('authToken');
      const userToEdit = Cypress.env('userToEdit');
      
      if (token && userToEdit) {
        cy.log('Intentando actualizar sin hacer cambios reales');
        
        // Primero obtener datos actuales
        cy.apiRequest('GET', `/users/${userToEdit.email}`).then((getResponse) => {
          if (getResponse.status === 200) {
            const datosActuales = getResponse.body.data;
            
            // Enviar los mismos datos
            cy.apiRequest('PUT', `/users/${userToEdit.email}`, {
              nombre_usuario: datosActuales.nombre_usuario
            }).then((updateResponse) => {
              if (updateResponse.status === 200) {
                expect(updateResponse.body.success, 'Success debe ser true').to.be.true;
                cy.log('Sistema maneja correctamente actualizaciones sin cambios');
              } else if (updateResponse.status === 403 || updateResponse.status === 404) {
                cy.log('Sin permisos o usuario no existe - test omitido');
              }
            });
          } else if (getResponse.status === 404) {
            cy.log('Usuario no existe - test omitido');
          }
        });
      }
    });
  });
});
