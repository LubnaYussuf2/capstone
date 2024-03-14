import React, { useState, useEffect } from 'react';
import CustomerScreen from './components/Customer';

function App() {
  return (
    <div>
      <CustomerScreen />
    </div>
  );
}

export default App;


// function App() {
//   // Define state variables to hold data
//   const [dat, setDat] = useState("");

//   useEffect(() => {
//     // Fetch data from Flask backend when component mounts
//     axios.get('http://127.0.0.1:5000/get-data')
//       .then(response => {
//         // Update state with fetched data
//         setDat(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const sendData = () => {
//     // Example function to send data to Flask backend
//     axios.post('http://127.0.0.1:5000/save-data')
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error('Error saving data:', error);
//       });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Render fetched data */}
//         <p>{dat}</p>
//         {/* Button to trigger sendData function */}
//         <button onClick={sendData}>Send Data</button>
//       </header>
//     </div>
//   );
// }

// export default App;
