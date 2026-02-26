/**
 * Script de Poblamiento de Base de Datos (Seed Script)
 * Descripción: Este script automatiza la creación de usuarios administrativos y clientes
 * de prueba para el sistema Karlday, interactuando directamente con mi API REST.
 */

// Defino un arreglo de objetos que contiene la información estructurada de los usuarios que registraré.
// Incluyo tanto las cuentas con privilegios de administración (trabajadores) como las cuentas de clientes.
const usuarios = [
  // --- EQUIPO DE TRABAJO (ADMINISTRADORES) ---
  { 
    username: "evelyn.dayan@karlday.com", // Evelyn Dayan Quintero De Anda
    password: "passwordAdmin123", 
    role: "admin" 
  },
  { 
    username: "jorge.alejandro@karlday.com", // Jorge Alejandro Gomez Ochoa
    password: "passwordAdmin123", 
    role: "admin" 
  },
  { 
    username: "michelle@karlday.com", // Michelle Quintero De Anda
    password: "passwordAdmin123", 
    role: "admin" 
  },

  // --- CLIENTES DE PRUEBA (USUARIOS ESTÁNDAR) ---
  { 
    username: "valeria.mendoza@gmail.com", // Valeria Mendoza
    password: "usuarioFacil1", 
    role: "user" 
  },
  { 
    username: "carlos.vargas@hotmail.com", // Carlos Vargas
    password: "usuarioFacil2", 
    role: "user" 
  },
  { 
    username: "cristina.ortiz@outlook.com", // Cristina Ortiz
    password: "usuarioFacil3", 
    role: "user" 
  },
  { 
    username: "daniela.silva@gmail.com", // Daniela Silva
    password: "usuarioFacil4", 
    role: "user" 
  },
  { 
    username: "francisco.navarro@yahoo.com", // Francisco Navarro
    password: "usuarioFacil5", 
    role: "user" 
  }
];

// Implemento una función asíncrona para procesar el registro de cada usuario de manera secuencial.
async function poblarBaseDeDatos() {
  console.log("Iniciando la automatización de registro de usuarios en el sistema Karlday...");
  
  // Itero sobre mi arreglo de usuarios para enviar la petición de creación por cada elemento.
  for (const user of usuarios) {
    try {
      // Utilizo la dirección IP 127.0.0.1 en lugar de 'localhost' para asegurar la correcta 
      // resolución de red (IPv4) en mi entorno de Node.js.
      // Realizo una petición HTTP POST a mi endpoint de registro para asegurar que las contraseñas
      // pasen por el proceso de encriptación (bcrypt) definido en mi backend.
      const res = await fetch('http://127.0.0.1:10000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      
      // Convierto la respuesta del servidor a formato JSON para analizar el resultado de la operación.
      const data = await res.json();
      
      // Valido si la petición fue exitosa (código de estado HTTP 2xx) e imprimo el resultado.
      if (res.ok) {
        console.log(`✅ Registro exitoso en base de datos: ${user.username}`);
      } else {
        console.log(`❌ Falla en el registro de ${user.username}: ${data.error}`);
      }
    } catch (err) {
      // Capturo y manejo cualquier excepción a nivel de red, deteniendo el proceso si mi servidor no responde.
      console.log(`⚠️ Error crítico de conexión. Verifico que mi servidor Express esté en ejecución en el puerto 10000.`);
      break; 
    }
  }
  console.log("\n¡Proceso de poblamiento finalizado con éxito!");
}

// Ejecuto la función principal para iniciar el script.
poblarBaseDeDatos();