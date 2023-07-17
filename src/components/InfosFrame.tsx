'use client'

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleMobileMenu, setHasScroll, setInfosFrameTexts } from '@/redux/features/configSlice';

interface CompProps {
  texts : string[];
}


const InfosFrame = ({texts}: CompProps) => {

  const dispatch = useAppDispatch();

  const infoFrameTexts = useAppSelector(state => state.config.infosFrameTexts);

  const containerRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const description = 'test';

  useEffect(() => {

    if(texts) {

      let newTexts: {text: string, numPoints:  number}[] = [];
      
        texts.forEach((text, index) => {
          
            if (spanRefs.current[index]) {
              const numPoints = Math.floor((spanRefs.current[index]!.offsetWidth)/1.5);
              newTexts.push({text, numPoints})
            }
          
        })

      dispatch(setInfosFrameTexts(newTexts));
      console.log(infoFrameTexts)
    }

  }, [ texts])

  

  const jsxText = texts.map((text, index) => (
    <p key={index} ref={paraRef} className='flex'>
        <span className='mr-2'>{text}</span>
        <span ref={(el) => (spanRefs.current[index] = el)} className='inline-block mr-2 flex-1 whitespace-nowrap overflow-hidden'>{infoFrameTexts[index] ? ".".repeat(infoFrameTexts[index].numPoints) : '...'}</span>
        <span>0€</span>
    </p>
  ));

  return (
    <div ref={containerRef}>
      {jsxText}
    </div>
  )
}

export default InfosFrame;
