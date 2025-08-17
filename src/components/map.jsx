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

  const link = `https://harlequin-known-gecko-651.mypinata.cloud/ipfs/${pin.ipfs_pin_hash}`;
  const isImage = pin?.metadata?.name?.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);
  const isPdf = pin?.metadata?.name?.match(/\.(pdf)$/i);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      // simple feedback; keep UI minimal
      alert('Link copied');
    } catch(e) {}
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minWidth: '300px',
      width: '100%',
    }}>
      <div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>{pin.metadata.name}</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Size: {formatFileSize(pin.size)}</div>
        <div style={{ fontSize: '12px', color: '#999' }}>IPFS Hash: {format_pin_hash(pin.ipfs_pin_hash)}</div>
      </div>

      {isImage && (
        <img src={link} alt={pin.metadata.name} style={{ maxHeight: 220, objectFit: 'contain', borderRadius: 8 }} />
      )}
      {isPdf && (
        <iframe title={pin.metadata.name} src={link} style={{ width: '100%', height: 260, border: 'none', borderRadius: 8 }} />
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <a href={link} target="_blank" rel="noreferrer" style={{
          backgroundColor: '#2874fc', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: 14, fontWeight: 'bold'
        }}>Open</a>
        <button onClick={copyLink} style={{
          backgroundColor: '#e9f1ff', color: '#2874fc', border: '1px solid #cfe0ff', padding: '8px 14px', borderRadius: '6px', fontSize: 14, fontWeight: 'bold', cursor: 'pointer'
        }}>Copy Link</button>
        <a href={link} download style={{
          backgroundColor: '#f5f7f9', color: '#444', border: '1px solid #e2e6ea', padding: '8px 14px', borderRadius: '6px', fontSize: 14, fontWeight: 'bold'
        }}>Download</a>
      </div>
    </div>
  );
};

export default Map;
