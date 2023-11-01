import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddSuppliers from './components/queries/supplier/AddSupplier';
import AddHospitals from './components/queries/hospital/AddHospital';
import AddBloodDonors from './components/queries/supplier/AddBloodDonor';
import ShipBlood from './components/queries/supplier/ShipBloods';
import CheckBloodStatus from './components/queries/donor/CheckStatus';
import DonorsInfos from './components/queries/supplier/DonorsInfos';
import PatientsInfos from './components/queries/owner/PatientsInfos';
import contractABI from './contracts/BloodSupply.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(0);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    async function loadWeb3() {
      if (!window.ethereum) {
        console.error('MetaMask is not installed.');
        return;
      }

      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnectedAddress(accounts[0]);

        // Store the connected address in session storage
        if (accounts.length > 0) {
          sessionStorage.setItem('connectedAddress', accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }

    // Check session storage for a previously connected address
    const storedAddress = sessionStorage.getItem('connectedAddress');
    if (storedAddress) {
      setConnectedAddress(storedAddress);
    }

    loadWeb3();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedComponent(newValue);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Tabs value={selectedComponent} onChange={handleTabChange}>
          <Tab label="Add Suppliers" />
          <Tab label="Add Hospitals" />
          <Tab label="Add Blood Donors" />
          <Tab label="Ship Blood" />
          <Tab label="Check Blood Status" />
          <Tab label="Donors Information" />
          <Tab label="Patients Information" />
        </Tabs>
      </AppBar>
      {web3 && (
        <Container>
        {selectedComponent === 0 && (
          <AddSuppliers
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
        {selectedComponent === 1 && (
          <AddHospitals
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
        {selectedComponent === 2 && (
          <AddBloodDonors
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
        {selectedComponent === 3 && (
          <ShipBlood
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
        {selectedComponent === 4 && (
          <CheckBloodStatus
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
        {selectedComponent === 5 && (
          <DonorsInfos
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
        {selectedComponent === 6 && (
          <PatientsInfos
            web3={web3}
            connectedAddress={connectedAddress}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        )}
      </Container>
      )}
    </div>
  );
}

export default App;
