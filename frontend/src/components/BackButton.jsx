import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './backButton.module.css'
const BackButton = ({ url }) => {
  return (
    <Link to={url} className={styles['btn-back']}>
      <FaArrowAltCircleLeft /> Back
    </Link>
  )
}

export default BackButton
