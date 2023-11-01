import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CheckBloodStatus = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [bloodId, setBloodId] = useState('');
  const [bloodStatus, setBloodStatus] = useState('');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const getBloodStatus = async () => {
    try {
      // Call the view function to get blood status
      const status = await contract.methods.getBloodStatus(bloodId).call({ from: connectedAddress });

      setBloodStatus(status);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Check Blood Status</h1>
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
        <Button
          variant="contained"
          color="primary"
          onClick={getBloodStatus}
        >
          Check Blood Status
        </Button>
      </form>
      {bloodStatus && (
        <div>
          <p>Blood Status: {bloodStatus}</p>
        </div>
      )}
    </div>
  );
};

export default CheckBloodStatus;
