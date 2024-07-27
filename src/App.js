import { Button } from 'antd';
import ToDo from './Components/ToDo/Parent';
import './app.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigation = useNavigate();
  return (
    <>
      <Button
        style={{
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '20px',
        }}
        type="primary"
        onClick={() => navigation('/pagination')}
      >
        Go To Pagination
      </Button>
      <div className="body">
        <ToDo />
      </div>
    </>
  );
}

export default App;
