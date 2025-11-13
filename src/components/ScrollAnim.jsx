import { motion } from "motion/react"

export const ScrollAnim = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ margin: "-50px" }}
    >
        {children}
    </motion.div>
)
