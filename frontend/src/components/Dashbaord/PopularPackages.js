import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, Box, Typography } from '@mui/material';

const packageTypeMap = {
  'Adventure Tours': 'Basic',
  'Cultural Exploration Package': 'Basic',
  'Sightseeing Tours': 'Basic',
  'Cultural Tours': 'Standard',
  'Beach and Resort Tours': 'Standard',
  'Luxury and VIP Tours': 'Premium',
  'Adventure and Wellness Escape': 'Premium'
};

const PopularPackages = () => {
  const [popularPackages, setPopularPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // State to track sort order

  useEffect(() => {
    fetch('http://127.0.0.1:5000/package')
      .then(response => response.json())
      .then(data => {
        processPackagesData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [sortOrder]);

  const processPackagesData = (data) => {
    const packageCounts = {};
    data.forEach(item => {
      const packageName = item.Package;
      packageCounts[packageName] = (packageCounts[packageName] || 0) + 1;
    });

    const totalCount = Object.values(packageCounts).reduce((acc, count) => acc + count, 0);

    const sortedPackages = Object.entries(packageCounts)
      .sort(([, countA], [, countB]) => sortOrder === 'asc' ? countA - countB : countB - countA)
      // .slice(0, 3)
      .map(([packageName, count]) => ({
        packageName,
        packageType: packageTypeMap[packageName],
        popularity: ((count / totalCount) * 100).toFixed(0),
        count
      }));

    setPopularPackages(sortedPackages);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2">
          Popular Packages
        </Typography>
        <FormControl variant="outlined" size="small">
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            displayEmpty
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="popular packages table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#f3e5f5' }}> {/* Pastel background color */}
              <TableCell><b>Package Name</b></TableCell>
              <TableCell align="center"><b>Package Type</b></TableCell>
              <TableCell align="center"><b>Popularity</b></TableCell>
              <TableCell align="center"><b>Sold</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {popularPackages.map((packageData, index) => (
              <TableRow key={index}>
                <TableCell>{packageData.packageName}</TableCell>
                <TableCell align="center">{packageData.packageType}</TableCell>
                <TableCell align="center">{packageData.popularity} %</TableCell>
                <TableCell align="center">{packageData.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PopularPackages;
