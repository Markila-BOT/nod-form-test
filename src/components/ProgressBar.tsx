import React from 'react';

interface ProgressBarProps {
  progress: number;
  goal: number;
}

export default function ProgressBar({ ...props }: ProgressBarProps) {
  const calculateProgress = (progress, goal) => {
    if (Number(progress) === 0) {
      return 0 + '%';
    }
    if (Number(goal) >= Number(progress)) {
      return (progress / goal) * 100 + '%';
    } else {
      return 100 + '%';
    }
  };

  const { progress, goal } = props;

  return (
    <div
      className="progress-bar"
      style={{ width: calculateProgress(progress, goal) }}
    ></div>
  );
}
