import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar: React.FC = () => {
  const skillsData = [
    { "langage": "Java", "score": 70, "temps": 17, "anims": "circle1" },
    { "langage": "Html", "score": 90, "temps": 1.5, "anims": "circle2" },
    { "langage": "Angular", "score": 65, "temps": 1.5, "anims": "circle3" }
  ];

  const [counters, setCounters] = useState(skillsData.map(() => 0));

  useEffect(() => {
    const maxTime = Math.max(...skillsData.map(skill => skill.temps));

    const intervalIds = skillsData.map((skill, index) => {
      return setInterval(() => {
        if (counters[index] === skill.score) {
          clearInterval(intervalIds[index]);
        } else {
          setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters[index] = prevCounters[index] + 1;
            return newCounters;
          });
        }
      }, maxTime);
    });

    return () => intervalIds.forEach(clearInterval);
  }, [counters, skillsData]);

  return (
    <div className='body2'>
      <div className='skills'>
        {skillsData.map((skill, index) => (
          <div key={index} className="skill">
            <div className="outer">
              <div className="inner">
                <div id="number">
                  {counters[index]}%
                </div>
              </div>
            </div>
            <svg className='svg' height="10rem" width="10rem" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradientColor">
                  <stop offset="0%" stop-color="#06d94c" />
                  <stop offset="100%" stop-color="#023714" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" strokeLinecap='round' className={`circle ${skill.anims}`}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
