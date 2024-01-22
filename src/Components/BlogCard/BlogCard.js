import { useState } from 'react';
import Styles from './BlogCard.module.css'
import {motion} from 'framer-motion';
export default function BlogCard({element}) {
    const [hovered, setHovered] = useState(false);

  return (
    <motion.div
    animate={{scale: hovered? 1.03 : 1 }}
    transition={{duration:0.2}}
    className={Styles.blogCardContainer}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    >
        <motion.div
        className={Styles.blogCardImage}
        transition={{duration:0.2}}
        ></motion.div>
        <p className={Styles.spiceName}>Al-Baseeta</p>
        <h2 className={Styles.blogCardTitle}>DIY: Check out how to make your spice at home! DIY: Check out how to make your spice at home! DIY: Check out how to make your spice at home!</h2>
        <p className={Styles.blogCardDate}>15.1.2024</p>
    </motion.div>
    
  )
}
