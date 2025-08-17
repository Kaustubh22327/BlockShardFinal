import { useState } from "react";
import Map from "./map";
import pinList from "../extract";
import './Display.css';

const getFileType = (name = "") => {
  const lower = name.toLowerCase();
  if (/(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.svg)$/.test(lower)) return 'images';
  if (/(\.pdf)$/.test(lower)) return 'pdfs';
  if (/(\.mp4|\.webm|\.mov|\.mkv)$/.test(lower)) return 'videos';
  if (/(\.mp3|\.wav|\.ogg)$/.test(lower)) return 'audio';
  if (/(\.doc|\.docx|\.xls|\.xlsx|\.ppt|\.pptx|\.txt)$/.test(lower)) return 'docs';
  return 'others';
};

const Display = ({ contract, account }) => {
  const [pins, setPins] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      setError("");
      const res = await pinList();
      const rows = Array.isArray(res?.rows) ? res.rows : [];
      setPins(rows);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pins:', error);
      setError('Error fetching files');
      setLoading(false);
    }
  }

  const filteredPins = pins.filter((p) => {
    if (filter === 'all') return true;
    return getFileType(p?.metadata?.name) === filter;
  });

  const counts = pins.reduce((acc, p) => {
    const t = getFileType(p?.metadata?.name);
    acc[t] = (acc[t] || 0) + 1;
    acc.all = (acc.all || 0) + 1;
    return acc;
  }, {});

  const filters = [
    { key: 'all', label: `All (${counts.all || 0})` },
    { key: 'images', label: `Images (${counts.images || 0})` },
    { key: 'pdfs', label: `PDFs (${counts.pdfs || 0})` },
    { key: 'videos', label: `Videos (${counts.videos || 0})` },
    { key: 'audio', label: `Audio (${counts.audio || 0})` },
    { key: 'docs', label: `Docs (${counts.docs || 0})` },
    { key: 'others', label: `Others (${counts.others || 0})` },
  ];

  return (
    <>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease",
          display: "block",
          margin: "20px auto"
        }}
        onClick={fetchData}
      >
        Get your data
      </button>

      {pins.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: '10px 0 20px' }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '8px 14px', borderRadius: 9999, border: filter === f.key ? '2px solid #2874fc' : '1px solid #dbe3ea',
                background: filter === f.key ? '#e9f1ff' : '#fff', color: '#135D66', cursor: 'pointer'
              }}
            >{f.label}</button>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center" style={{ gap: 12, width: '100%', maxWidth: 980, margin: '0 auto' }}>
        {error && (
          <div style={{ color: 'red', marginTop: 10 }}>{error}</div>
        )}
        {loading && (
          <div style={{ marginTop: 10 }}>Loading...</div>
        )}
        {!loading && !error && pins.length === 0 && (
          <div style={{ marginTop: 10 }}>No files found</div>
        )}
        {!loading && !error && filteredPins.map((pin, index) => (
          <Map key={index} pin={pin} />
        ))}
      </div>
    </>
  );
};

export default Display;
