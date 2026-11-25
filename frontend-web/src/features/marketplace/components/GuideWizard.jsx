import { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { title: 'What are you looking for?', options: ['Design & creative', 'Writing & translation', 'Web & technology', 'Marketing'] },
  { title: 'Tell us about your project', options: ['A quick one-off task', 'A growing project', 'Ongoing support'] }
];

export default function GuideWizard() {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState('');
  if (step === steps.length) return <div className="wizard-result"><span className="eyebrow">A great place to start</span><h3>Browse work made for your next idea.</h3><Link className="button button-accent" to={`/search${choice ? `?category=${encodeURIComponent(choice)}` : ''}`}>Explore matching gigs</Link></div>;
  return <div className="wizard-card"><div className="wizard-progress"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><span className="eyebrow">Quick guide · {step + 1} of {steps.length}</span><h3>{steps[step].title}</h3><div className="wizard-options">{steps[step].options.map((option) => <button className={`wizard-option ${choice === option ? 'selected' : ''}`} key={option} onClick={() => setChoice(option)}>{option}<span>→</span></button>)}</div><button className="wizard-next" disabled={!choice} onClick={() => { if (step === 0) setChoice(''); setStep((current) => current + 1); }}>Continue →</button></div>;
}
