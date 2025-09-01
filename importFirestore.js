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
  // Recorrer todas las colecciones raíz del JSON
  for (const collectionName in data) {
    const collectionData = data[collectionName];
    console.log(`✨ Procesando colección: ${collectionName}`);

    // Si la colección es un array, subimos cada item como un nuevo documento
    if (Array.isArray(collectionData)) {
      for (const item of collectionData) {
        await db.collection(collectionName).add(item);
        console.log(`📄 Documento añadido a ${collectionName}`);
      }
    } else if (typeof collectionData === "object" && collectionData !== null) {
      // Si la colección es un objeto, subimos cada par clave-valor como un documento
      for (const docId in collectionData) {
        let docData = collectionData[docId];
        
        // Asegurarse de que el dato sea un objeto válido para Firestore
        if (typeof docData !== "object" || docData === null) {
          docData = { value: docData };
        }
        
        await db.collection(collectionName).doc(docId).set(docData);
        console.log(`📄 Documento subido: ${collectionName}/${docId}`);
      }
    } else {
      console.log(`🚫 ${collectionName} no es un array ni un objeto, se omite.`);
    }
  }
}

// Ejecutar la importación
uploadData()
  .then(() => console.log("\n✅ ¡Importación de Firestore completada!"))
  .catch((err) => console.error("\n❌ Error durante la importación:", err));