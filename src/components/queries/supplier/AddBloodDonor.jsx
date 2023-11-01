import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddBloodDonors = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [donorName, setDonorName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [bloodVolume, setBloodVolume] = useState('');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const addBloodDonor = async () => {
    try {
      // Estimate the gas required for the transaction
      const estimatedGas = await contract.methods
        .addBlood(donorName, age, gender, address, bloodGroup, bloodVolume)
        .estimateGas({ from: connectedAddress });

      // Convert estimatedGas to a floating-point number using parseFloat
      const gas = parseFloat(estimatedGas);

      // Convert gasPrice to a floating-point number using parseFloat
      const gasPrice = parseFloat(web3.utils.toWei('2', 'gwei'));

      // Create a new transaction object with a buffer of extra gas
      const tx = await web3.eth.sendTransaction({
        from: connectedAddress,
        to: contractAddress,
        data: contract.methods.addBlood(donorName, age, gender, address, bloodGroup, bloodVolume).encodeABI(),
        gas: gas * 2, // Provide additional gas
        gasPrice: gasPrice, // Set a reasonable gas price
      });

      console.log('Transaction Hash:', tx.transactionHash);
      console.log('Transaction Receipt:', tx);

      // Clear form fields
      setDonorName('');
      setAge('');
      setGender('');
      setAddress('');
      setBloodGroup('');
      setBloodVolume('');
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Blood Donor</h1>
      <p>Connected Ethereum Address: {connectedAddress}</p>
      <form>
        <TextField
          label="Donor Name"
          variant="outlined"
          fullWidth
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
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
          label="Gender"
          variant="outlined"
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
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
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Blood Volume"
          variant="outlined"
          fullWidth
          value={bloodVolume}
          onChange={(e) => setBloodVolume(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addBloodDonor}
        >
          Add Blood Donor
        </Button>
      </form>
    </div>
  );
};

export default AddBloodDonors;
