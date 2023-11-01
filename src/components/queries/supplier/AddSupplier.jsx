import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddSuppliers = ({ web3, connectedAddress, contractAddress, contractABI }) => {
  const [supplierAddress, setSupplierAddress] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const addSuppliers = async () => {
    try {
      // Send a transaction using the MetaMask provider
      const tx = await web3.eth.sendTransaction({
        from: connectedAddress,
        to: contractAddress,
        data: contract.methods.addSupplier(supplierAddress, supplierName, phoneNumber).encodeABI(),
        gas: '200000', // You may need to adjust the gas limit
      });

      console.log('Transaction Hash:', tx.transactionHash);
      console.log('Transaction Receipt:', tx);

      // Clear form fields
      setSupplierAddress('');
      setSupplierName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Supplier</h1>
      <p>Connected Ethereum Address: {connectedAddress}</p>
      <form>
        <TextField
          label="Supplier Address"
          variant="outlined"
          fullWidth
          value={supplierAddress}
          onChange={(e) => setSupplierAddress(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
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
          onClick={addSuppliers}
        >
          Add Supplier
        </Button>
      </form>
    </div>
  );
};

export default AddSuppliers;
