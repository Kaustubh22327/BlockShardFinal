import React from "react";

const Map = ({ pin }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat(bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  };

  const format_pin_hash = (hash) => {
    return hash.slice(0, 4) + '....' + hash.slice(hash.length - 4, hash.length);
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px', // Set minimum height for uniform size
        minWidth: '300px', // Set minimum width for uniform size
        width: '100%', // Ensure the cards take the full width
      }}
    >
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>{pin.metadata.name}</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Size: {formatFileSize(pin.size)}</div>
        <div style={{ fontSize: '12px', color: '#999' }}>IPFS Hash: {format_pin_hash(pin.ipfs_pin_hash)}</div>
      </div>
      <a href={`https://harlequin-known-gecko-651.mypinata.cloud/ipfs/${pin.ipfs_pin_hash}`}
        style={{
          backgroundColor: '#2874fc',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          alignSelf: 'flex-end',
        }}
      >
        Open
      </a>
    </div>
  );
};

export default Map;
