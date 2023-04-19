/**
 * File Name: components/layout/layout.tsx
 *
 * 
 * About: 
 * This layout componet is used to provide the transition animation between the different pages on the app
 * This contains the motion.main component from the framer/motion library
 */

import React, { ReactNode } from 'react'
// import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
    title: string
    description: string
}

const variants = {
    hidden: { opacity: 0, x: 0, y: 200 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 100 },
}

const Layout = ({ children}: Props): JSX.Element => (
    <div>
        {children}
        
    </div>
)

export default Layout