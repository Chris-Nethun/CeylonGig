const stages = ['Placed', 'In progress', 'Delivered', 'Complete'];

export default function OrderProgressBar({ status = 'PLACED' }) {
  const normalized = status.toLowerCase().replaceAll('_', ' ');
  const index = Math.max(0, stages.findIndex((stage) => stage.toLowerCase() === normalized));
  return <ol className="progress-list" aria-label="Order progress">
    {stages.map((stage, step) => <li className={step <= index ? 'progress-step done' : 'progress-step'} key={stage}><span className="progress-dot">{step < index ? '✓' : step + 1}</span><span>{stage}</span></li>)}
  </ol>;
}
