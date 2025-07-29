import React from 'react';
import useCountUp from '../hooks/useCountUp';

const CounterTest = () => {
  const counter1 = useCountUp("10,000+", 2000);
  const counter2 = useCountUp("1M+", 2000);
  const counter3 = useCountUp("50+", 2000);
  const counter4 = useCountUp("4.8/5", 2000);

  return (
    <div style={{ padding: '50px', backgroundColor: '#1f2937', color: 'white', minHeight: '100vh' }}>
      <h2>Counter Test</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '50px' }}>
        <div ref={counter1.ref} style={{ textAlign: 'center', border: '1px solid #374151', padding: '20px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {counter1.value}
          </div>
          <div>Bộ phim</div>
        </div>
        
        <div ref={counter2.ref} style={{ textAlign: 'center', border: '1px solid #374151', padding: '20px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {counter2.value}
          </div>
          <div>Người dùng</div>
        </div>
        
        <div ref={counter3.ref} style={{ textAlign: 'center', border: '1px solid #374151', padding: '20px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {counter3.value}
          </div>
          <div>Quốc gia</div>
        </div>
        
        <div ref={counter4.ref} style={{ textAlign: 'center', border: '1px solid #374151', padding: '20px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {counter4.value}
          </div>
          <div>Đánh giá</div>
        </div>
      </div>
    </div>
  );
};

export default CounterTest;
