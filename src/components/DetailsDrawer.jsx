import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "./DetailsDrawer.css";

const humanSize = (bytes = 0) => {
	const k = 1024;
	const sizes = ['B','KB','MB','GB','TB'];
	if (!bytes) return '0 B';
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const detectType = (name = "") => {
	const n = name.toLowerCase();
	if (/(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.svg)$/.test(n)) return 'image';
	if (/(\.pdf)$/.test(n)) return 'pdf';
	if (/(\.mp4|\.webm|\.mov|\.mkv)$/.test(n)) return 'video';
	if (/(\.mp3|\.wav|\.ogg)$/.test(n)) return 'audio';
	return 'other';
};

const DetailsDrawer = ({ pin, onClose }) => {
	const link = pin ? `https://harlequin-known-gecko-651.mypinata.cloud/ipfs/${pin.ipfs_pin_hash}` : "";
	const type = detectType(pin?.metadata?.name);
	const panelRef = useRef(null);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [onClose]);

	if (!pin) return null;

	const copyCid = async () => {
		try { await navigator.clipboard.writeText(pin.ipfs_pin_hash); toast.success('CID copied'); } catch(e) {}
	};
	const copyLink = async () => {
		try { await navigator.clipboard.writeText(link); toast.success('Link copied'); } catch(e) {}
	};

	return (
		<div className="drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onClick={onClose}>
			<div className="drawer-panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
				<div className="drawer-header">
					<h3 id="drawer-title">File details</h3>
					<button className="drawer-close" onClick={onClose} aria-label="Close details">×</button>
				</div>
				<div className="drawer-content">
					<div className="drawer-preview">
						{type === 'image' && (
							<img src={link} alt={pin.metadata?.name} />
						)}
						{type === 'pdf' && (
							<iframe title={pin.metadata?.name} src={link} />
						)}
						{(type === 'video') && (
							<video src={link} controls />
						)}
						{(type === 'audio') && (
							<audio src={link} controls />
						)}
						{type === 'other' && (
							<div className="drawer-preview-fallback">No inline preview available</div>
						)}
					</div>
					<div className="drawer-meta">
						<div className="meta-row"><span className="meta-key">Name</span><span className="meta-val">{pin.metadata?.name}</span></div>
						<div className="meta-row"><span className="meta-key">Type</span><span className="meta-val">{type}</span></div>
						<div className="meta-row"><span className="meta-key">Size</span><span className="meta-val">{humanSize(pin.size)}</span></div>
						<div className="meta-row"><span className="meta-key">CID</span><span className="meta-val code">{pin.ipfs_pin_hash}</span></div>
						<div className="meta-row"><span className="meta-key">Pinned</span><span className="meta-val">{new Date(pin.date_pinned || Date.now()).toLocaleString()}</span></div>
						<div className="drawer-actions">
							<a href={link} target="_blank" rel="noreferrer" className="btn primary">Open</a>
							<button onClick={copyLink} className="btn">Copy link</button>
							<button onClick={copyCid} className="btn">Copy CID</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailsDrawer;


