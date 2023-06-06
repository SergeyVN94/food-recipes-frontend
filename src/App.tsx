import { useState } from 'react';
import tw, { styled } from 'twin.macro';

import './App.css';

const Compon = styled.button`
  ${tw`p-2 rounded-xl text-white bg-blue-500 cursor-pointer`}
  ${({ isFlag }: { isFlag: boolean }) => isFlag && tw`bg-red-500`}
` as any;

const Comp = ({ children, isFlag, onClick }: { children?: React.ReactNode; isFlag: boolean; onClick: () => void; }) => {

  return (
    <button tw="p-2 rounded-xl text-white bg-green-500 cursor-pointer" css={[ isFlag && tw`bg-red-500` ]} onClick={onClick}>
      {children}
    </button>
  );
};

function App() {
  const [f, setF] = useState(false);

  return (
    <>
      <p>{f}</p>
      <div>
        api url: {import.meta.env.VITE_API_URL}
      </div>
      <Comp isFlag={f} onClick={() => setF(prev => !prev)}>Click me! 1</Comp>
      <Compon isFlag={f} onClick={() => setF(prev => !prev)}>Click me! 2</Compon>
    </>
  )
}

export default App
