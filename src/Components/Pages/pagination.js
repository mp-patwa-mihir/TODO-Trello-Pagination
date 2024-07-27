import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

const Pagination = () => {
  const navigation = useNavigate();
  const [pages, setPages] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(10);
  const [dd, setDD] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);

  const create2DArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    setDD(result);
  };

  const countTotalPages = (d, e) => {
    const arr = [];
    const totalPages = d.length / e;
    for (let step = 0; step < totalPages; step++) {
      arr.push(String(step + 1));
    }
    setPages(arr);
  };

  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const response = await res.json();
    if (response) {
      setData(response);
      countTotalPages(response, value);
      create2DArray(response, value);
    }
  };

  const handleChange = (e) => {
    setValue(e);
    countTotalPages(data, e);
    create2DArray(data, e);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        onClick={() => navigation('/')}
      >
        Back
      </Button>
      <div>
        <Select
          defaultValue="10"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={options}
          value={value}
        />
        {pages?.map((e) => (
          <Button
            type="link"
            onClick={() => setCurrentPage(Number(e) - 1)}
            style={{ background: Number(e) === currentPage + 1 && 'yellow' }}
          >
            {e}
          </Button>
        ))}
        <div>
          <Button
            type="primary"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: '20px' }}
            disabled={currentPage === pages?.length - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            next
          </Button>
          {dd?.[currentPage]?.map((e) => (
            <div>{e?.id}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pagination;
