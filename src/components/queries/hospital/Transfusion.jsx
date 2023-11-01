import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Transfusion = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [bloodId, setBloodId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const giveBloodToPatients = async () => {
    try {
      // Estimate the gas required for the transaction
      const estimatedGas = await contract.methods
        .giveBloodToPatients(bloodId, patientName, age, address, bloodGroup)
        .estimateGas({ from: connectedAddress });

      // Convert estimatedGas to a floating-point number using parseFloat
      const gas = parseFloat(estimatedGas);

      // Convert gasPrice to a floating-point number using parseFloat
      const gasPrice = parseFloat(web3.utils.toWei('2', 'gwei'));

      // Create a new transaction object with a buffer of extra gas
      const tx = await web3.eth.sendTransaction({
        from: connectedAddress,
        to: contractAddress,
        data: contract.methods.giveBloodToPatients(bloodId, patientName, age, address, bloodGroup).encodeABI(),
        gas: gas * 2, // Provide additional gas
        gasPrice: gasPrice, // Set a reasonable gas price
      });

      console.log('Transaction Hash:', tx.transactionHash);
      console.log('Transaction Receipt:', tx);

      // Optionally, clear form fields after a successful transaction
      setBloodId('');
      setPatientName('');
      setAge('');
      setAddress('');
      setBloodGroup('');
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div>
      <h1>Transfusion</h1>
      <p>Connected Ethereum Address: {connectedAddress}</p>
      <form>
        <TextField
          label="Blood ID"
          variant="outlined"
          fullWidth
          value={bloodId}
          onChange={(e) => setBloodId(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Patient Name"
          variant="outlined"
          fullWidth
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Blood Group"
          variant="outlined"
          fullWidth
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={giveBloodToPatients}
        >
          Give Blood to Patients
        </Button>
      </form>
    </div>
  );
};

export default Transfusion;
