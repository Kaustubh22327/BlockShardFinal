import { useState } from "react";
import Map from "./map";
import DetailsDrawer from "./DetailsDrawer";
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
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState('date'); // 'name' | 'size' | 'date'
  const [sortDir, setSortDir] = useState('desc'); // 'asc' | 'desc'
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('viewMode') || 'grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

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

  const searchedPins = filteredPins.filter((p) => {
    const name = (p?.metadata?.name || '').toLowerCase();
    return name.includes(query.toLowerCase());
  });

  const sortedPins = [...searchedPins].sort((a, b) => {
    if (sortKey === 'name') {
      const an = (a?.metadata?.name || '').toLowerCase();
      const bn = (b?.metadata?.name || '').toLowerCase();
      return an.localeCompare(bn);
    }
    if (sortKey === 'size') {
      return (a?.size || 0) - (b?.size || 0);
    }
    // date
    const ad = new Date(a?.date_pinned || a?.metadata?.keyvalues?.created || 0).getTime();
    const bd = new Date(b?.date_pinned || b?.metadata?.keyvalues?.created || 0).getTime();
    return ad - bd;
  });

  if (sortDir === 'desc') {
    sortedPins.reverse();
  }

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

      {pins.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', alignItems: 'center', margin: '6px auto 14px', maxWidth: 980 }}>
          <input
            type="search"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search files"
            style={{ padding: '8px 12px', border: '1px solid #d5e6e8', borderRadius: 8, minWidth: 220 }}
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label htmlFor="sortBy" style={{ fontSize: 14, color: '#335' }}>Sort by</label>
            <select id="sortBy" value={sortKey} onChange={(e) => setSortKey(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #d5e6e8', borderRadius: 8 }}>
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            <button onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')} aria-label="Toggle sort direction" style={{ padding: '8px 12px', border: '1px solid #d5e6e8', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>
              {sortDir === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setViewMode('grid'); localStorage.setItem('viewMode','grid'); }} style={{ padding: '8px 12px', border: viewMode==='grid'?'2px solid #2874fc':'1px solid #d5e6e8', borderRadius: 8, background: '#fff' }}>Grid</button>
            <button onClick={() => { setViewMode('list'); localStorage.setItem('viewMode','list'); }} style={{ padding: '8px 12px', border: viewMode==='list'?'2px solid #2874fc':'1px solid #d5e6e8', borderRadius: 8, background: '#fff' }}>List</button>
          </div>
        </div>
      )}

      <div className={"flex flex-col items-center justify-center"} style={{ gap: 12, width: '100%', maxWidth: 1100, margin: '0 auto' }}>
        {error && (
          <div style={{ color: 'red', marginTop: 10 }}>{error}</div>
        )}
        {loading && (
          <div style={{ marginTop: 10 }}>Loading...</div>
        )}
        {!loading && !error && pins.length === 0 && (
          <div style={{ marginTop: 10 }}>No files found</div>
        )}
        {!loading && !error && (
          viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, width: '100%' }}>
              {sortedPins.map((pin, index) => (
                <Map key={index} pin={pin} onOpenDetails={setSelected} />
              ))}
            </div>
          ) : (
            sortedPins.map((pin, index) => (
              <Map key={index} pin={pin} onOpenDetails={setSelected} />
            ))
          )
        )}
      </div>
      <DetailsDrawer pin={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Display;
