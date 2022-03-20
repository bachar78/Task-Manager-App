import React from 'react'
import styles from './memberItem.module.css'

const MemberItem = ({ member }) => {
  return (
    <div className={styles.member}>
      <div className={styles.image}>
        <img src={member.image} alt='profile' />
      </div>
      <h4>{member.name}</h4>
      <p>{member.position}</p>
    </div>
  )
}

export default MemberItem
