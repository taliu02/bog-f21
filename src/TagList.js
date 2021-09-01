import React from 'react'
import Tag from './Tag'

export default function TodoList({ tags, toggleTag }) {
    return (
        tags.map(tag => {
            return <Tag key = {tag.id} tag={tag} toggleTag={toggleTag}/>
        })
    )
}
