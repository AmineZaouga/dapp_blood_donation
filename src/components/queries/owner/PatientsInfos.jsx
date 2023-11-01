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
  const date = new Date(Number(timestamp) * 1000); // Explicitly convert timestamp to number
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const PatientsInfos = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [patientData, setPatientData] = useState([]);

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const getDataOfPatients = async () => {
    try {
      // Call the view function to get patient information
      const data = await contract.methods.getDataOfPatients().call({ from: connectedAddress });

      setPatientData(data);
    } catch (error) {
      alert(`Transaction Error: ${error.message}`)
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Patient Information</h1>
      <p>Connected Ethereum Address: {connectedAddress}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={getDataOfPatients}
      >
        Get Patient Information
      </Button>

      {patientData.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Used Blood ID</TableCell>
                <TableCell>Used Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientData.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.patientName}</TableCell>
                  <TableCell>{patient.age.toString()}</TableCell>
                  <TableCell>{patient.Address}</TableCell>
                  <TableCell>{patient.bloodGroup}</TableCell>
                  <TableCell>{patient.usedBloodId.toString()}</TableCell>
                  <TableCell>
                    {formatDate(patient.usedTime)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PatientsInfos;
