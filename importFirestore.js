import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Cargar la cuenta de servicio de Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync("serviceAccount.json", "utf8"));
initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

// Cargar los datos desde el archivo JSON
const data = JSON.parse(fs.readFileSync("firestore-export.json", "utf8"));

// Función principal para subir los datos
async function uploadData() {
  // Recorrer todas las colecciones raíz del JSON (about, contact, etc.)
  for (const collectionName in data) {
    const collectionData = data[collectionName];

    // Verificar si los datos de la colección son un array
    if (Array.isArray(collectionData)) {
      console.log(`✨ Subiendo colección: ${collectionName}`);
      for (const item of collectionData) {
        // Usar addDoc para documentos sin un ID específico
        await db.collection(collectionName).add(item);
        console.log(`📄 Documento añadido a ${collectionName}`);
      }
    } else if (typeof collectionData === "object" && collectionData !== null) {
      // Si es un objeto, subirlo como documentos (ej. 'about', 'skills')
      console.log(`✨ Subiendo colección: ${collectionName}`);
      for (const docId in collectionData) {
        let docData = collectionData[docId];
        
        // Add this check to ensure data is a valid object
        if (typeof docData !== 'object' || docData === null) {
          // If the data is not an object, wrap it in one.
          docData = { value: docData };
        }
        
        await db.collection(collectionName).doc(docId).set(docData);
        console.log(`📄 Documento subido: ${collectionName}/${docId}`);
      }
    }
  }
}

// Ejecutar la importación
uploadData()
  .then(() => console.log("\n✅ ¡Importación de Firestore completada!"))
  .catch((err) => console.error("\n❌ Error durante la importación:", err));