import { db } from './firebase'; 
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


export default {
  async apiKey() {
      const keys = [
        import.meta.env.VITE_PEBBLELY_API_KEY_1,
        import.meta.env.VITE_PEBBLELY_API_KEY_2,
        import.meta.env.VITE_PEBBLELY_API_KEY_3,
        import.meta.env.VITE_PEBBLELY_API_KEY_4,
        import.meta.env.VITE_PEBBLELY_API_KEY_5,
        import.meta.env.VITE_PEBBLELY_API_KEY_6,
        import.meta.env.VITE_PEBBLELY_API_KEY_7,
        import.meta.env.VITE_PEBBLELY_API_KEY_8,
      ];
  

      try {
        const indexRef = doc(db, 'config', 'apiKeyIndex');
        const indexDoc = await getDoc(indexRef);
      
        let currentIndex;
        if (indexDoc.exists()) {
          currentIndex = indexDoc.data().currentIndex;
        } else {
          // Document doesn't exist, create it with initial value
          currentIndex = 0;
          await setDoc(indexRef, { currentIndex: 0 });
        }
      
        // Get the API key
        const key = keys[currentIndex];
      
        // Update the index for the next request
        await updateDoc(indexRef, {
          currentIndex: (currentIndex + 1) % keys.length
        });
      
        return key; 
      
      } catch (error) {
        console.error('Error fetching or updating API key index:', error);
      }
    },
    apiUrl: import.meta.env.VITE_PEBBLELY_API_URL
  }