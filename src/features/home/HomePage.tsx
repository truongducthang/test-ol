
import { ReactElement } from 'react';
import './home.css';

// react
import React, { useState, useEffect } from 'react';
import Simple from 'components/map/MapWrapper';
import Interactions from 'components/map/Interactions';

// components

export interface HomePageProps {
  [key: string]: any;
}

export default function HomePage(): ReactElement {
 

  return (
    <div className='bg-[red]'>
      <Simple/>
      {/* <Interactions/> */}
   
    </div>
  );
}
