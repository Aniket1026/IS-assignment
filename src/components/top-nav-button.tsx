import React from 'react'
import { Button } from './ui/button';
import Image, { StaticImageData } from 'next/image';

interface TopNavButtonProps {
  Icon: StaticImageData;
}

const TopNavButton: React.FC<TopNavButtonProps> = ({ Icon }) => {
  return (
    <Button variant="ghost" size="icon">
      <Image src={Icon} height={20} width={20} alt="icon" />
    </Button>
  )
}

export default TopNavButton