import { motion } from "framer-motion";

function InfoMark(props){
    return(
        <motion.div className="info"
              onClick={props.showInfo}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}>
            <i className="fa-regular fa-circle-question" style={{ color: "rgb(85, 55, 46)" }}></i>
        </motion.div>
    );
}

export default InfoMark;

