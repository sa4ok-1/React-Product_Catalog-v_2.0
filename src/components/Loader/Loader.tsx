import React from 'react';
import { BarLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#0F1121', // Задайте потрібний колір фону
      zIndex: 9999
    }}>
      <BarLoader width={100} color={"#fff"} />
    </div>
  );
};

export default Loader;