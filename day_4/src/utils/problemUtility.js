const axios = require('axios');

// from here to take language ID........
const getlanguageById= (lang) =>{
    const language ={
        'java':62,
        'c++':54,
        'JavaScript':102,
        'Python':109
    }

    return language[lang.toLowerCase()];
}

const submitBatch =  async (submissions) =>{
    
// here in this code Judg0 are check your given code and return the token........
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': '2e27c3cf8emshc3aa6ecae01f310p111545jsn953376208a35',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
   submissions // our array is here.......
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
        return response.data;
        // return response;
	} catch (error) {
		console.error(error);
	}
}

return fetchData();
}

module.exports={getlanguageById,submitBatch};

// try {
//         const response = await axios.request(options);
//         console.log(response.data); // Optional for debug
//         return response.data; // ✅ Yeh return hona chahiye
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }