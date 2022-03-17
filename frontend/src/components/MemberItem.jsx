import React from 'react'
import styles from './memberItem.module.css'

const MemberItem = ({ member }) => {
  return (
    <div className={styles.member}>
      <img src='realtor-1.jpeg' alt='' />
      <h4>{member.name}</h4>
      <p>{member.position}</p>
    </div>
  )
}

export default MemberItem