import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const formatDate = (timestamp) => {
  // Convert the `BigInt` to a string
  const timestampString = timestamp.toString();

  // Convert the string to a number
  const timestampNumber = parseInt(timestampString);

  const date = new Date(timestampNumber * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear().toString().slice(2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};



const DonorsInfos = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [donorData, setDonorData] = useState([]);

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const getDataOfDonors = async () => {
    try {
      // Call the view function to get donor information
      const data = await contract.methods.getDataOfDonors().call({ from: connectedAddress });

      setDonorData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Donor Information</h1>
      <p>Connected Ethereum Address: {connectedAddress}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={getDataOfDonors}
      >
        Get Donor Information
      </Button>

      {donorData.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donor Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Blood Volume</TableCell>
                <TableCell>Blood Unique ID</TableCell>
                <TableCell>Donated Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donorData.map((donor, index) => (
                <TableRow key={index}>
                  <TableCell>{donor.donorName}</TableCell>
                  <TableCell>{donor.age.toString()}</TableCell>
                  <TableCell>{donor.gender}</TableCell>
                  <TableCell>{donor.Address}</TableCell>
                  <TableCell>{donor.bloodGroup}</TableCell>
                  <TableCell>{donor.bloodVolume.toString()}</TableCell>
                  <TableCell>{donor.bloodUniqueId.toString()}</TableCell>
                  <TableCell>{formatDate(donor.donatedTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DonorsInfos;
