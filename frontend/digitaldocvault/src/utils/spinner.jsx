import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Spinner = () => {
  return (
    <ScaleLoader
      className="flex mx-96 mt-64 text-primary"
      size={20}
      height={45}
      margin={2}
      radius={8}
      width={32}
    />
  );
};

export default Spinner;
