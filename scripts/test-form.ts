import fetch from "node-fetch";

async function testContactForm() {
  console.log("Iniciando prueba de formulario de contacto...");
  
  const payload = {
    name: "Pablo (Prueba del Sistema)",
    email: "info@nexotalento.com", // Puedes cambiarlo a tu correo personal para ver si te llega el acuse de recibo
    phone: "+34 111 222 333",
    company: "Nexo Talento Test",
    role: "CEO",
    serviceType: "Prueba de Integración IA",
    message: "Hola, este es un mensaje de prueba automático para verificar que Google Sheets y los emails (Nodemailer) están funcionando correctamente."
  };

  try {
    const response = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Status Code:", response.status);
    console.log("Respuesta del servidor:", data);
    
    if (response.ok) {
      console.log("✅ Prueba completada con éxito. Revisa tu Google Sheet y tu bandeja de entrada.");
    } else {
      console.log("❌ Hubo un error en la prueba.");
    }
  } catch (error) {
    console.error("❌ Error de conexión al servidor (Asegúrate de que 'npm run dev' esté corriendo):", error);
  }
}

testContactForm();
