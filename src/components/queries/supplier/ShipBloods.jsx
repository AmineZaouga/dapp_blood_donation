import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ShipBlood = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [bloodId, setBloodId] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const shipBloodToHospital = async () => {
    try {
      // Estimate the gas required for the transaction
      const estimatedGas = await contract.methods
        .shipBloodToHospital(bloodId, hospitalAddress)
        .estimateGas({ from: connectedAddress });

      // Convert estimatedGas to a floating-point number using parseFloat
      const gas = parseFloat(estimatedGas);

      // Create a new transaction object with a buffer of extra gas
      const tx = await web3.eth.sendTransaction({
        from: connectedAddress,
        to: contractAddress,
        data: contract.methods.shipBloodToHospital(bloodId, hospitalAddress).encodeABI(),
        gas: gas * 2, // Provide additional gas
        gasPrice: parseFloat(web3.utils.toWei('2', 'gwei')), // Set a reasonable gas price
      });

      console.log('Transaction Hash:', tx.transactionHash);
      console.log('Transaction Receipt:', tx);

      // Clear form fields
      setBloodId('');
      setHospitalAddress('');
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div>
      <h1>Ship Blood to Hospital</h1>
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
          label="Hospital Address"
          variant="outlined"
          fullWidth
          value={hospitalAddress}
          onChange={(e) => setHospitalAddress(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={shipBloodToHospital}
        >
          Ship Blood to Hospital
        </Button>
      </form>
    </div>
  );
};

export default ShipBlood;
