'use client'
import type { ComponentProps } from 'react';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ImageZoom = (props: ComponentProps<typeof Image>) => {
  return (
    <Zoom>
    <Image
      {...props}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      priority={true}
      sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
    />
    </Zoom>
  );
};

export default ImageZoom;

