'use client'
import CountUp from 'react-countup';

const CountDown = ({ count, duration }: { count: number, duration?: number }) => {
    return (
        <CountUp duration={duration ?? 6} end={count || 0} enableScrollSpy={true} scrollSpyOnce={true} />
    );
};

export default CountDown;