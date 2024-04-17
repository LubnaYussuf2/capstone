import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#ff0000', // Set primary color to red
//       },
//       secondary: {
//         main: '#00ff00', // Set secondary color to green
//       },
//     },
//   });

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//       backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//       borderRadius: 5,
//       backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//     },
//   }));



function Section1() {

    const [totalCustomersLastYear, setTotalCustomersLastYear] = useState(0);
    const [customerData, setCustomerData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/data');
                const data = await response.json();
                //   setCustomerData(data)

                // Calculate the total customers from the last year
                const totalCustomers = data.reduce((total, customer) => {
                    if (customer.Year == "2023") {
                        return total + 1;
                    }
                    return total;
                }, 0);

                setTotalCustomersLastYear(totalCustomers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{}}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ marginRight: '10px' }}>Monthly Target</h3>
                <p style={{color:"red"}}>200,000.00 QAR</p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <h2>113,400.00 QAR</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress variant="determinate" value={(113400 / 200000) * 100} />
                </Stack>
                {/* <p style={{ marginRight: '10px', marginBottom: "15px" }}> </p> */}
                <img src={process.env.PUBLIC_URL + '/target.png'} alt="Logo" style={{ width: '10%', marginLeft: '10px', marginBottom: "15px" }} />
                {/* <LinearProgress variant="determinate" value={(120000 / 200000) * 100} /> */}
                {/* <BorderLinearProgress variant="determinate" value={120000 / 200000} /> */}

            </div>

        </div>
    );
}


export default Section1;