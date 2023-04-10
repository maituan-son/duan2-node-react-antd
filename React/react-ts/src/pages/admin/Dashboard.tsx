import type { CountdownProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import React from 'react';
type Props = {}

const Dashboard = (props: Props) => {
    const { Countdown } = Statistic;

    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

    const onFinish: CountdownProps['onFinish'] = () => {
        console.log('finished!');
    };

    const onChange: CountdownProps['onChange'] = (val) => {
        if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    };
    return (
        <div className='text-center'> 
         
        </div> 
    )
}

export default Dashboard 