import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddHospitals = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const addHospital = async () => {
    try {
        const estimatedGas = await contract.methods
        .addHospital(hospitalAddress, hospitalName, phoneNumber)
        .estimateGas({ from: connectedAddress });
        const gass = parseFloat(estimatedGas);

        // Convert gasPrice to a floating-point number using parseFloat
        const gasPrices = parseFloat(web3.utils.toWei('2', 'gwei'));
    
console.log(gass, gasPrices)
        const tx = await web3.eth.sendTransaction({
            from: connectedAddress,
            to: contractAddress,
            data: contract.methods.addHospital(hospitalAddress, hospitalName, phoneNumber).encodeABI(),
            gas: gass, // Lower gas limit
            gasPrice: gasPrices, // Lower gas price
          });

      console.log('Transaction Hash:', tx.transactionHash);
      console.log('Transaction Receipt:', tx);

      // Clear form fields
      setHospitalAddress('');
      setHospitalName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Hospital</h1>
      <p>Connected Ethereum Address: {connectedAddress}</p>
      <form>
        <TextField
          label="Hospital Address"
          variant="outlined"
          fullWidth
          value={hospitalAddress}
          onChange={(e) => setHospitalAddress(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Hospital Name"
          variant="outlined"
          fullWidth
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addHospital}
        >
          Add Hospital
        </Button>
      </form>
    </div>
  );
};

export default AddHospitals;
