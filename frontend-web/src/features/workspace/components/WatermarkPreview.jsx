export default function WatermarkPreview({ src, alt = 'Work preview' }) {
  return <div className="watermark-preview"><img src={src} alt={alt} /><span aria-hidden="true">CEYLONGIG PREVIEW</span></div>;
}
